import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

const authProtectedRoutes = [
  {
    path: "/lecture",
    children: [
      {
        path: "/lecture/dashboard",
        component: <Dashboard />
      }
    ]
  },
  {
    path: "/student",
    children: [
      {
        path: "/student/dashboard",
        component: <Dashboard />
      }
    ]
  }
]

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
]

export { authProtectedRoutes, publicRoutes }

