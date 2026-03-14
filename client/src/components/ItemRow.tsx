import ExtensionIcon from "@mui/icons-material/Extension";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Box, IconButton, Input, Paper, Typography } from '@mui/material';
import type { Item } from '../models';


type Props = {
    item: Item,
    quantity?: number
    editQuanitiy?: boolean
    onEdit?: (item: Item) => void,
    onDelete?: (item: Item) => void,
    onQuanitiyChange?: (val: number) => void
}
export default function ItemRow({ item, editQuanitiy, onEdit, onDelete }: Props) {
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
            {/* Image */}
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

            {/* Item Info */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                    {item.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {item.price} Tk / {item.unit}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Qty: {editQuanitiy ? <Input type="number" value={item.quantity} /> : item.quantity}
                </Typography>
            </Box>

            {/* Right Actions */}
            <Box>
                {onEdit ? <>
                    <IconButton
                        size="small"
                        onClick={() => onEdit(item)}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </> : ""}

                {
                    onDelete ? <>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(item)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>

                    </> : ""
                }
            </Box>
        </Paper>
    );
}

