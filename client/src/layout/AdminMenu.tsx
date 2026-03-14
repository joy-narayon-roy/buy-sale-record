import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { Admin } from "../models";
import {
    CurrencyExchange,
    Inventory,
    Logout,
    MonetizationOn,
    Person,
    SwapHoriz,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { BiUser } from "react-icons/bi";

export default function AdminMenu({ admin, open = false }: { admin: Admin | null, open?: boolean }) {
    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
        { text: "Investors", icon: <MonetizationOn />, path: "/admin/investor" },
        { text: "Transaction", icon: <SwapHoriz />, path: "/admin/transaction" },
        { text: "Agents", icon: <Person />, path: "/admin/agent" },
        { text: "Transfer", icon: <CurrencyExchange />, path: "/admin/transfer" },
        { text: "Item", icon: <Inventory />, path: "/admin/item" },
        { text: "Package", icon: <Inventory />, path: "/admin/package" },
        { text: "Inventory", icon: <Inventory />, path: "/admin/inventory" },
        { text: "Logout", icon: <Logout />, path: "/logout" }
    ];
    const navigate = useNavigate();

    if (!admin) {
        return <List></List>
    }
    return (
        <>
            <List>

                <ListItem sx={{ px: 2.5 }}>
                    <ListItemIcon>
                        <BiUser />
                    </ListItemIcon>
                    <ListItemText
                        primary={open ? admin.name : ""}
                        secondaryTypographyProps={{ fontSize: 12 }}
                        secondary={`${admin.balance}৳`}
                    />
                </ListItem>

                {menuItems.map((item) => (

                    <ListItemButton
                        key={item.text}
                        selected={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                        sx={{
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 2 : "auto",
                                justifyContent: "center",
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>

                        {open && <ListItemText primary={item.text} />}
                    </ListItemButton>
                ))}

            </List>
        </>
    )
}
