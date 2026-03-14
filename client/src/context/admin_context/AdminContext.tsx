import React, { useEffect, useState } from "react";
import { Admin, Agent, Buy, Item, Package } from "../../models";
import AdminContext from "./admin-context";
import api from "../../services/axios";
import type { InvestorJSON } from "../../models/Investor";
import Investor from "../../models/Investor";
import type { TransactionJSON } from "../../models/Transaction";
import Transaction from "../../models/Transaction";
import type { AgentJSON } from "../../models/Agent";
import type { TransferJSON } from "../../models/Transfer";
import Transfer from "../../models/Transfer";
import type { ItemJSON } from "../../models/Item";
import type { PackageJSON } from "../../models/Package";
import type { BuyJSON } from "../../models/Buy";

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmin = async () => {
            const admin_id = window.localStorage.getItem("admin");

            if (!admin_id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const { data } = await api.get(`/admin/${admin_id}`);
                setAdmin(new Admin(data));
            } catch (err) {
                console.log("Admin login failed", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, []);

    const login = async (admin_id: string) => {
        try {
            const { data } = await api.get(`/admin/${admin_id}`);
            window.localStorage.setItem("admin", admin_id);
            setAdmin(new Admin(data));
            return true;
        } catch (err) {
            console.log("Failed to Login as Admin");
            console.log(err);
            return false;
        }
    };

    const logout = () => {
        window.localStorage.removeItem("admin");
        setAdmin(null);
    };

    const getAdmins = async () => {
        return await Admin.getAdmins();
    };

    const addPackage = (pkg: PackageJSON) => {
        const new_pkg = new Package(pkg, admin || undefined)
        admin?.add_packages([new_pkg])
    }

    const addBuy = (buyJSON: BuyJSON) => {
        const buy = new Buy(buyJSON, admin || undefined)
        admin?.add_buy(buy)
    }

    const createInvestor = async (inv: InvestorJSON): Promise<Investor> => {
        const { data } = await api.post("/investor", {
            ...inv,
            admin: inv.admin_id,
        });

        const new_inv = new Investor(data, admin || undefined);
        admin?.add_investor(new_inv);
        return new_inv;
    };

    const createAgent = async (agent: AgentJSON): Promise<Agent> => {
        const { data } = await api.post("/agent", {
            ...agent,
        });

        const new_agent = new Agent(data, admin || undefined);
        admin?.add_agent(new_agent);
        return new_agent;
    };

    const createTransaction = async (
        tra: TransactionJSON
    ): Promise<Transaction> => {
        const { data } = await api.post(
            `/transaction/${tra.type}`,
            // `/investor/${tra.investor_id}/${tra.type}`,
            {
                ...tra,
                amount: tra.amount,
            }
        );

        const new_tra = new Transaction(data);
        admin?.add_transaction(new_tra);
        return new_tra;
    };

    const createTransfer = async (
        tra: TransferJSON
    ): Promise<Transfer> => {
        const { data } = await api.post(
            `/transfer/${tra.type}`,
            {
                ...tra,
                amount: tra.amount,
            }
        );
        const new_trf = new Transfer(data)
        admin?.add_transfer(new_trf)
        return new_trf
    }

    const getItemList = async (): Promise<Item[]> => {
        const itms = admin?.items
        if (itms?.length) {
            return itms
        }
        const { data }: { data: ItemJSON[] } = await api.get("/item")
        const items = data.map(d => new Item(d)) || []
        admin?.add_items(items)
        return items
    }

    const createItem = async (i: ItemJSON): Promise<Item> => {
        const { data } = await api.post("/item", i)
        const itm = new Item(data)
        if (admin) {
            admin?.add_items([itm])
        }
        return itm
    }
    const deleteItem = async (iid: string): Promise<boolean> => {
        await api.delete("/item/" + iid)
        admin?.remove_item(iid)
        setAdmin(new Admin(admin ? JSON.parse(JSON.stringify(admin)) : {}))
        return true
    }
    const deletePackage = async (pid: number): Promise<boolean> => {
        await api.delete("/item/" + pid)
        admin?.remove_package(pid)
        setAdmin(new Admin(admin ? JSON.parse(JSON.stringify(admin)) : {}))
        return true
    }

    const admin_provider_values = {
        admin,
        loading,
        login,
        logout,
        getAdmins,
        addPackage,
        addBuy,
        createInvestor,
        createTransaction,
        createAgent,
        createTransfer,
        getItemList,
        createItem,
        deleteItem,
        deletePackage
    };

    return (
        <AdminContext.Provider value={admin_provider_values}>
            {children}
        </AdminContext.Provider>
    );
}