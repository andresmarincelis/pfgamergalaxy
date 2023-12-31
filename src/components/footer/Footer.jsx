/** @format */

import React from "react";
import { ComputerDesktopIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.usuarioCreado);
  return (
    <div className="flex flex-col ">
      <footer className="h-fit w-full p-8 bg-blue-700 border-t border-blue-500 shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-white sm:text-center">
          ©{" "}
          <a href="http://127.0.0.1:5173/home" className="hover:underline">
            GamerGalaxy2023™
          </a>
          . Todos los derechos reservados.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0"></ul>
        <div className="flex justify-between items-center h-12">
          {user.id_role == 1 ? (
            <Link to={"/admin"}>
              <button className="mr-20 mt-4 hover:underline md:mr-10">
                <ComputerDesktopIcon className="h-8 w-8 mb-2 mr-4 text-white" />
              </button>
            </Link>
          ) : null}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
