import { useParams } from "react-router-dom"
import { useAdminContext } from "../../context/admin_context/admin-context"
import { Box, Stack, Typography, } from "@mui/material"
import ItemRow from "../../components/ItemRow";

export default function PackageById() {
    const { id = "" } = useParams()
    const { admin } = useAdminContext()
    const pkg = admin?.packages.filter(p => `${p.id}` === id)[0]

    if (!pkg) {
        return <></>
    }
    return (
        <Stack spacing={3} maxWidth={500}>
            <Box>
                <Typography variant="h5" >{pkg.name}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }} >{pkg.price} Tk</Typography>
            </Box>

            <Stack gap={1}>
                {pkg.items.map(i => <ItemRow item={i} key={i.id} />)}
            </Stack>
        </Stack>
    )
}
