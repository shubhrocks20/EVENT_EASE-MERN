import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdminPage = () => {
    const {user} = useSelector(state=>state.reducer.login);
    return user && user.role==='admin' ? <Outlet/>: <Navigate to="/"/>
}

export default OnlyAdminPage
