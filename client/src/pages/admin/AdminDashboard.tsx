import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Stack,
    IconButton,
    Box,
    Divider,
    Grid,
    Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAdminContext } from "../../context/admin_context/admin-context";
import type { Admin } from "../../models";

type PropsType = {
    admin?: Admin | null;
    onUpdate?: () => void;
};

function InfoCard(props: PropsType) {
    const { admin, onUpdate } = props;

    if (!admin) return null;

    return (
        <Card sx={{ maxWidth: 500, borderRadius: 3 }}>
            <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                            sx={{
                                width: 56,
                                height: 56,
                                fontSize: 22,
                                bgcolor: "primary.main",
                            }}
                        >
                            {admin.name.charAt(0).toUpperCase()}
                        </Avatar>

                        <Box>
                            <Typography variant="h6" fontWeight={600}>
                                {admin.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {admin.email}
                            </Typography>
                            <Typography variant="body2">
                                Balance : {admin.balance}
                            </Typography>

                            <Typography variant="caption" color="primary">
                                Admin
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
                                Investors
                            </Typography>
                            <Typography fontWeight={600}>
                                {admin.investors_length}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Transactions
                            </Typography>
                            <Typography fontWeight={600}>
                                {admin.transactions_length}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Agents
                            </Typography>
                            <Typography fontWeight={600}>{admin.agents.length}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Transfers
                            </Typography>
                            <Typography fontWeight={600}>{admin.transfers.length}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard() {
    const { admin } = useAdminContext();

    const onUpdate = () => {
        console.log("Update it");
    };

    return (
        <Box sx={{ p: 3 }}>
            <InfoCard admin={admin} onUpdate={onUpdate} />
        </Box>
    );
}