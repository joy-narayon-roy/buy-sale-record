import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LoginIcon from '@mui/icons-material/Login';
import { useAdminContext } from "../context/admin_context/admin-context";
import AdminMenu from "./AdminMenu";

const drawerWidth = 240;

function MainLayout() {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { admin } = useAdminContext()

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* Topbar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    transition: "all 0.3s ease",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setOpen(!open)}
                        sx={{ mr: 2 }}
                    >
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>

                    <Typography variant="h6" noWrap>
                        Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    width: open ? drawerWidth : 70,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: open ? drawerWidth : 70,
                        transition: "width 0.3s ease",
                        overflowX: "hidden",
                    },
                }}
            >
                <Toolbar />
                <Divider />

                {admin && <AdminMenu admin={admin} open={open} />}
                {!admin && <List>
                    <ListItemButton
                        selected={location.pathname === "/login"}
                        onClick={() => navigate("/login")}
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
                            {<LoginIcon />}
                        </ListItemIcon>

                        {open && <ListItemText primary={"Login"} />}
                    </ListItemButton>

                </List>}
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    bgcolor: "#f4f6f8",
                    minHeight: "100vh",
                    transition: "margin 0.3s ease",
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;