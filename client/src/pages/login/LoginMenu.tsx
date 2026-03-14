import { Box, Button, Typography, Paper, } from "@mui/material";

const socialLogins = [
    { name: "Admin", path: 'admin' },
    { name: "Investor", path: 'investor' },
    { name: "Agent", path: 'agent' },
];

function LoginMenu() {

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f4f6f8",
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    p: 5,
                    // width: 360,
                    textAlign: "center",
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>

                {/* <Divider sx={{ my: 3 }} /> */}

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {socialLogins.map((login) => (
                        <Button
                            key={login.name}
                            variant="contained"
                            href={`/login/${login.path}`}
                            sx={{}}
                        >
                            Login as {login.name}
                        </Button>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginMenu;