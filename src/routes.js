import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Contacts from "./pages/Contacts"
import DevicePage from "./pages/DevicePage"
import OrdersPage from "./pages/OrdersPage"
import Contacts2 from './pages/Contacts2'
import Shop from "./pages/Shop"
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, CONTACTS_ROUTE, SHOP_ROUTE, ORDERS_ROUTE, CONTACTS2_ROUTE } from "./utils/constans"
import Orders from "./pages/Orders"


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: BASKET_ROUTE,
        Component: <Admin/>
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <Shop/>
    },
    {
        path: CONTACTS2_ROUTE,
        Component: <Contacts2/>
    },
    {
        path: CONTACTS_ROUTE,
        Component: <Contacts/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth/>
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: <DevicePage/>
    },
    {
        path: ORDERS_ROUTE + '/:id',
        Component: <OrdersPage/>
    },
    {
        path: ORDERS_ROUTE,
        Component: <Orders/>
    }
]