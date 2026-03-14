import { Navigate, Outlet } from "react-router-dom";
import { useAdminContext } from "../../context/admin_context/admin-context";

export default function AdminPage() {
    const { loading, admin } = useAdminContext()
    console.log(admin)
    if (!loading && !admin) {
        return <Navigate to={"/login"} />
    }
    return <Outlet />

}
