import { useParams } from "react-router-dom"
import { useAdminContext } from "../../context/admin_context/admin-context"


import { useState } from "react";
import {
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Stack,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import type { Buy } from "../../models";
import ItemRow from "../../components/ItemRow";

type BuyProp = {
    buy: Buy
}
function BuyComponent(props: BuyProp) {
    const { buy } = props
    const [openItems, setOpenItems] = useState(false);
    const items = buy.items || []
    return (
        <List sx={{ bgcolor: "background.paper" }}>


            {/* Items Parent */}
            <ListItemButton onClick={() => setOpenItems(!openItems)}>
                <ListItemText
                    primary={`Total : ${buy.total_cost} tk`}
                    secondary={`Items : ${items.length} | Created: ${new Date(buy.created_at).toLocaleDateString()}`}
                />                {openItems ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openItems} timeout="auto" unmountOnExit>
                <Stack gap={1}>
                    {items.map((itm, i) => <ItemRow key={i} item={itm.item} />
                    )}
                </Stack>
            </Collapse>

        </List>
    );
}
export default function AgentBuys() {
    const { id: agent_id = "" } = useParams()
    const { admin } = useAdminContext()
    const agent = (admin?.get_agents([agent_id]) || [])[0]
    if (!agent) {
        return <></>
    }

    return (
        <>
            <Stack gap={1}>
                {agent.buys.sort((a, b) => b.id - a.id).map((b) => <BuyComponent key={b.id} buy={b} />)}
            </Stack>
        </>
    )
}
