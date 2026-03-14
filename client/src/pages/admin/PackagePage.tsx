import AddIcon from "@mui/icons-material/Add";
// import ExtensionIcon from "@mui/icons-material/Extension";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Package } from "../../models";
import { useAdminContext } from "../../context/admin_context/admin-context";

type Props = {
    item: Package,
    onEdit?: (item: number) => void,
    onDelete?: (item: number) => void,
}
function ItemComponent({ item, onEdit = () => { }, onDelete = () => { } }: Props) {
    const nav = useNavigate()
    return (
        <Paper
            onClick={() => { nav(`${item.id}`) }}
            elevation={1}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                borderRadius: 2
            }}

        >
            {/* Item Info */}
            <Box sx={{ flex: 1 }} >
                <Typography variant="subtitle1" fontWeight={600}>
                    {item.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {item.price} Tk
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Items: {item.item_length}
                </Typography>
            </Box>

            {/* Right Actions */}
            <Box>
                <IconButton
                    size="small"
                    onClick={() => onEdit(item.id)}
                >
                    <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(item.id)}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
        </Paper>
    );
}


export default function PackagePage() {
    const nav = useNavigate();
    const { admin, loading, deletePackage } = useAdminContext()
    const packages = admin?.packages || []

    return (
        <>
            {loading ?? <div style={{ textAlign: "center" }}>Loaing</div>}
            <Stack spacing={3} maxWidth={500}>
                <Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => nav("../create/package")}
                    >
                        Add Package
                    </Button>
                </Box>

                <Stack gap={1}>
                    {packages.map(i => <ItemComponent key={i.id} item={i} onDelete={() => deletePackage(i.id)} />)}
                </Stack>
            </Stack>
        </>
    )
}
