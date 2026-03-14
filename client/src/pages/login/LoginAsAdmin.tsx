import { useEffect, useState } from "react"
import { useAdminContext } from "../../context/admin_context/admin-context"
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person";
import { Admin } from "../../models"

export default function LoginAsAdmin() {
    const { getAdmins, login } = useAdminContext()

    const [admins, setAdmins] = useState<Admin[]>([])
    const [loading, setLoading] = useState(true)

    const loginAdmin = async (id: string) => {
        try {
            setLoading(true)
            await login(id)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function loadAdmins() {
            try {
                const data = await getAdmins()
                setAdmins(data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        loadAdmins()
    }, [getAdmins])

    if (loading) {
        return <Typography textAlign="center">Loading admins...</Typography>
    }

    return (
        <Paper elevation={3} sx={{ maxWidth: 300, margin: "20px auto" }}>
            <Typography variant="h6" sx={{ p: 2 }} textAlign="center">
                Admins
            </Typography>

            <List>
                {admins.map((admin) => (
                    <ListItem disablePadding key={admin.id}>
                        <ListItemButton onClick={() => loginAdmin(admin.id)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={admin.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}
