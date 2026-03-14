import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/admin_context/admin-context";
import { Avatar, Box, Button, Card, CardHeader, Chip, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import type { Agent } from "../../models";

type Props = {
    agents: Agent[];
    onRemove?: (id: string) => void;
    goToAgent?: (id: string) => void
};

function AgentList({ agents, onRemove, goToAgent = () => { } }: Props) {
    return (
        <Card sx={{ maxWidth: 650, borderRadius: 3 }}>
            <CardHeader
                title="Agents"
                subheader={`${agents.length} total investors`}
            />

            <Divider />

            <List>
                {agents.map((age) => {
                    const isActive = age.status === "active";
                    return (
                        <ListItem
                            key={age.id}
                            sx={{
                                px: 3,
                                py: 1.5,
                                transition: "0.2s",
                                "&:hover": {
                                    bgcolor: "grey.100",
                                },
                            }}
                            onClick={() => goToAgent(age.id)}
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
                                            {age.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={
                                            <Typography fontWeight={600}>
                                                {age.name}
                                            </Typography>
                                        }
                                        secondary={age.email ?? "No email"}
                                    />
                                </Stack>

                                {/* Right Section */}
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Chip
                                        label={`${age.balance} Tk`}
                                        color={isActive ? "success" : "default"}
                                        variant={isActive ? "filled" : "outlined"}
                                        size="small"
                                    />

                                    {onRemove && (
                                        <IconButton
                                            color="error"
                                            onClick={() => onRemove(age.id)}
                                        >
                                            <PersonRemoveIcon />
                                        </IconButton>
                                    )}
                                </Stack>
                            </Stack>
                        </ListItem>
                    );
                })}

                {agents.length === 0 && (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                        <Typography color="text.secondary">
                            No agents found!
                        </Typography>
                    </Box>
                )}
            </List>
        </Card>
    );
}


export default function AdminAgent() {
    const { admin } = useAdminContext();
    const nav = useNavigate();

    return (
        <Stack spacing={3}>
            <Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => nav("../create/agent")}
                >
                    Create Agent
                </Button>
            </Box>

            <AgentList agents={admin?.agents || []} goToAgent={(id: string) => nav(id)} />
        </Stack>
    )
}
