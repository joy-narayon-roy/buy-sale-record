package models

import (
	"time"

	"github.com/google/uuid"
)

type Buy struct {
	ID        int       `gorm:"primaryKey;autoIncrement" json:"id"`
	AdminID   uuid.UUID `gorm:"type:uuid;not null" json:"admin_id"`
	AgentID   uuid.UUID `gorm:"type:uuid;not null" json:"agent_id"`
	TotalCost float64   `gorm:"column:total_cost" json:"total_cost"`
	BuyItems  []BuyItem `gorm:"foreignKey:BuyID" json:"items"`
	CreatedAt time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
}

type BuyItem struct {
	BuyID  int `gorm:"primaryKey" json:"buy_id"`
	ItemID int `gorm:"primaryKey" json:"item_id"`

	Quantity float64 `gorm:"not null" json:"quantity"`

	Buy  *Buy  `gorm:"foreignKey:BuyID;constraint:OnDelete:CASCADE" json:"buy"`
	Item *Item `gorm:"foreignKey:ItemID" json:"item"`
}
