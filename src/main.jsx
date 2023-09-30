import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Login from './Login/Login.jsx';
import SignUp from './SignUp/SignUp.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import AllWatches from './AllWatches/AllWatches.jsx';
import AddWatch from './AddWatch/AddWatch.jsx';
import AllUsers from './AllUsers/AllUsers.jsx';
import MyOrders from './MyOrders/MyOrders.jsx';
import AdminRoutes from './Routes/AdminRoutes.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children:
      [
        {
          path: '/',
          element: <AllWatches></AllWatches>
        },
        {
          path: '/Login',
          element: <Login></Login>
        },
        {
          path: '/SignUp',
          element: <SignUp></SignUp>
        },
        {
          path: '/AddWatch',
          element: <AddWatch></AddWatch>
        },
        {
          path: '/AllUsers',
          element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
        },
        {
          path: '/MyOrders',
          element: <MyOrders></MyOrders>
        }
      ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
