/** @format */

import {
  FETCH_CATEGORIES_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
} from "./actions/actionsAdmin";

import {
  SAVE_ID,
  GET_PRODUCTOS,
  DELETE_PRODUCTO,
  GET_PRODUCTO_NOMBRE,
  PUT_PRODUCTO,
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_SUBCATEGORIES,
  GET_BY_CATEGORIES,
  ORDER_BY_PRICE,
  GET_USUARIOS,
  GET_USUARIOS_NOMBRE,
  GET_USUARIOS_ID,
  DELETE_USUARIO,
  PUT_USUARIOS_ID,
  PUT_PRECIOS_ID,
  FILTER_ARMA_TU_PC,
  FILTER_BY_MARCAS,
  FILTER_COMPONENTES_ARMATUPC,
  GET_DIRECCION,
  POST_USUARIO,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  GET_DESCUENTOS,
  GET_NAME,
  CLEAR,
  FETCH_SPECIFICATIONS_3,
  FETCH_SPECIFICATIONS_9,
  CREATE_MERCADO_PAGO_PREFERENCE,
  UPDATE_CARRITO,
  GET_TOKEN,
  GET_PEDIDOS_ID,
  POST_COMENTS,
  POST_CALIFICACION,
  GET_COMENTARIOS,
  GET_CALIFICACIONES,
  POST_LOCATION,
  PUT_ORDER_STATUS,
  GET_ELIMINADOS,
  REMOVE_TOKEN,
  GET_MARCAS,
  PUT_LOCATION,
  GET_PEDIDOS,
  GET_ALL_REVIEWS,
} from "./actions/actions-types";

