import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
    CircularProgress
} from "@mui/material";
import { useAdminContext } from "../../../context/admin_context/admin-context";
import { useNavigate } from "react-router-dom";

export default function CreateInvestor() {
    const { admin, createInvestor } = useAdminContext()
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createInvestor({
                name,
                email,
                password,
                admin_id: admin?.id
            })
            nav('/admin/investor')
        } catch (err) {
            console.log("Failed to create Investor")
            console.log(err)
        }
    };


    if (!admin) return null
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f7fb",
                p: 2
            }}
        >
            <Card sx={{ maxWidth: 600, width: "100%", borderRadius: 3, boxShadow: 4 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Create Investor
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Fill the form below.
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 1, borderRadius: 2 }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Create Investor"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
