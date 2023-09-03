
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import User from "./pages/User/User";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";

import "./styles/theme.scss";
import './styles/global.scss'
import { useContext } from "react";
import { DarkModeContext } from "./context/mode";
import Post from "./pages/Post/Post";






function App() {
  const { darkMode, isMenuExpanded } = useContext(DarkModeContext);

  const Layout = ()=>{
    return (

        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <div className="main">
            <Navbar/>
              <div className="containerApp">
                <div className={`menuContainer   ${!isMenuExpanded && 'menuContainerShrink'}`}>
                  <Menu/>
                </div>
                <div className="contentContainer">
                    <Outlet/>
                </div>
              </div>
              <Footer/>
          </div>
        </div>
    )
  }


  const ProtectedRoute = ({ children }: {children: React.ReactNode}) => {
    // e.g  if not currently login 
    if (!true) {
      return <Navigate to="/login" />;
    }

    return children;
  };



  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
        ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/posts",
          element: <Post />,
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);















  return (
     <RouterProvider router={router} />
  )
}

export default App
