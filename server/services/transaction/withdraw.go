package transaction

import (
	"bsr/config"
	"bsr/models"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func (t TransactionStruct) Withdraw(info WithdrawInfo) (*models.Transaction, error) {

	ok, invalid_msg := info.Validate()
	if !ok {
		return nil, errors.New(invalid_msg)
	}

	var createdTx models.Transaction

	err := config.DB.Transaction(func(tx *gorm.DB) error {
		var investor models.Investor

		// 1. Load investor + admin relation + verify ownership
		if err := tx.
			Where("id = ?", info.InvestorID).
			Preload("Admin").
			First(&investor).Error; err != nil {

			if errors.Is(err, gorm.ErrRecordNotFound) {
				return fmt.Errorf("investor not found or does not belong to this admin")
			}
			return fmt.Errorf("failed to load investor: %w", err)
		}

		// 2. Check sufficient balance — both sides
		if uint(investor.Balance) < info.Amount {
			return fmt.Errorf("insufficient investor balance: available %d, requested %d",
				investor.Balance, info.Amount)
		}

		if uint(investor.Admin.Balance) < info.Amount {
			return fmt.Errorf("insufficient admin balance: available %d, requested %d",
				investor.Admin.Balance, info.Amount)
		}

		// 3. Create transaction record
		txRecord := models.Transaction{
			Type:       models.TransactionTypeWithdraw,
			Amount:     info.Amount,
			InvestorID: investor.ID,
			AdminID:    investor.Admin.ID,
		}

		if t.Allow_update_date && info.Date != "" {
			ca, err := time.Parse("2006-01-02T15:04", info.Date)

			if err == nil {
				txRecord.CreatedAt = ca
			}
		}

		if err := tx.Create(&txRecord).Error; err != nil {
			return fmt.Errorf("failed to create withdrawal transaction: %w", err)
		}

		// 4. Decrease both balances atomically
		if err := tx.Model(&investor).
			Update("balance", gorm.Expr("balance - ?", info.Amount)).
			Error; err != nil {
			return fmt.Errorf("failed to decrease investor balance: %w", err)
		}

		if err := tx.Model(&investor.Admin).
			Update("balance", gorm.Expr("balance - ?", info.Amount)).
			Error; err != nil {
			return fmt.Errorf("failed to decrease admin balance: %w", err)
		}

		createdTx.ID = txRecord.ID
		return nil
	})

	if err != nil {
		return nil, err
	}

	// Optional: reload full transaction with preloads
	err = config.DB.
		First(&createdTx, "id = ?", createdTx.ID).Error
	// Preload("Investor").
	// Preload("Admin").

	if err != nil {
		// fallback
		return &models.Transaction{
			ID:         createdTx.ID,
			Type:       models.TransactionTypeWithdraw,
			Amount:     info.Amount,
			InvestorID: uuid.MustParse(info.InvestorID),
			AdminID:    createdTx.AdminID,
		}, nil
	}

	return &createdTx, nil
}
