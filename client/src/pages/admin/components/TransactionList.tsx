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
import Transaction from "../../../models/Transaction";


interface Props {
    transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
    return (
        <Paper sx={{ mt: 2 }}>
            <List>
                {transactions.map((t) => (
                    <ListItem key={t.id} divider>
                        <ListItemAvatar>
                            <Avatar
                                sx={{
                                    bgcolor: t.type === "deposit" ? "success.main" : "error.main",
                                }}
                            >
                                {t.type === "deposit" ? (
                                    <ArrowDownwardIcon />
                                ) : (
                                    <ArrowUpwardIcon />
                                )}
                            </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                            primary={
                                <Typography fontWeight={600}>
                                    {t.type === "deposit" ? "Deposit" : "Withdraw"}
                                </Typography>
                            }
                            secondary={t.date.toLocaleDateString()}
                        />

                        <Typography
                            fontWeight={600}
                            color={t.type === "deposit" ? "success.main" : "error.main"}
                        >
                            {t.type === "deposit" ? "+" : "-"}৳{t.amount}
                        </Typography>
                    </ListItem>
                ))}
                {transactions.length === 0 && <Typography textAlign={'center'} p={2}>No transaction found!</Typography>}

            </List>
        </Paper>
    );
}