package transfer

import (
	"bsr/config"
	"bsr/models"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type FundInfoType struct {
	Type      string `json:"type"`
	Amount    uint   `json:"amount"`
	AdminID   string `json:"admin_id"`
	AgentID   string `json:"agent_id"`
	CreatedAt string `json:"created_at"`
}

func (t TransferStruct) Fund(data FundInfoType) (*models.Transfer, error) {
	if data.Amount <= 0 {
		return nil, errors.New("amount must be greater than 0")
	}

	var createdTf models.Transfer

	err := config.DB.Transaction(func(tx *gorm.DB) error {
		var agent models.Agent

		// 1. Load investor + verify it belongs to this admin
		if err := tx.
			Where("id = ? and admin_id = ?", data.AgentID, data.AdminID).
			Preload("Admin").
			First(&agent).Error; err != nil {

			if errors.Is(err, gorm.ErrRecordNotFound) {
				return fmt.Errorf("agent not found or does not belong to this admin")
			}
			return fmt.Errorf("invalid agent info")
		}

		if agent.Admin.Balance < int(data.Amount) {
			return fmt.Errorf("admin does not have enough balance to transfer")
		}

		// 2. Create transaction record
		tfRecord := models.Transfer{
			Type:    models.TransferTypeFund,
			Amount:  data.Amount,
			AgentID: agent.ID,
			AdminID: agent.AdminID,
		}

		if t.Allow_update_date && data.CreatedAt != "" {
			ca, err := time.Parse("2006-01-02T15:04", data.CreatedAt)

			if err == nil {
				tfRecord.CreatedAt = ca
			}
		}

		if err := tx.Create(&tfRecord).Error; err != nil {
			return fmt.Errorf("failed to create transfer: %w", err)
		}

		// 3. Increase both balances atomically
		if err := tx.Model(&agent).
			Update("balance", gorm.Expr("balance + ?", data.Amount)).
			Error; err != nil {
			return fmt.Errorf("failed to increase agent balance: %w", err)
		}

		if err := tx.Model(&agent.Admin).
			Update("balance", gorm.Expr("balance - ?", data.Amount)).
			Error; err != nil {
			return fmt.Errorf("failed to increase admin balance: %w", err)
		}

		createdTf.ID = tfRecord.ID
		return nil
	})

	if err != nil {
		return nil, err
	}

	// Optional: reload full transaction with relations
	err = config.DB.
		First(&createdTf, "id = ?", createdTf.ID).Error
	// Preload("Investor").
	// Preload("Admin").

	if err != nil {
		// fallback - minimal object
		return &models.Transfer{
			ID:      createdTf.ID,
			Type:    models.TransferTypeFund,
			Amount:  createdTf.Amount,
			AgentID: uuid.MustParse(data.AgentID),
			AdminID: createdTf.AdminID,
			Admin:   createdTf.Admin,
			Agent:   createdTf.Agent,
		}, nil
	}

	return &createdTf, nil
}
