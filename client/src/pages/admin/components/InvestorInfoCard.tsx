import { Avatar, Box, Card, CardContent, Divider, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type Investor from "../../../models/Investor";
import type Transaction from "../../../models/Transaction";

type InvestorInfoCardPropsType = {
    investor?: Investor | null;
    deposits?: Transaction[]
    totalDeposit?: number
    withdraws?: Transaction[]
    totalWithdraw?: number
    onUpdate?: () => void;
};

export default function InvestorInfoCard(props: InvestorInfoCardPropsType) {
    const {
        investor,
        onUpdate,
        deposits = [],
        totalDeposit = 0,
        withdraws = [],
        totalWithdraw = 0
    } = props;


    if (!investor) return null;

    return (
        <Card sx={{ maxWidth: 500, borderRadius: 3, margin: "0 auto" }}>
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                            sx={{
                                width: 56,
                                height: 56,
                                fontSize: 22,
                                bgcolor: "success.main",
                            }}
                        >
                            {investor.name.charAt(0).toUpperCase()}
                        </Avatar>

                        <Box>
                            <Typography variant="h6" fontWeight={600}>
                                {investor.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {investor.email}
                            </Typography>
                            <Typography variant="body2">
                                Balance : {investor.balance}
                            </Typography>

                            <Typography variant="caption" color="primary">
                                Investor
                            </Typography>
                        </Box>
                    </Stack>

                    {onUpdate && (
                        <Tooltip title="Edit profile">
                            <IconButton onClick={onUpdate}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Stats Section */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Deposits
                            </Typography>
                            <Typography fontWeight={600}>
                                {deposits.length}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Deposit Amount
                            </Typography>
                            <Typography fontWeight={600}>
                                +{totalDeposit}৳
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Withdraws
                            </Typography>
                            <Typography fontWeight={600}>
                                {withdraws.length}
                            </Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Withdraw Amount
                            </Typography>
                            <Typography fontWeight={600}>
                                -{totalWithdraw}৳
                            </Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Transaction
                            </Typography>
                            <Typography fontWeight={600}>{deposits.length + withdraws.length}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Balance
                            </Typography>
                            <Typography fontWeight={600}>{investor.balance}৳</Typography>
                        </Box>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
}
