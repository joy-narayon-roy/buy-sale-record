import { Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const Dashboard = () => {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Dashboard Overview
            </Typography>

            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Users</Typography>
                        <Typography variant="h4">1,240</Typography>
                    </Paper>
                </Grid>

                <Grid xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Revenue</Typography>
                        <Typography variant="h4">$12,400</Typography>
                    </Paper>
                </Grid>

                <Grid xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6">Orders</Typography>
                        <Typography variant="h4">320</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;