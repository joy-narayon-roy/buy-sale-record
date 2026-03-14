import AddIcon from "@mui/icons-material/Add";
import { useAdminContext } from "../../context/admin_context/admin-context"
import { Box, Button, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom";
import ItemRow from "../../components/ItemRow";


export default function ItemPage() {
    const nav = useNavigate();
    const { deleteItem, admin, loading } = useAdminContext()
    const items = admin?.items || []
    return (
        <>
            {loading ?? <div style={{ textAlign: "center" }}>Loaing</div>}
            <Stack spacing={3} maxWidth={500}>
                <Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => nav("../create/item")}
                    >
                        Add Item
                    </Button>
                </Box>

                <Stack gap={1}>
                    {items.map(i => <ItemRow key={i.id} item={i} onDelete={() => deleteItem(`${i.id}`)} />)}
                </Stack>
            </Stack>
        </>
    )
}
