import { Box, Button, Card, CardContent, CircularProgress, Grid, MenuItem, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import { useAdminContext } from "../../../context/admin_context/admin-context";
import { useNavigate, } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/admin_context/admin-context";
const units = [
    "KG", "L"
]

export default function CreateItem() {
    const { createItem } = useAdminContext()
    const [loading, setLoading] = useState(false);
    const nav = useNavigate()

    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [unit, setUnit] = useState(units[0])
    const [price, setPrice] = useState(0)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            createItem({
                name, img, price, quantity, unit
            }).then(res => {
                console.log(res)
                setLoading(false);
            })
            nav("/admin/item")
        } catch (err) {
            console.log("Failed to make transaction!")
            console.log(err)
        }
        setLoading(true);

    };



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
                        Create Item
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Fill the form below.
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Image"
                                    fullWidth
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    fullWidth
                                    required
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                                    value={quantity}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Unit"
                                    select
                                    fullWidth
                                    onChange={(e) => setUnit(e.target.value)}
                                    value={unit}
                                    required
                                >
                                    {units.map((u) => (
                                        <MenuItem key={u} value={u}>
                                            {u}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Price/unit"
                                    type="number"
                                    fullWidth
                                    required
                                    onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                                    value={price}
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
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Create"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                    sx={{ mt: 1, borderRadius: 2 }}
                                    disabled={loading}
                                    onClick={() => nav(-1)}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Cancel"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
