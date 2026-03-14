package models

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type Transaction struct {
	ID         uuid.UUID `gorm:"column:id;type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	Type       Status    `gorm:"column:type;not null;type:varchar(20)" json:"type"` // Deposit / Withdraw
	Amount     uint      `gorm:"column:amount;not null" json:"amount"`
	AdminID    uuid.UUID `gorm:"column:admin_id;type:uuid;index" json:"admin_id"`
	InvestorID uuid.UUID `gorm:"column:investor_id;type:uuid;index" json:"investor_id"`
	CreatedAt  time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`

	Admin    *Admin    `gorm:"foreignKey:AdminID" json:"admin"`
	Investor *Investor `gorm:"foreignKey:InvestorID" json:"investor"`
}

func (Transaction) TableName() string {
	return "transaction"
}

func (t Transaction) String() string {
	str := fmt.Sprintf("Transaction(id=%s, type='%s', amount=%d, admin_id='%s', investor_id='%s'", t.ID, t.Type, t.Amount, t.AdminID, t.InvestorID)
	str += ")"
	return str
}
