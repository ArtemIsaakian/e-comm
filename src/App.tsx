import Layout from "./layouts/Layout.tsx";
import Catalog from './components/Catalog'
import Favorites from "./components/Favorites.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Catalog />,
            },
            {
                path: '/favorites',
                element: <Favorites />,
            },
        ],
    },
])

const App = () => <RouterProvider router={router} />

export default App
