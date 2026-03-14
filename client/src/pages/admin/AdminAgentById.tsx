import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useAdminContext } from "../../context/admin_context/admin-context"
import { Box, Button, Stack, Typography } from "@mui/material"
import type Transfer from "../../models/Transfer";
import AgentInfoCard from "./components/AgentInfoCard";
import PageNav from "../../components/PageNav";

type TransferInfo = {
    funds: Transfer[],
    total_fund: number,
    refunds: Transfer[],
    total_refund: number
}

export default function AdminAgentById() {
    const { id = "" } = useParams()
    const { admin } = useAdminContext()
    const nav = useNavigate()
    const agent = admin?.get_agents([id])[0]

    if (!agent) {
        return <Typography textAlign={'center'} >Agent not Found!</Typography>
    }

    const nested_paths = [
        { path: `transfer`, lable: "Transfer" },
        { path: `buy`, lable: "Buy" },
        { path: `sale`, lable: "Sale" }
    ]



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
    const makeFund = () => {
        nav('/admin/create/transfer?type=fund&agent_id=' + agent.id)
    }
    const makeRefund = () => {
        nav('/admin/create/transfer?type=refund&agent_id=' + agent.id)
    }

    const makeBuy = () => {
        nav('/admin/create/buy?agent_id=' + agent.id)
    }
    const makeSale = () => {
        nav('/admin/create/sale?agent_id=' + agent.id)
    }


    return (
        <Box sx={{ maxWidth: "500px", m: "0 auto" }}>
            <AgentInfoCard
                agent={agent}
                funds={t.funds}
                refunds={t.refunds}
                totalFund={t.total_fund}
                totalRefund={t.total_refund}
            />

            <Stack direction={'row'} gap={2} mt={1} p={1}>
                <Button variant="contained" onClick={makeFund}>Funding</Button>
                <Button variant="contained" onClick={makeRefund}>Refund</Button>
                <Button variant="contained" color="success" onClick={makeBuy}>Buy</Button>
                <Button variant="contained" color="success" onClick={makeSale}>Sale</Button>
            </Stack>


            <PageNav paths={nested_paths} />
            <Outlet />

        </Box>
    )
}
