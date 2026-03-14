import { useState } from "react"
import { useAdminContext } from "../../../context/admin_context/admin-context"
import { useNavigate, useSearchParams } from "react-router-dom"
import api from "../../../services/axios"
import { Box, Button, Card, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material"
import type { Item, Package } from "../../../models"
import ItemRow from "../../../components/ItemRow"

const MODIFY_DATE = false

type ListItem = {
    item_id: number
    quantity: number
}

export default function CreateBuy() {

    const { admin, addBuy } = useAdminContext()
    const [sp] = useSearchParams()
    const agent_id = sp.get("agent_id") || ""
    const [items, setItems] = useState<ListItem[]>([])
    const now = new Date().toISOString().slice(0, 16)
    const [created_at, setCreated_at] = useState(now)
    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false)
    const [openPackage, setOpenPackage] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState<number | "">("")
    const [selectedPackageId, setSelectedPackageId] = useState<number | "">("")
    const [quantity, setQuantity] = useState<number>(1)
    const total_cost = items.reduce((a, c) => {
        const itms = (admin?.items_by_id([c.item_id]) || [])[0]
        if (itms) {
            return a + (itms.price * c.quantity)
        }
        return a
    }, 0)

    const agent = admin?.get_agents([agent_id])[0]

    const nav = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (items.length === 0) {
            alert("Add item")
            return
        }
        setLoading(true)

        const payload = {
            admin_id: admin?.id || "",
            agent_id: agent?.id || "",
            item_ids: items,
            created_at
        }

        try {
            const { data } = await api.post("/buy", payload)
            addBuy(data)
            nav("/admin/agent/" + agent?.id + "/buy")
        } catch (err) {
            alert("Failed to create package")
            console.log("Failed to create package")
            console.log(err)
        }

        setLoading(false)
    }

    const addItem = (item_id: number, quantity: number) => {
        setItems(prev => {
            const exists = prev.some(item => item.item_id === item_id)

            if (exists) return prev

            return [...prev, { item_id, quantity }]
        })
    }

    const removeItem = (item_id: number) => {
        setItems(pre => pre.filter(item => item.item_id !== item_id))
    }

    const handleAddItem = () => {
        if (!selectedItemId) return

        addItem(selectedItemId, quantity)

        setSelectedItemId("")
        setQuantity(1)
        setOpen(false)
    }
    const handleAddPackage = () => {
        const pkg = (admin?.packages.filter(p => p.id === selectedPackageId) || [])[0]
        if (pkg) {
            pkg.items.forEach(i => {
                addItem(i.id, i.quantity)
            })
            setSelectedPackageId("")
            setOpenPackage(false)

        }
    }

    if (!agent && !loading) {
        return <Stack gap={1} sx={{ mt: 2 }}>
            <Typography
                sx={{ textAlign: "center" }}
                variant="h5"
            >No agent found!</Typography>
            <Button
                variant="contained"
                sx={{ mx: "auto", mt: 2 }}
                onClick={() => nav("/admin/agent")}
            >Select Agent</Button>
        </Stack>
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                background: "#f5f7fb",
                p: 2
            }}
        >
            <Card sx={{ maxWidth: 600, width: "100%", borderRadius: 3, boxShadow: 4 }}>
                <CardContent sx={{ p: 4 }}>

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Buy
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={3}>
                        {agent?.name || "No agent"} ({agent?.balance || 0}tk)
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <Stack gap={1}>
                                    {items.map(i => {

                                        const item = admin?.items_by_id([i.item_id])[0]
                                        if (!item) {
                                            return <></>
                                        }
                                        return (
                                            <ItemRow
                                                key={i.item_id}
                                                item={item}
                                                // editQuanitiy
                                                onDelete={() => removeItem(i.item_id)}
                                            />
                                        )
                                    })}
                                </Stack>
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

                                <Button
                                    type="button"
                                    sx={{ mt: 1 }}
                                    variant="contained"
                                    onClick={() => setOpen(true)}
                                >
                                    + Add Item
                                </Button>
                                <Button
                                    type="button"
                                    sx={{ mt: 1, ml: 1 }}
                                    variant="contained"
                                    onClick={() => setOpenPackage(true)}
                                >
                                    + Add Package
                                </Button>
                                <Box sx={{ mt: 1 }}>Total :{total_cost}</Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 1, borderRadius: 2 }}
                                    disabled={loading || !agent}
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
                                    Cancel
                                </Button>
                            </Grid>

                        </Grid>
                    </form>

                </CardContent>
            </Card>

            {/* ADD ITEM DIALOG */}

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">

                <DialogTitle>Add Item</DialogTitle>

                <DialogContent>

                    <TextField
                        select
                        fullWidth
                        label="Item"
                        value={selectedItemId}
                        onChange={(e) => setSelectedItemId(Number(e.target.value))}
                        sx={{ mt: 1 }}
                    >
                        {admin?.items?.map((item: Item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name} ({item.price} Tk)
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        type="number"
                        label="Quantity"
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        sx={{ mt: 2 }}
                    />

                </DialogContent>

                <DialogActions>

                    <Button onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleAddItem}
                    >
                        Add
                    </Button>

                </DialogActions>

            </Dialog>


            <Dialog open={openPackage} onClose={() => setOpenPackage(false)} fullWidth maxWidth="sm">
                <DialogTitle>Add Package</DialogTitle>

                <DialogContent>

                    <TextField
                        select
                        fullWidth
                        label="Package"
                        value={selectedPackageId}
                        onChange={(e) => setSelectedPackageId(Number(e.target.value))}
                        sx={{ mt: 1 }}
                    >
                        {admin?.packages?.map((pkg: Package) => (
                            <MenuItem key={pkg.id} value={pkg.id}>
                                {pkg.name} ({pkg.price} Tk)
                            </MenuItem>
                        ))}
                    </TextField>


                </DialogContent>

                <DialogActions>

                    <Button onClick={() => setOpenPackage(false)}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleAddPackage}
                    >
                        Add
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    )
}
