import { useNavigate, useParams } from "react-router-dom"
import { useAdminContext } from "../../context/admin_context/admin-context"
import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material"
import type Transaction from "../../models/Transaction";
import TransactionList from "./components/TransactionList";
import InvestorInfoCard from "./components/InvestorInfoCard";
import { useState } from "react";

type TransactionInfo = {
    deposits: Transaction[],
    total_deposits: number,
    withdraws: Transaction[],
    total_withdraws: number
}

export default function AdminInvestorById() {
    const { id = "" } = useParams()
    const { admin } = useAdminContext()
    const nav = useNavigate()
    const investor = admin?.get_investors([id])[0]

    const [tab, setTab] = useState(0);

    if (!investor) {
        return <Typography textAlign={'center'} >Investor not Found!</Typography>
    }

    const transactions = investor.transactions
    const defTransInfo: TransactionInfo = {
        deposits: [],
        total_deposits: 0,
        withdraws: [],
        total_withdraws: 0,
    }
    const t: TransactionInfo = transactions.reduce((acc, curr) => {
        if (curr.type === 'deposit') {
            acc.deposits.push(curr)
            acc.total_deposits += curr.amount
        } else if (curr.type === 'withdraw') {
            acc.withdraws.push(curr)
            acc.total_withdraws += curr.amount
        }
        return acc
    }, defTransInfo)
    const makeDeposit = () => {
        nav('/admin/create/transaction?type=deposit&investor_id=' + investor.id)
    }
    const makeWithdraw = () => {
        nav('/admin/create/transaction?type=withdraw&investor_id=' + investor.id)
    }

    const handleChange = (_: unknown, newValue: number) => {
        setTab(newValue);
    };
    const tab_index_result = [transactions, t.deposits, t.withdraws]
    return (
        <Box sx={{ maxWidth: "500px", m: "0 auto" }}>
            <InvestorInfoCard
                investor={investor}
                deposits={t.deposits}
                totalDeposit={t.total_deposits}
                withdraws={t.withdraws}
                totalWithdraw={t.total_withdraws}
            />
            <Stack direction={'row'} gap={2} mt={1} p={1}>
                <Button variant="contained" onClick={makeDeposit}>Deposit</Button>
                <Button variant="contained" onClick={makeWithdraw}>Withdraw</Button>
            </Stack>

            <Box>
                <Tabs value={tab} onChange={handleChange}>
                    <Tab label="All" />
                    <Tab label="Deposit" />
                    <Tab label="Withdraw" />
                </Tabs>

                <TransactionList transactions={tab_index_result[tab]} />
            </Box>
            {/* <TransactionList
                transactions={transactions}
            /> */}
        </Box>
    )
}
