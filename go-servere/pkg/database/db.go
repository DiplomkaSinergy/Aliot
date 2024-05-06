package database

import (
	"aliot/models"
	"aliot/pkg/vars"

	"github.com/Avdushin/gogger/logger"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// @ Инициализация базы данных
func InitDB() {
	var err error
	dsn := vars.DB + " sslmode=disable TimeZone=Europe/Moscow"
	logger.Info("Database adres %s", dsn)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		logger.Error("Failed to connect to database:", err)
		panic("Failed to connect to database")
	}
}

// @ DataBase auto-migrate tables from structures...
// @ Таблицы: users, Section, MBTI, StroopResult
func SyncDB() {
	if err := DB.AutoMigrate(
		&models.User{},
		&models.Basket{},
		&models.BasketProduct{},
		&models.Product{},
		&models.Order{},
		&models.OrderProduct{},
		&models.CharacteristicName{},
		&models.BreakingCapacityChar{},
		&models.TypeOfMechanismChar{},
		&models.RatedCurrentChar{},
		&models.RatedVoltageChar{},
		&models.DegreeProtectionChar{},
		&models.NumberPolesChar{},
		&models.ShutdownCruveChar{},
		&models.DisplayChar{},
		&models.BrandsChar{},
	); err != nil {
		logger.Error("Failed to auto-migrate tables:", err)
		panic("Failed to auto-migrate tables")
	}

	logger.Info("✅ Tables has been migrated...")
}
