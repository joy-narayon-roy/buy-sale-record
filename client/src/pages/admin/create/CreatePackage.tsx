import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ExtensionIcon from "@mui/icons-material/Extension";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Item } from "../../../models";
import { useAdminContext } from "../../../context/admin_context/admin-context";
import api from "../../../services/axios";


type Props = {
    item?: Item
    quantity?: number
    onDelete?: (item: Item) => void
}

function ItemComponent({ item, quantity = 0, onDelete = () => { } }: Props) {
    if (!item) return <></>

    return (
        <Paper
            elevation={1}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                borderRadius: 2
            }}
        >
            {item.img ? (
                <Avatar
                    variant="rounded"
                    src={item.img}
                    alt={item.name}
                    sx={{ width: 56, height: 56 }}
                />
            ) : (
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "grey.100",
                        borderRadius: 2
                    }}
                >
                    <ExtensionIcon color="action" />
                </Box>
            )}

            <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                    {item.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {item.price} Tk / {item.unit}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Qty: {quantity}
                </Typography>
            </Box>

            <Box>
                {/* <IconButton
                    size="small"
                    onClick={() => onEdit(item)}
                >
                    <EditIcon fontSize="small" />
                </IconButton> */}

                <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(item)}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
        </Paper>
    );
}

type ListItem = {
    item_id: number
    quantity: number
}

export default function CreatePackage() {

    const { admin, addPackage } = useAdminContext()

    const [name, setName] = useState("")
    const [items, setItems] = useState<ListItem[]>([])
    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState<number | "">("")
    const [quantity, setQuantity] = useState<number>(1)
    const total_cost = items.reduce((a, c) => {
        const itms = (admin?.items_by_id([c.item_id]) || [])[0]
        if (itms) {
            return a + (itms.price * c.quantity)
        }
        return a
    }, 0)

    const nav = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (items.length === 0) {
            alert("Add item")
            return
        }
        setLoading(true)

        const payload = {
            name,
            items
        }
        try {
            const { data } = await api.post("/package", payload)
            addPackage(data)
            nav("/admin/package")
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
                        Create Package
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
                                <Stack gap={1}>
                                    {items.map(i => {

                                        const item = admin?.items_by_id([i.item_id])[0]
                                        return (
                                            <ItemComponent
                                                key={i.item_id}
                                                quantity={i.quantity}
                                                item={item}
                                                onDelete={() => removeItem(i.item_id)}
                                            />
                                        )
                                    })}
                                </Stack>

                                <Button
                                    type="button"
                                    sx={{ mt: 1 }}
                                    variant="contained"
                                    onClick={() => setOpen(true)}
                                >
                                    + Add Item
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

        </Box>
    )
}