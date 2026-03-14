import AddIcon from "@mui/icons-material/Add";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/admin_context/admin-context";
import {
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
    Typography,
    Button,
    Stack,
    Box,
    Chip,
    Divider,
} from "@mui/material";
import type Investor from "../../models/Investor";

type Props = {
    investors: Investor[];
    onRemove?: (id: string) => void;
    goToInvestor?: (id: string) => void
};

function InvestorList({ investors, onRemove, goToInvestor = () => { } }: Props) {
    return (
        <Card sx={{ maxWidth: 650, borderRadius: 3 }}>
            <CardHeader
                title="Investors"
                subheader={`${investors.length} total investors`}
            />

            <Divider />

            <List>
                {investors.map((inv) => {
                    const isActive = inv.status === "active";
                    return (
                        <ListItem
                            key={inv.id}
                            sx={{
                                px: 3,
                                py: 1.5,
                                transition: "0.2s",
                                "&:hover": {
                                    bgcolor: "grey.100",
                                },
                            }}
                            onClick={() => goToInvestor(inv.id)}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                width="100%"
                                justifyContent="space-between"
                            >
                                {/* Left Section */}
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: "primary.main" }}>
                                            {inv.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={
                                            <Typography fontWeight={600}>
                                                {inv.name}
                                            </Typography>
                                        }
                                        secondary={inv.email ?? "No email"}
                                    />
                                </Stack>

                                {/* Right Section */}
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Chip
                                        label={`${inv.balance} Tk`}
                                        color={isActive ? "success" : "default"}
                                        variant={isActive ? "filled" : "outlined"}
                                        size="small"
                                    />

                                    {onRemove && (
                                        <IconButton
                                            color="error"
                                            onClick={() => onRemove(inv.id)}
                                        >
                                            <PersonRemoveIcon />
                                        </IconButton>
                                    )}
                                </Stack>
                            </Stack>
                        </ListItem>
                    );
                })}

                {investors.length === 0 && (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                        <Typography color="text.secondary">
                            No investors yet
                        </Typography>
                    </Box>
                )}
            </List>
        </Card>
    );
}

export default function AdminInvestor() {
    const { admin } = useAdminContext();
    const nav = useNavigate();

    return (
        <Stack spacing={3}>
            <Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => nav("../create/investor")}
                >
                    Create Investor
                </Button>
            </Box>

            <InvestorList investors={admin?.investors || []} goToInvestor={(id: string) => nav(id)} />
        </Stack>
    );
}