let initialState = {
  //admin
  productosAdmin: [],
  productoBorrados: [],
  producto: {},
  createdProduct: null,
  categories: [],
  productoCreado: {},
  usuarios: [],
  usuariosBorrados: [],
  usuarioNombre: [],
  usuarioId: {},
  pedidos_id: [],
  usuariosEliminados: [],
  pedidosTodos: [],
  reviewsTodos: [],
  // estados globales de productos
  productos: [],
  backup: [],
  filtrados: [],
  backupFiltrados: [],
  destacados: [],
  mercadoPagoPreferenceId: [],
  specifications3: [],
  specifications9: [],
  specifications30: [],

  /*
  {
    producto: producto,
    cantidad: quantity,
  }
  */
  carrito: [],

  marcas: [],
  idmarca: null,

  // estados categorias
  categorias: [],
  subCategorias: [],
  //estado direcciones de users
  direccion: [],
  id_location: [],
  usuarioCreado: [],
  //Usuario Token

  //comentarios
  comentarios: [],
  comentarioUser: [],
  calificaciones: [],
  calificacionUser: [],

  token: [],
  infoToken: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTOS:
      return {
        ...state,
        productosAdmin: action.payload,
        copiaProductos: action.payload,
      };
    case FETCH_CATEGORIES_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        categories: action.payload.map((categoria) => {
          return {
            categoria: categoria.nombre,
            id_categorias: categoria.id_categoria,
          };
        }),
      };

    case CREATE_PRODUCT_SUCCESS:
      return { ...state, productoCreado: action.payload };

    case GET_PRODUCTO_NOMBRE:
      return { ...state, productosAdmin: action.payload };

    case DELETE_PRODUCTO:
      return { ...state, productosAdmin: action.payload };

    case PUT_PRODUCTO:
      return { ...state, productosAdmin: action.payload };

    case GET_USUARIOS:
      return { ...state, usuarios: action.payload };

    case GET_ELIMINADOS:
      console.log(action.payload);
      return { ...state, usuariosEliminados: action.payload };

    case DELETE_USUARIO:
      return { ...state, usuarios: action.payload };

    case GET_USUARIOS_NOMBRE:
      return { ...state, usuarios: action.payload };

    case GET_USUARIOS_ID:
      return { ...state, usuarios: action.payload };

    case GET_PEDIDOS_ID:
      return { ...state, pedidos_id: action.payload };

    case GET_PEDIDOS:
      return { ...state, pedidosTodos: action.payload };

    case PUT_USUARIOS_ID:
      return { ...state, usuarios: action.payload };

    case PUT_ORDER_STATUS:
      console.log("PUT ORDER STATUS REDUCER->", action.payload.id);

      const filterId = action.payload.data.filter(
        (pedido) =>
          +pedido.id_user === +action.payload.id && pedido.status !== "cart"
      );

      const filterAll = action.payload.data.filter(
        (pedido) => pedido.status !== "cart"
      );

      console.log("FILTER ID EN REDUCER-->", filterId);
      console.log("FILTER TODOS EN REDUCER-->", filterAll); //ok

      return { ...state, pedidos_id: filterId, pedidosTodos: filterAll };

    case GET_DESCUENTOS:
      return { ...state, destacados: action.payload };

    case GET_NAME:
      // console.log("reducer", action.payload);
      return { ...state, productos: action.payload };

    case CLEAR:
      return {
        ...state,
        productos: state.backup,
        idmarca: null,
        backupFiltrados: [],
      };

    case PUT_PRECIOS_ID:
      // console.log("reducer", action.payload);
      return { ...state, productosAdmin: action.payload };

    //carrito
    case ADD_TO_CART:
      //console.log("a ver que llega al reducer", action.payload);
      return {
        ...state,
        carrito: action.payload,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        carrito: action.payload,
      };

    case GET_PRODUCTS:
      // console.log("desde el reducer", action.payload);
      //con esto traigo solo destacados y me guardo todo lo otro en el backup
      let productos;

      state.productos?.length
        ? (productos = state.productos)
        : (productos = action.payload);

      return {
        ...state,
        productosAdmin: action.payload,
        productos: [...productos],
        backup: action.payload,
      };
    case " CREATE_MERCADO_PAGO_PREFERENCE":
      return {
        ...state,
        mercadoPagoPreferenceId: action.payload,
      };
    case ORDER_BY_PRICE:
      let ordenados = state.productos;
      action.payload === "Descendente"
        ? ordenados.sort((a, b) => b.precio - a.precio)
        : ordenados.sort((a, b) => a.precio - b.precio);
      return {
        ...state,
        productos: [...ordenados],
      };

    //CATEGORIAS
    case GET_CATEGORIES:
      return {
        ...state,
        categorias: action.payload,
      };
    case GET_SUBCATEGORIES:
      // console.log('desde reducer',action.payload);
      return {
        ...state,
        subCategorias: action.payload,
      };
    case GET_BY_CATEGORIES:
      // console.log("cat desde reducer", action.payload);
      let filtered = state.backup.filter(
        (producto) => producto.id_categoria === +action.payload
      );
      // console.log("filtered", state.backup);
      // console.log("a ver que id marca", state.idmarca);
      return {
        ...state,
        productos: [...filtered],
        backupFiltrados: [...filtered],
        idmarca: +action.payload,
      };

    // arma tu pc

    case FILTER_ARMA_TU_PC:
      let filtradosPc = state.backup.filter(
        (producto) =>
          producto?.id_categoria == 3 &&
          producto.nombre.includes(action.payload)
      );
      // console.log('filtrados reducer',filtradosPc);
      return {
        ...state,
        productos: [...filtradosPc],
      };

    case FILTER_COMPONENTES_ARMATUPC:
      let filterComponentes;
      let buscador;
      if (action.payload.i == 0) {
        buscador = action.payload.producto.SpecificationValues.filter(
          (especificaciones) => especificaciones.Specification.name == "socket"
        )[0].value;
      } else if (action.payload.i == 1) {
        buscador = action.payload.producto.SpecificationValues.filter(
          (especificaciones) =>
            especificaciones.Specification.name == "tipo_memoria"
        )[0].value;
      }
      action.payload.i == 0
        ? (filterComponentes = state.backup.filter(
            (producto) =>
              producto?.id_categoria == 5 &&
              producto.SpecificationValues.filter(
                (especificaciones) =>
                  especificaciones.Specification.name == "socket"
              )[0].value.includes(buscador)
          ))
        : action.payload.i == 1
        ? (filterComponentes = state.backup.filter(
            (producto) =>
              producto?.id_categoria == 9 &&
              producto.SpecificationValues.filter(
                (especificaciones) =>
                  especificaciones.Specification.name == "tipo_memoria"
              )[0].value.includes(buscador)
          ))
        : action.payload.i == 2
        ? (filterComponentes = [
            ...state.backup.filter((producto) => producto?.id_categoria == 12),
            ...state.backup.filter(
              (producto) =>
                producto?.id_categoria == 13 &&
                !producto.SpecificationValues[0].value.includes("M2")
            ),
          ])
        : action.payload.i == 3
        ? (filterComponentes = state.backup.filter(
            (producto) => producto?.id_categoria == 15
          ))
        : action.payload.i == 4
        ? (filterComponentes = [
            ...state.backup.filter((producto) => producto?.id_categoria == 7),
            ...state.backup.filter((producto) => producto?.id_categoria == 8),
          ])
        : action.payload.i == 5
        ? (filterComponentes = state.backup.filter(
            (producto) => producto?.id_categoria == 18
          ))
        : action.payload.i == 6 &&
          (filterComponentes = state.backup.filter(
            (producto) => producto?.id_categoria == 17
          ));
      return {
        ...state,
        productos: [...filterComponentes],
      };

    case UPDATE_CART_QUANTITY:
      const { productId, newQuantity } = action.payload;
      return {
        ...state,
        carrito: state.carrito.map((item) => {
          if (item.producto.id_producto === productId) {
            return {
              ...item,
              cantidad: parseInt(newQuantity, 10), //acordarse** esto es para asegurarse que sea un numero
            };
          }
          return item;
        }),
      };

    case UPDATE_CARRITO:
      return {
        ...state,
        carrito: action.payload,
      };
    case POST_USUARIO:
      return {
        ...state,
        usuarioCreado: action.payload,
      };

    case FETCH_SPECIFICATIONS_3:
      console.log("Array en specifications3:", action.payload);
      return {
        ...state,
        specifications3: action.payload,
      };
    case FETCH_SPECIFICATIONS_9:
      return {
        ...state,
        specifications9: action.payload,
      };

    case GET_TOKEN:
      return {
        ...state,
        token: action.payload.order,
        infoToken: action.payload.token,
        carrito: action.payload.order.filter(
          (order) => order.status == "cart"
        )[0].Products,
      };

    case REMOVE_TOKEN:
      return {
        ...state,
        token: "",
        infoToken: "",
      };

    case GET_MARCAS:
      let marcas;
      const array1 = ["LG", "SAMSUNG", "ASUS", "VIEWSONIC"];
      const array2 = ["LENOVO", "ASUS", "THUNDEROBOT", "XENIA"];
      const array3 = ["AMD", "INTEL"];
      const array4 = ["MSI", "GIGABYTE", "ASUS", "ASROCK"];
      const array5 = ["ASUS", "ZOTAC"];
      const array6 = ["ASROCK", "XFX"];
      const array7 = [
        "PATRIOT",
        "TEAM",
        "GEIL",
        "ADATA",
        "HIKVISION",
        "PNY",
        "CORSAIR",
      ];
      const array8 = ["HIKVISION", "ADATA", "KINGDIAN"];
      const array9 = ["TOSHIBA", "SEAGATE", "WD"];
      const array10 = ["TOSHIBA", "SEAGATE", "WD"];
      const array11 = ["TEAM", "ADATA", "KINGSTON", "CRUCIAL", "WD"];
      const array12 = [
        "DEEPCOOL",
        "ANTEC",
        "COUGAR",
        "CORSAIR",
        "KOLINK",
        "LIAN LI",
        "ASUS",
        "BE QUIET",
        "LEVEL UP",
      ];
      const array13 = [
        "ASUS",
        "SEASONIC",
        "GIGABYTE",
        "MSI",
        "AEROCOOL",
        "ADATA",
      ];
      if (state.idmarca == 1) {
        marcas = array1;
      } else if (state.idmarca == 2) {
        marcas = array2;
      } else if (state.idmarca == 3) {
        marcas = array3;
      } else if (state.idmarca == 5) {
        marcas = array4;
      } else if (state.idmarca == 7) {
        marcas = array5;
      } else if (state.idmarca == 8) {
        marcas = array6;
      } else if (state.idmarca == 9) {
        marcas = array7;
      } else if (state.idmarca == 10) {
        marcas = array8;
      } else if (state.idmarca == 11) {
        marcas = array9;
      } else if (state.idmarca == 12) {
        marcas = array10;
      } else if (state.idmarca == 13) {
        marcas = array11;
      } else if (state.idmarca == 17) {
        marcas = array12;
      } else if (state.idmarca == 18) {
        marcas = array13;
      } else marcas = [];

      return {
        ...state,
        marcas: [...marcas],
      };

    case GET_ALL_REVIEWS:
      console.log("GET REVIEWS REDUCER-->", action.payload);
      return {
        ...state,
        reviewsTodos: action.payload,
      };

    case POST_COMENTS:
      console.log("Comentario", action.payload);
      return {
        ...state,
        comentarioUser: action.payload,
      };
    case POST_CALIFICACION:
      console.log("Calificacion", action.payload);
      return {
        ...state,
        calificacionUser: action.payload,
      };
    case GET_CALIFICACIONES:
      console.log("CALIFICACIONESSSSS", action.payload);
      return {
        ...state,
        calificaciones: action.payload,
      };
    case GET_COMENTARIOS:
      console.log("ComentarioSSSSS", action.payload);
      return {
        ...state,
        comentarios: action.payload,
      };
    case POST_LOCATION:
      console.log("POST LOCATION", action.payload);
      return {
        ...state,
        id_location: action.payload.user.id_location,
      };
    case PUT_LOCATION:
      console.log("reducer DIRECCION-->", action.payload);
      return {
        ...state,
        direccion: {
          calle: action.payload.location.calle,
          provincia: action.payload.location.provincia,
          codigo_postal: action.payload.location.codigo_postal,
          ciudad: action.payload.location.ciudad,
        },
        id_location: action.payload.location.id_location,
      };
    case GET_DIRECCION:
      //console.log("reducer DIRECCION-->", action.payload.Location);
      return {
        ...state,
        direccion: action.payload.Location,
      };

    case FILTER_BY_MARCAS:
      let filtrados;

      state.backupFiltrados.length
        ? (filtrados = state.backupFiltrados)
        : (filtrados = state.productos);

      filtrados = filtrados.filter((producto) =>
        producto.nombre.toLowerCase().includes(action.payload.toLowerCase())
      );

      if (action.payload === "TODOS") {
        state.backupFiltrados.length
          ? (filtrados = state.backupFiltrados)
          : (filtrados = state.productos);
      }
      return {
        ...state,
        productos: [...filtrados],
        filtrados: state.backupFiltrados,
      };

    case SAVE_ID:
      return { ...state, idmarca: action.payload };

    default:
      return { ...state };
  }
}
