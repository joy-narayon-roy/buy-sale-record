import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Box, Card, Typography } from "@mui/material";
import type { ReactNode } from "react";


type Props = {
    amount: number;
    label: string;
    icon?: ReactNode
};

function SummaryCard({ amount, label, icon = <AccountBalanceWalletIcon fontSize="large" color="primary" />
}: Props) {
    return (
        <Card
            sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: 2,
            }}
        >
            {icon}

            <Box>
                <Typography variant="h6" fontWeight={600}>
                    {amount}৳
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    {label}
                </Typography>
            </Box>
        </Card>
    );
}
export default SummaryCard