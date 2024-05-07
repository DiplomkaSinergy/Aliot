package handlers

import (
	"aliot/models"
	"fmt"

	"github.com/gin-gonic/gin"
)

func (u *UserHandler) CreateProduct(c *gin.Context) {

	var reqBody struct {
		Name                   string                `json:"name"`
		Price                  float64               `json:"price"`
		Info                   *[]models.ProductInfo `json:"info"`
		BreakingCapacityCharID *uint                 `json:"breakingCapacityCharId"`
		TypeOfMechanismCharID  *uint                 `json:"typeOfMechanismCharId"`
		RatedCurrentCharID     *uint                 `json:"ratedCurrentCharId"`
		RatedVoltageCharID     *uint                 `json:"ratedVoltageCharId"`
		DegreeProtectionCharID *uint                 `json:"degreeProtectionCharId"`
		NumberPolesCharID      *uint                 `json:"numberPolesCharId"`
		ShutdownCruveCharID    *uint                 `json:"shutdownCruveCharId"`
		DisplayCharID          *uint                 `json:"displayCharId"`
		BrandsCharID           *uint                 `json:"brandsCharId"`
	}

	// fmt.Printf(c.Request.Body)
	fmt.Println("Request body:", c.Request.Body)

}
