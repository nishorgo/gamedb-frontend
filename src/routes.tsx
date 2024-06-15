import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import GameDetailPage from "./pages/GameDetailPage";
import ErrorPage from "./pages/ErrorPage";
import UserRegistration from "./forms/UserRegistration";
import UserLogin from "./forms/UserLogin";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MyReviewsPage from "./pages/MyReviewsPage";
import WishlistPage from "./pages/WishlistPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Homepage /> },
            { path: 'games/:slug', element: <GameDetailPage /> }
        ]
    },
    { path: '/register', element: <UserRegistration /> },
    { path: '/login', element: <UserLogin /> },
    {
        element: <ProtectedRoutes />,
        children: [
            { path: '/my-reviews', element: <MyReviewsPage /> },
            { path: '/wishlist', element: <WishlistPage /> }
        ]
    }
]);

export default router;