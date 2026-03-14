import { useAdminContext } from "../../context/admin_context/admin-context"
import type { Transaction } from "../../models";
import SummaryCard from "./components/SummaryCard";
import TransactionList from "./components/TransactionList"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Equalizer, } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";

type Result = {
  deposits: Transaction[]
  total_deposit: number
  withdraws: Transaction[]
  total_withdraw: number
}
export default function AdminTransaction() {
  const { admin, loading } = useAdminContext()
  const [tab, setTab] = useState(0);


  const handleChange = (_: unknown, newValue: number) => {
    setTab(newValue);
  };

  const transactions = admin?.transactions || []
  if (!admin && !loading) {
    return <></>
  }

  const default_trans: Result = {
    deposits: [],
    total_deposit: 0,
    total_withdraw: 0,
    withdraws: []
  }

  const result = transactions.reduce((pre, curr) => {
    if (curr.type === "deposit") {
      pre.deposits.push(curr)
      pre.total_deposit += curr.amount
    } else if (curr.type === "withdraw") {
      pre.withdraws.push(curr)
      pre.total_withdraw += curr.amount
    }
    return pre
  }, default_trans)

  const tabs = [transactions, result.deposits, result.withdraws]
  return (
    <Box
      sx={{ maxWidth: 500 }}
    >
      <Stack
        direction={"row"}
        gap={1}
      >
        <SummaryCard amount={result.total_deposit} label="Deposit" icon={<ArrowDownwardIcon
          sx={{
            color: "success.main",
          }}
        />} />
        <SummaryCard amount={result.total_withdraw} label="Withdraw" icon={<ArrowUpwardIcon
          sx={{
            color: "success.main",
          }}
        />} />
        <SummaryCard amount={result.total_deposit - result.total_withdraw} label="Remain" icon={<Equalizer
          sx={{
            color: "success.main",
          }}
        />} />
      </Stack>


      <Box>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="All" />
          <Tab label="Deposit" />
          <Tab label="Withdraw" />
        </Tabs>
        <TransactionList transactions={tabs[tab]} />
      </Box>

    </Box>
  )
}
