import { createContext, useContext } from "react";
import { Agent, Item, type Admin } from "../../models";
import Investor, { type InvestorJSON } from "../../models/Investor";
import type { TransactionJSON } from "../../models/Transaction";
import Transaction from "../../models/Transaction";
import type { AgentJSON } from "../../models/Agent";
import type { TransferJSON } from "../../models/Transfer";
import Transfer from "../../models/Transfer";
import type { ItemJSON } from "../../models/Item";
import type { PackageJSON } from "../../models/Package";
import type { BuyJSON } from "../../models/Buy";

type AdminContextType = {
  admin: Admin | null;
  loading: boolean;
  login: (admin: string) => Promise<boolean>;
  logout: () => void;
  getAdmins: () => Promise<Admin[]>;
  addPackage: (pkg: PackageJSON) => void;
  addBuy: (buy: BuyJSON) => void;
  createInvestor: (inv: InvestorJSON) => Promise<Investor>;
  createAgent: (agent: AgentJSON) => Promise<Agent>;
  createTransaction: (tra: TransactionJSON) => Promise<Transaction>;
  createTransfer: (traf: TransferJSON) => Promise<Transfer>;
  getItemList: () => Promise<Item[]>;
  createItem: (itm: ItemJSON) => Promise<Item>;
  deleteItem: (iid: string) => Promise<boolean>;
  deletePackage: (pid: number) => Promise<boolean>;
};

const defaultContext: AdminContextType = {
  admin: null,
  loading: true,
  login: async () => false,
  logout: () => {},
  getAdmins: async () => [],
  addPackage: () => {},
  addBuy: () => {},
  createInvestor: async () => new Investor({}),
  createAgent: async () => new Agent({}),
  createTransaction: async () => new Transaction({}),
  createTransfer: async () => new Transfer({}),
  getItemList: async () => [],
  createItem: async (i) => new Item(i),
  deleteItem: async () => false,
  deletePackage: async () => false,
};
const AdminContext = createContext<AdminContextType>(defaultContext);

const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdminContext must be used inside AdminProvider");
  }

  return context;
};

export { useAdminContext };
export default AdminContext;
