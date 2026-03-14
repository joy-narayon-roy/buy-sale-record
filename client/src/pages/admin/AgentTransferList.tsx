import { Box, Tab, Tabs } from "@mui/material";
import TransferList from "./components/TransferList";
import { useState } from "react";
import { useAdminContext } from "../../context/admin_context/admin-context";
import type Transfer from "../../models/Transfer";
import { useParams } from "react-router-dom";
type TransferInfo = {
    funds: Transfer[],
    total_fund: number,
    refunds: Transfer[],
    total_refund: number
}

export default function AgentTransferList() {
    const { id = "" } = useParams()
    const { admin } = useAdminContext()
    const agent = admin?.get_agents([id])[0]

    const [tab, setTab] = useState(0);
    if (!agent) {
        return <></>
    }
    const defTransInfo: TransferInfo = {
        funds: [],
        total_fund: 0,
        refunds: [],
        total_refund: 0,
    }
    const t: TransferInfo = agent.transfers.reduce((acc, curr) => {
        if (curr.type === 'fund') {
            acc.funds.push(curr)
            acc.total_fund += curr.amount
        } else if (curr.type === 'refund') {
            acc.refunds.push(curr)
            acc.total_refund += curr.amount
        }
        return acc
    }, defTransInfo)

    const handleChange = (_: unknown, newValue: number) => {
        setTab(newValue);
    };
    const tab_index_result = [agent.transfers, t.funds, t.refunds]

    return (
        <Box>
            <Tabs value={tab} onChange={handleChange}>
                <Tab label="All" />
                <Tab label="Funds" />
                <Tab label="Refund" />
            </Tabs>
            <TransferList transfers={tab_index_result[tab]} />
        </Box>
    )
}
