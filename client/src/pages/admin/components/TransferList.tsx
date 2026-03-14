import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Paper,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import type Transfer from "../../../models/Transfer";

interface Props {
    transfers?: Transfer[];
}

export default function TransferList({ transfers = [] }: Props) {
    transfers = transfers.sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    return (
        <Paper sx={{ mt: 2 }}>
            <List>
                {transfers.map((t) => (
                    <ListItem key={t.id} divider>
                        <ListItemAvatar>
                            <Avatar
                                sx={{
                                    bgcolor: t.type === "fund" ? "success.main" : "error.main",
                                }}
                            >
                                {t.type === "fund" ? (
                                    <ArrowDownwardIcon />
                                ) : (
                                    <ArrowUpwardIcon />
                                )}
                            </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                            primary={
                                <Typography fontWeight={600}>
                                    {t.type === "fund" ? "Funding" : "Refund"}
                                </Typography>
                            }
                            secondary={t.date.toLocaleDateString()}
                        />

                        <Typography
                            fontWeight={600}
                            color={t.type === "fund" ? "success.main" : "error.main"}
                        >
                            {t.type === "fund" ? "+" : "-"}৳{t.amount}
                        </Typography>
                    </ListItem>
                ))}
            </List>

            {transfers.length === 0 && <Typography textAlign={'center'} p={2}>No transfer found!</Typography>}
        </Paper>
    );
}