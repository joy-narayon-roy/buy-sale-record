package services

import (
	"bsr/services/admin"
	"bsr/services/agent"
	"bsr/services/buy"
	"bsr/services/investor"
	"bsr/services/transaction"
	"bsr/services/transfer"
)

var (
	Admin       = admin.AdminStruct{}
	Transaction = transaction.TransactionStruct{
		Allow_update_date: false,
	}
	Investor = investor.InvestorStruct{}
	Agent    = agent.AgentStruct{}
	Transfer = transfer.TransferStruct{
		Allow_update_date: false,
	}
	Buy = buy.BuyStruct{
		Allow_update_time: false,
	}
)
