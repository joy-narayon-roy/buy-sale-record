package transaction

type TransactionInfoStruct struct {
	InvestorID string `json:"investor_id"`
	Amount     uint   `json:"amount"`
	Date       string `json:"created_at"`
}

func (ti TransactionInfoStruct) Validate() (bool, string) {
	if ti.InvestorID == "" {
		return false, "investor id required!"
	}
	if ti.Amount <= 0 {
		return false, "amount must be greater than 0"
	}
	return true, ""
}

type DepositInfo = TransactionInfoStruct
type WithdrawInfo = TransactionInfoStruct

type TransactionStruct struct {
	Allow_update_date bool
	// DepositInfo       DepositInfo
	// WithdrawInfo      WithdrawInfo
}
