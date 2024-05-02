package jwt

import (
	"aliot/models"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

// CreateToken creates a JWT token for a user
func CreateToken(user models.User) (string, error) {
	claims := &models.Claims{
		GormModel: models.GormModel{
			ID: user.ID,
		},
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Role:      user.Role,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24 * 7).Unix(),
		},
	}

	// Create a new JWT token with the specified claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token using the secret key stored in environment variables
	signedToken, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err // Return empty string and error in case of failure
	}

	return signedToken, nil
}
