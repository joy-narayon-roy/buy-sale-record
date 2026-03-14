import { Navigate, Outlet, } from 'react-router-dom'
import { useAdminContext } from '../../context/admin_context/admin-context'


export default function LoginPage() {
    const { admin, loading } = useAdminContext()
    if (admin && !loading) {
        return <Navigate to={"/admin"} />
    } else {
        return <Outlet />
    }
}
