import logo from './logo.svg';
import './App.css';
import Login from './component/login/Login';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Signup from './component/signup/Signup';
import Dashboard from './component/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';


function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: (<Login />),
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer /> {/* Add this to ensure Toast works */}
    </div>
  );
}

export default App;
