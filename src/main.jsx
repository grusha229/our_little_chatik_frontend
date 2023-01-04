import React from 'react'
import store from "./store/index.js";
import {Provider} from "react-redux"

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"



import ReactDOM from 'react-dom/client'
import './index.css'
import Root from "./pages/root/root.jsx";
import ErrorPage from './pages/404/404.jsx';
import MessagesPage from "./pages/messages/MessagesPage.jsx";
import ChatArea from "./blocks/ChatArea/ChatArea";
import Welcome from "./pages/welcome/welcome.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />,
        errorElement: <ErrorPage />,
    },
    {
        path: "auth",
        element: <Root isRegistration={false}/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "reg",
        element: <Root isRegistration={true}/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "messages",
        element: <MessagesPage/>,
        // loader: chatLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: ":userId",
                element: <ChatArea />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
)
