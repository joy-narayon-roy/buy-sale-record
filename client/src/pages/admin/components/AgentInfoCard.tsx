import { Avatar, Box, Card, CardContent, Divider, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { Agent } from "../../../models";
import type Transfer from "../../../models/Transfer";

type AgentInfoCardPropsType = {
    agent?: Agent | null;
    funds?: Transfer[]
    totalFund?: number
    refunds?: Transfer[]
    totalRefund?: number
    onUpdate?: () => void;
};

export default function AgentInfoCard(props: AgentInfoCardPropsType) {
    const {
        agent,
        onUpdate,
        funds = [],
        totalFund = 0,
        refunds = [],
        totalRefund = 0
    } = props;


    if (!agent) return null;

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
                            {agent.name.charAt(0).toUpperCase()}
                        </Avatar>

                        <Box>
                            <Typography variant="h6" fontWeight={600}>
                                {agent.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {agent.email}
                            </Typography>
                            <Typography variant="body2">
                                Balance : {agent.balance}
                            </Typography>

                            <Typography variant="caption" color="primary">
                                Agent
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
                                Funding
                            </Typography>
                            <Typography fontWeight={600}>
                                {funds.length}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Funding Amount
                            </Typography>
                            <Typography fontWeight={600}>
                                +{totalFund}৳
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Refunds
                            </Typography>
                            <Typography fontWeight={600}>
                                {refunds.length}
                            </Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Refund Amount
                            </Typography>
                            <Typography fontWeight={600}>
                                -{totalRefund}৳
                            </Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Transfer
                            </Typography>
                            <Typography fontWeight={600}>{funds.length + refunds.length}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Balance
                            </Typography>
                            <Typography fontWeight={600}>{agent.balance}৳</Typography>
                        </Box>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
}
