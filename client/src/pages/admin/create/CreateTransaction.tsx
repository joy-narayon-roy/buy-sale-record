import { useNavigate, useSearchParams } from "react-router-dom"
import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
    MenuItem,
    CircularProgress
} from "@mui/material";
import { useAdminContext } from "../../../context/admin_context/admin-context";
import axios from "axios";

const types = [
    { value: "deposit", label: "Deposit" },
    { value: "withdraw", label: "Withdraw" },
];
// TODO: Allow Update Date 
const MODIFY_DATE = false

export default function CreateTransaction() {
    const { admin, createTransaction } = useAdminContext()
    const [sp, setSp] = useSearchParams({
        type: 'deposit',
        investor_id: ""
    })
    const type = sp.get('type')
    const investor_id = sp.get('investor_id')
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0)
    const now = new Date().toISOString().slice(0, 16)
    const [created_at, setCreated_at] = useState(now)
    const nav = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createTransaction({
                type: type === 'deposit' ? 'deposit' : 'withdraw',
                amount,
                investor_id: investor_id || '',
                created_at

            })
            nav(`/admin/investor/${investor_id}`)
        } catch (err) {
            console.log("Failed to make transaction!")
            if (err instanceof axios.AxiosError) {
                alert("Failed to " + type + '.')
                nav(`/admin/investor/${investor_id}`)
            }
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
                        Create {type?.toLocaleUpperCase()}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Fill the form below.
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Type"
                                    select
                                    fullWidth
                                    onChange={(e) => setSp((p) => ({ ...p, type: e.target.value }))}
                                    value={type}
                                    required
                                >
                                    {types.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Investor"
                                    select
                                    fullWidth
                                    value={investor_id}
                                    onChange={(e) => setSp((p) => { p.set('investor_id', e.target.value); return p })}
                                    required
                                >

                                    {admin?.investors.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>


                            <Grid item xs={12}>
                                <TextField
                                    label="Amount"
                                    type="number"
                                    fullWidth
                                    required
                                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                                    value={amount}
                                />
                            </Grid>

                            {
                                MODIFY_DATE && <>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Created At"
                                            type="datetime-local"
                                            fullWidth
                                            required
                                            onChange={e => setCreated_at(e.target.value)}
                                            value={created_at}
                                        // onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                                        // value={amount}
                                        />
                                    </Grid>
                                </>
                            }

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
