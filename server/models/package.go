package models

type Package struct {
	ID        int     `gorm:"primaryKey;autoIncrement" json:"id"`
	Name      string  `gorm:"column:name;unique;not null" json:"name"`
	TotalCost float64 `gorm:"-" json:"total_cost"`

	PackageItems []PackageItem `gorm:"foreignKey:PackageID;constraint:OnDelete:CASCADE" json:"items"`
}
type PackageItem struct {
	PackageID int     `gorm:"primaryKey" json:"package_id"`
	ItemID    int     `gorm:"primaryKey" json:"item_id"`
	Quantity  float32 `json:"quantity"`
	Item      Item    `gorm:"foreignKey:ItemID" json:"item"`

	// Package Package `gorm:"foreignKey:PackageID" json:"package"`
}
