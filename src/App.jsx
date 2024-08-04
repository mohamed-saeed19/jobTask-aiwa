import react,{ useState } from "react";
import "./App.css";
import Login from "./components/Auth/Login/Login";
import  { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom";
import Register from "./components/Auth/Register/Register";
import Profile from "./components/Auth/Profile/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Register />,
    },
    {
      path: "/login",
      element:<Login  />,
    },
    {
      path: "/profile",
      element:<Profile  />,
    },
  ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
