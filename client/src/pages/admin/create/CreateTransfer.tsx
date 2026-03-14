import { useNavigate, useSearchParams } from "react-router-dom"
import { useAdminContext } from "../../../context/admin_context/admin-context"
import { useState } from "react"
import axios from "axios"
import { Box, Button, Card, CardContent, CircularProgress, Grid, MenuItem, TextField, Typography } from "@mui/material"
const types = [
    { value: "fund", label: "Funding" },
    { value: "refund", label: "Refund" },
]

// TODO: Allow Update Date 
const MODIFY_DATE = false
export default function CreateTransfer() {
    const { admin, createTransfer } = useAdminContext()
    const [sp, setSp] = useSearchParams({
        type: 'fund',
        agent_id: ""
    })
    const type = sp.get('type')
    const agent_id = sp.get('agent_id')
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0)
    const now = new Date().toISOString().slice(0, 16)
    const [created_at, setCreated_at] = useState(now)
    const nav = useNavigate()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createTransfer({
                type: type === 'fund' ? 'fund' : 'refund',
                amount,
                created_at,
                agent_id: agent_id || '',
                admin_id: admin?.id || ''

            })
            nav(`/admin/agent/${agent_id}`)
        } catch (err) {
            console.log("Failed to make transaction!")
            if (err instanceof axios.AxiosError) {
                alert("Failed to " + type + '.')
                nav(`/admin/agent/${agent_id}`)
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
                                    label="Agent"
                                    select
                                    fullWidth
                                    value={agent_id}
                                    onChange={(e) => setSp((p) => { p.set('agent_id', e.target.value); return p })}
                                    required
                                >

                                    {admin?.agents.map((option) => (
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
