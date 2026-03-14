import { useAdminContext } from "../../context/admin_context/admin-context"
import SummaryCard from "./components/SummaryCard";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Equalizer, } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import type Transfer from "../../models/Transfer";
import TransferList from "./components/TransferList";

type Result = {
  funds: Transfer[]
  total_fund: number
  refunds: Transfer[]
  total_refund: number
}
export default function AdminTransfer() {
  const { admin, loading } = useAdminContext()
  const [tab, setTab] = useState(0);


  const handleChange = (_: unknown, newValue: number) => {
    setTab(newValue);
  };

  const transfers = admin?.transfers || []
  if (!admin && !loading) {
    return <></>
  }

  const default_trans: Result = {
    funds: [],
    total_fund: 0,
    refunds: [],
    total_refund: 0,
  }

  const result = transfers.reduce((pre, curr) => {
    if (curr.type === "fund") {
      pre.funds.push(curr)
      pre.total_fund += curr.amount
    } else if (curr.type === "refund") {
      pre.refunds.push(curr)
      pre.total_refund += curr.amount
    }
    return pre
  }, default_trans)

  const tabs = [transfers, result.funds, result.refunds]
  return (
    <Box
      sx={{ maxWidth: 500 }}
    >
      <Stack
        direction={"row"}
        gap={1}
      >
        <SummaryCard amount={result.total_fund} label="Fund" icon={<ArrowDownwardIcon
          sx={{
            color: "success.main",
          }}
        />} />
        <SummaryCard amount={result.total_refund} label="Refund" icon={<ArrowUpwardIcon
          sx={{
            color: "success.main",
          }}
        />} />
        <SummaryCard amount={result.total_fund - result.total_refund} label="Remain" icon={<Equalizer
          sx={{
            color: "success.main",
          }}
        />} />
      </Stack>


      <Box>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="All" />
          <Tab label="Fund" />
          <Tab label="Refund" />
        </Tabs>
        <TransferList transfers={tabs[tab]} />
        {/* <TransactionList transactions={tabs[tab]} /> */}
      </Box>

    </Box>
  )
}









