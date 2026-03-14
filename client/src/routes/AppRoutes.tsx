import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

import {
    LoginAsAdmin,
    LoginAsAgent,
    LoginAsInvestor,
    LoginMenu,
    LoginPage,
} from "../pages/login";

import { AdminProvider } from "../context/admin_context/AdminContext";
import { AdminAgent, AdminAgentById, AdminDashboard, AdminInvestor, AdminInvestorById, AdminPage, AdminTransaction, AdminTransfer, AgentBuys, AgentSale, AgentTransferList, InventoryPage, ItemPage, PackageById, PackagePage } from "../pages/admin";
import {
    CreateAgent,
    CreateInvestor,
    CreateTransaction,
    CreateTransfer,
    CreateItem,
    CreatePackage,
    CreateBuy
} from "../pages/admin/create";


const AppRoutes = () => {
    return (
        <AdminProvider>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />

                    {/* Login Routes */}
                    <Route path="login" element={<LoginPage />}>
                        <Route index element={<LoginMenu />} />
                        <Route path="investor" element={<LoginAsInvestor />} />
                        <Route path="admin" element={<LoginAsAdmin />} />
                        <Route path="agent" element={<LoginAsAgent />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path="admin" element={<AdminPage />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="investor" element={<AdminInvestor />} />
                        <Route path="investor/:id" element={<AdminInvestorById />} />
                        <Route path="agent" element={<AdminAgent />} />
                        <Route path="agent/:id" element={<AdminAgentById />}>
                            <Route index element={<AgentTransferList />} />
                            <Route path="transfer" element={<AgentTransferList />} />
                            <Route path="buy" element={<AgentBuys />} />
                            <Route path="sale" element={<AgentSale />} />
                        </Route>
                        <Route path="transaction" element={<AdminTransaction />} />
                        <Route path="transfer" element={<AdminTransfer />} />
                        <Route path="item" element={<ItemPage />} />
                        <Route path="package" element={<PackagePage />} />
                        <Route path="package/:id" element={<PackageById />} />
                        <Route path="create">
                            <Route index element={<>Admin Create</>} />
                            <Route path="agent" element={<CreateAgent />} />
                            <Route path="investor" element={<CreateInvestor />} />
                            <Route path="transaction" element={<CreateTransaction />} />
                            <Route path="transfer" element={<CreateTransfer />} />
                            <Route path="item" element={<CreateItem />} />
                            <Route path="package" element={<CreatePackage />} />
                            <Route path="buy" element={<CreateBuy />} />
                            <Route path="sale" element={<h1>Create Sale</h1>} />
                        </Route>
                        <Route path="edit">
                            <Route index element={<>Admin Edit</>} />
                            <Route path="agent" element={<>Admin Agent Edit</>} />
                            <Route path="investor" element={<>Admin Investor Edit</>} />
                        </Route>
                        <Route path="inventory" element={<InventoryPage />} />
                    </Route>
                </Route>

                {/* Other Routes */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AdminProvider>
    );
};

export default AppRoutes;