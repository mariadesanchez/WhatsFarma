/* eslint-disable no-undef */
import Cart from "../components/pages/cart/Cart";
import Home from "../components/pages/home/Home";
import ItemDetail from "../components/pages/itemDetail/ItemDetail";
import ItemListContainer from "../components/pages/itemlist/ItemListContainer";
import UserOrders from "../components/pages/userOrders/UserOrders";
import Favs from "../components/pages/Favs/Favs";
import Categoria from "../components/pages/categoria/Categoria";
import Whatsapp from "../components/pages/Whatsapp";


export const routes = [{
        id: "home",
        path: "/",
        Element: Home,
    },
    {
        id: "shop",
        path: "/shop",
        Element: ItemListContainer,
    },
    {
        id: "detalle",
        path: "/itemDetail/:id",
        Element: ItemDetail,
    },
    {
        id: "cart",
        path: "/cart",
        Element: Cart,
    },
    {
        id: "checkout",
        path: "/checkout",
        Element: Checkout,
    },
    {
        id: "userOrders",
        path: "/user-orders",
        Element: UserOrders,
    },
    {
        id: "favoritos",
        path: "/favoritos",
        Element: Favs,
    },
    {
        id: "categoria",
        path: "/categoria",
        Element: Categoria,
    },
    {
        id: "whatsapp ",
        path: "/whatsapp",
        Element: Whatsapp,
    }

];