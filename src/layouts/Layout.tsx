import { Outlet } from 'react-router'
import Header from '../components/Header'
import Cart from "../components/Cart.tsx";

const Layout = () => {
    return (
        <>
            <div className="wrapper">
                <Header />
                <Outlet />
            </div>
            <Cart />
        </>
    )
}

export default Layout
