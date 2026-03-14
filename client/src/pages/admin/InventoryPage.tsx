import { Stack } from "@mui/system"
import { useAdminContext } from "../../context/admin_context/admin-context"
import ItemRow from "../../components/ItemRow"

type Result = {
    [key: string]: number
}
export default function InventoryPage() {
    const { admin } = useAdminContext()
    const def: Result = {}
    const inven: Result = (admin?.buys || []).reduce((pre, curr) => {
        for (const itm of curr.items) {
            if (!pre[`${itm.item.id}`]) {
                pre[`${itm.item.id}`] = 0
            }
            pre[`${itm.item.id}`] += itm.quantity
        }
        return pre
    }, def)
    const itm_ids = Object.keys(inven).map(i => parseInt(i))
    const items = (admin?.items_by_id(itm_ids) || []).map(i => {
        i.quantity = inven[i.id]
        return i
    })
    return (
        <>
            <Stack gap={1}>
                {items.map(i => <ItemRow key={i.id} item={i} />)}
            </Stack>
        </>
    )
}
