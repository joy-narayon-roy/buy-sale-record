package models

import (
	"github.com/google/uuid"
)

// ──────────────────────────────────────────────
// Enums as constants (GORM stores them as text/varchar)
type Status string

const (
	InvestorAgentStatusActive   Status = "active"
	InvestorAgentStatusPending  Status = "pending"
	InvestorAgentStatusDisabled Status = "disabled"

	TransactionTypeDeposit  Status = "deposit"
	TransactionTypeWithdraw Status = "withdraw"

	TransferTypeFund   Status = "fund"
	TransferTypeRefund Status = "refund"
)

type Sale struct {
	ID        int       `gorm:"primaryKey;autoIncrement"`
	AgentID   uuid.UUID `gorm:"type:uuid;index"`
	TotalCost int

	Agent     Agent      `gorm:"foreignKey:AgentID"`
	SaleItems []SaleItem `gorm:"foreignKey:SaleID;references:ID"`
}

type SaleItem struct {
	ID       int  `gorm:"primaryKey;autoIncrement"`
	SaleID   int  `gorm:"index"`
	ItemID   int  `gorm:"index"`
	Quantity uint `gorm:"not null"`
	Price    uint `gorm:"not null"`

	Item Item `gorm:"foreignKey:ItemID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
}

// ──────────────────────────────────────────────
// Many-to-Many: Agent ↔ Package
type AgentPackage struct {
	AgentID   int `gorm:"primaryKey;index"`
	PackageID int `gorm:"primaryKey;index"`

	// Optional: add timestamps if you want to track when assigned
	// CreatedAt time.Time
}
