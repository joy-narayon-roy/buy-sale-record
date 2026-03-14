package models

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type Transfer struct {
	ID        uuid.UUID `gorm:"column:id;type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	Type      Status    `gorm:"column:type;not null;type:varchar(20)" json:"type"` // Deposit / Withdraw
	Amount    uint      `gorm:"column:amount;not null" json:"amount"`
	AdminID   uuid.UUID `gorm:"column:admin_id;type:uuid;index" json:"admin_id"`
	AgentID   uuid.UUID `gorm:"column:agent_id;type:uuid;index" json:"agent_id"`
	CreatedAt time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`

	Admin *Admin `gorm:"foreignKey:AdminID" json:"admin"`
	Agent *Agent `gorm:"foreignKey:AgentID" json:"agent"`
}

func (Transfer) TableName() string {
	return "transfer"
}

func (t Transfer) String() string {

	str := fmt.Sprintf("Transfer(id=%s, type='%s', amount=%d, admin_id='%s', agent='%s'", t.ID, t.Type, t.Amount, t.AdminID, t.Agent)
	str += ")"
	return str
}
