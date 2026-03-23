import { Navigate, Outlet } from "react-router-dom"

const getRole = () => {
  return localStorage.getItem("role") // hoặc decode JWT
}

const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const role = getRole()

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/403" />
  }

  return <Outlet />
}

export default RoleRoute