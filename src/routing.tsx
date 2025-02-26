import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateUserPage from "./pages/CreateUserPage";

// Routing med layout fil som huvudfil
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/create-user",
                element: <CreateUserPage />
            },
            {
                path: "/product/:id",
                element: <ProductDetails />
            },
            {
                path: "/products",
                element: (
                    <ProtectedRoute>
                        <ProductsPage />
                    </ProtectedRoute>
                )
            }
        ]
    }
])

export default router;
