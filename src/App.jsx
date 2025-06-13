import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import Home from "./components/Home"
import Paste from "./components/Paste"
import ViewPaste from "./components/ViewPaste"
import Layout from './Layout'; // Make sure to adjust the import path
import ContactUs from "./components/ContactUs";
import RateIt from "./components/RateIt";
import HowItWorks from "./components/HowItWorks";


// const router = createBrowserRouter(
//   [
//     {
//       path:"/",
//       element:
//       <div className="w-full h-full flex flex-col">
//         <Navbar/>
//         <Home/>
//       </div>
//     },
//     {
//       path:"/pastes",
//       element: <div className="w-full h-full flex flex-col">
//       <Navbar/>
//       <Paste/>
//     </div>
//     },
//     {
//       path:"/pastes/:id",
//       element: <div className="w-full h-full flex flex-col">
//       <Navbar/>
//       <ViewPaste/>
//     </div>,
//     }
//   ]
// )


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // This will render the Home component when the path is "/"
        element: <Home />,
      },
      {
        path: 'pastes',
        element: <Paste />,
      },
      {
        path: 'pastes/:id',
        element: <ViewPaste />,
      },
      {
        path: '/contactme',
        element: <ContactUs />,
      },
      {
        path: '/rateit',
        element: <RateIt />,
      },
      {
        path: '/howitworks',
        element: <HowItWorks />,
      },

    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}