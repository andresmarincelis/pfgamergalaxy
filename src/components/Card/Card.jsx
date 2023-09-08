import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Detail from "../../views/Detail/Detail";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../../utils/format";
import { addToCart } from "../../redux/actions/actionsUsers";


const Card = ({ producto }) => {
  //Para crear la carta necesito: id, nombre, imagen, precio y boton agregar al carrito.

  //Tengo que crear un handler para agregar al carrito los productos
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [productoEnCarrito, setProductoEnCarrito] = useState(null);

  const handleAddToCart = () => {
    setProductoEnCarrito(producto, () => {
      console.log("Producto agregado al carrito:", productoEnCarrito);
    });
    dispatch(addToCart({producto, quantity}));
    window.alert("Se ha agregado el producto al carrito exitosamente");
  };

  useEffect(()=> {
console.log(producto);
  },[])

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  return (
    <div className="">
      {!producto.Images.length ? null : (
        <div className="flex flex-col items-center m-3 border-2 border-white rounded-xl bg-white w-60 h-80 shadow-xl">
          {/* <Link to={`/${producto.id_producto}`}> */}
          <button onClick={() => setIsModalOpen(true)}>
            <img
              className="my-6 w-24 h-24"
              key={producto.id_producto}
              src={producto.Images[0].url}
              alt={producto.nombre}
            />
          </button>
          {/* </Link> */}
          <h4
            className={` h-64 ${
              producto.nombre.length > 70 ? "text-sm" : "text-base"
            }  text-center`}
          >
            {producto.nombre}
          </h4>
          <h5 className="mb-4 h-4 text-xl text-blue-700">
            $ {formatCurrency(producto.precio) }
          </h5>
          <div className="flex flex-col items-center">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 h-8 border text-center text-xs outline-none"
              min="1"
            />
          <button className="text-sm text-white font-semibold border-2 p-1 mb-1.5 rounded-md bg-blue-500"
          onClick={handleAddToCart}
          >
            AGREGAR AL CARRITO
          </button>
        </div>
        </div>
      )}
      {isModalOpen && <Detail setOpen={setIsModalOpen} producto={producto} />}
    </div>
  );
};

export default Card;
