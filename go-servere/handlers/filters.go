package handlers

import (
	"aliot/models"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func (u *UserHandler) GetAllFilters(c *gin.Context) {

	var (
		brands           []models.BrandsChar
		breakingCapacity []models.BreakingCapacityChar
		degreeProtection []models.DegreeProtectionChar
		display          []models.DisplayChar
		numberPoles      []models.NumberPolesChar
		ratedCurrent     []models.RatedCurrentChar
		ratedVoltage     []models.RatedVoltageChar
		shutdownCruve    []models.ShutdownCruveChar
		typeOfMechanism  []models.TypeOfMechanismChar
	)

	if err := u.DB.Preload("CharacteristicName").Find(&brands).Error; err != nil {
		handleError(c, err, "brands")
		return
	}
	if err := u.DB.Preload("CharacteristicName").Find(&breakingCapacity).Error; err != nil {
		handleError(c, err, "breakingCapacity")
		return
	}
	if err := u.DB.Preload("CharacteristicName").Find(&degreeProtection).Error; err != nil {
		handleError(c, err, "degreeProtection")
		return
	}
	if err := u.DB.Preload("CharacteristicName").Find(&display).Error; err != nil {
		handleError(c, err, "display")
		return
	}
	if err := u.DB.Preload("CharacteristicName").Find(&numberPoles).Error; err != nil {
		handleError(c, err, "numberPoles")
		return
	}
	if err := u.DB.Preload("CharacteristicName").Find(&ratedCurrent).Error; err != nil {
		handleError(c, err, "ratedCurrent")
		return
	}
	if err := u.DB.Preload("CharacteristicName").Find(&ratedVoltage).Error; err != nil {
		handleError(c, err, "ratedVoltage")
		return
	}
	if err := u.DB.Preload("CharacteristicName").Find(&shutdownCruve).Error; err != nil {
		handleError(c, err, "shutdownCruve")
		return
	}
	if err := u.DB.Preload("CharacteristicName").Find(&typeOfMechanism).Error; err != nil {
		handleError(c, err, "typeOfMechanism")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"brands":           brands,
		"breakingCapacity": breakingCapacity,
		"degreeProtection": degreeProtection,
		"display":          display,
		"numberPoles":      numberPoles,
		"ratedCurrent":     ratedCurrent,
		"ratedVoltage":     ratedVoltage,
		"shutdownCruve":    shutdownCruve,
		"typeOfMechanism":  typeOfMechanism,
	})

}

func handleError(c *gin.Context, err error, modelName string) {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": modelName + " not found"})
		return
	}
	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch " + modelName})
}
