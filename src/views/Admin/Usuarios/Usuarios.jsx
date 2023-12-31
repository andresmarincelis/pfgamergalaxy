/** @format */

import { toast, ToastContainer } from "react-toastify";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { NavLink } from "react-router-dom";

import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import DeleteConfirmationUserAdmin from "../../../components/DeleteConfirmationUserAdmin/DeleteConfirmationUserAdmin";

import SearchbarUsersAdmin from "../../../components/SearchbarUsersAdmin/SearchbarUsersAdmin";
import ModificadorUserModalAdmin from "../../../components/ModificadorUserModalAdmin/ModificadorUserModalAdmin";
import ModificadorRoleUserModalAdmin from "../../../components/ModificadorRoleUserModalAdmin/ModificadorRoleUserModalAdmin";
import {
  obtenerUsuarios,
  borrarUsuario,
} from "../../../redux/actions/actionsAdmin";

const Usuarios = () => {
  const usuarios = useSelector((state) => state.usuarios);
  //const token = useSelector((state) => state.infoToken);
  //const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteNumber, setDeleteNumber] = useState("");
  const [modifyNumber, setModifyNumber] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usuariosPerPage] = useState(11);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenState, setTokenState] = useState("");
  const [isModalRoleOpen, setIsModalRoleOpen] = useState(false);
  const indexOfLastUser = currentPage * usuariosPerPage;
  const indexOfFirstProduct = indexOfLastUser - usuariosPerPage;
  const currentUsuarios = usuarios.slice(indexOfFirstProduct, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(obtenerUsuarios(token));
    }
  }, [token]);

  const onConfirm = (number) => {
    dispatch(borrarUsuario(number, token));
  };

  return (
    <div className="flex text-right bg-slate-700 min-h-screen w-full">
      <SidebarAdmin />
      <div className="flex flex-col items-center min-h-screen bg-slate-700 justify-right w-full">
        <h1 className="mt-10 text-white text-center text-4xl">
          Gestión de Usuarios
        </h1>
        <SearchbarUsersAdmin setCurrentPage={setCurrentPage} />
        <div className="w-full flex flex-col items-center">
          <table className="text-white border border-collapse border-black m-8 w-5/6 ">
            <thead>
              <th className=" border border-black text-center w-1/8 w-[150px]">
                ID
              </th>
              <th className="border border-black text-center w-1/8">Usuario</th>
              <th className="border border-black text-center w-1/2">email</th>
              <th className="border border-black text-center w-1/4">Nombre</th>
              <th className=" border border-black text-center w-1/4">
                Apellido
              </th>
              <th className=" border border-black text-center w-1/2">
                Telefono
              </th>
              {/*   <th className=" border border-black text-center w-1/2">Rol </th> */}
              <th className=" border border-black text-center w-1/4">
                Eliminar
              </th>
              <th className=" border border-black text-center w-1/4">
                Modificar
              </th>
              <th className=" border border-black text-center w-1/4">Rol</th>
            </thead>

            {currentUsuarios.map((user) => (
              <tbody>
                <NavLink to={`${user.id}`}>
                  <td className="h-3 text-xs text-center border border-black w-1/8 ">
                    {user.id}
                    <button className="rounded-lg bg-gray-500 hover:bg-gray-600 text-white pl-2 pr-2 h-9 ">
                      Ver Pedidos
                    </button>
                  </td>
                </NavLink>
                <td className="h-5 text-xs text-center border border-black w-1/8">
                  {user.username}
                </td>
                <td className="h-5 text-xs text-center border border-black w-1/4">
                  {user.email}
                </td>
                <td className="h-5 text-xs text-center border border-black w-1/4">
                  {user.firstName}
                </td>
                <td className="h-5 text-xs text-center border border-black w-1/2">
                  {user.lastName}
                </td>
                <td className="h-5 text-xs text-center border border-black w-1/2">
                  {user.phoneNumber}
                </td>

                <td className="h-5 border border-black w-1/3">
                  <button
                    className="rounded-lg bg-red-500 hover:bg-red-600 text-white p-2 h-14 "
                    value={user.id}
                    onClick={() => {
                      setDeleteNumber(user.id);
                      setShowDeleteConfirmation(true);
                    }}
                  >
                    Eliminar
                  </button>
                </td>

                <td className="h-5 border border-black w-1/3">
                  <button
                    value={user}
                    className={
                      "scroll-to-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-4 rounded-lg  w-full"
                    }
                    onClick={() => {
                      setIsModalOpen(true);
                      setModifyNumber(user);
                    }}
                  >
                    Editar
                  </button>
                </td>
                <td className="h-5 border border-black w-1/3">
                  <button
                    value={user}
                    onClick={() => {
                      setIsModalRoleOpen(true);
                      setModifyNumber(user);
                    }}
                    className={
                      "scroll-to-button bg-gray-500 hover:bg-gray-600 text-white px-4 py-4 rounded-lg  w-full"
                    }
                  >
                    {user.Role ? user.Role.description : "user"}
                  </button>
                </td>
              </tbody>
            ))}
          </table>
          <div className="flex justify-center mt-4 mb-1 w-full">
            <nav className="inline-flex">
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`px-3 py-1 rounded-l-md ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                }`}
                disabled={currentPage === 1}
              >
                Anterior
              </button>

              {Array.from({
                length: Math.ceil(usuarios.length / usuariosPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-600 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                className={`px-3 py-1 rounded-r-md ${
                  currentPage === Math.ceil(usuarios.length / usuariosPerPage)
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                }`}
                disabled={
                  currentPage === Math.ceil(usuarios.length / usuariosPerPage)
                }
              >
                Siguiente
              </button>
            </nav>
          </div>
        </div>

        {isModalOpen && (
          <ModificadorUserModalAdmin
            setOpen={setIsModalOpen}
            modifyNumber={modifyNumber}
          />
        )}

        {isModalRoleOpen && (
          <ModificadorRoleUserModalAdmin
            setOpen={setIsModalRoleOpen}
            modifyNumber={modifyNumber}
          />
        )}

        <DeleteConfirmationUserAdmin
          isOpen={showDeleteConfirmation}
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={onConfirm}
          deleteNumber={deleteNumber}
          setCurrentPage={setCurrentPage}
        />

        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default Usuarios;
