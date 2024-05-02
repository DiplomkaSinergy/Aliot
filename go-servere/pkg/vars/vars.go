package vars

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	_ = godotenv.Load()
	//@ APP
	PORT          = os.Getenv("PORT")
	APP_MODE      = os.Getenv("APP_MODE")
	DAILY_LOGGING = os.Getenv("DAILY_LOGGING")
	SERVER_URL    = os.Getenv("SERVER_URL")
	APP_VERSION   = os.Getenv("APP_VERSION")
	APP_NAME      = os.Getenv("APP_NAME")
	//@ DB
	DB         = os.Getenv("DB")
	BACKUP_DIR = os.Getenv("BACKUP_DIR")
	PG_VERSION = os.Getenv("PG_VERSION")
	//@ YOKASSA
	YOKASSA_TOKEN = os.Getenv("YOKASSA_TOKEN")
	//@TELEGRAM
	TELEGRAM_BOT_TOKEN   = os.Getenv("TELEGRAM_BOT_TOKEN")
	TELEGRAM_BOT_CHAT_ID = os.Getenv("TELEGRAM_BOT_CHAT_ID")
	//@ SMTP
	POST_NAME       = os.Getenv("POST_NAME")
	POST_PASS       = os.Getenv("POST_PASS")
	BACKUP_INTERVAL = os.Getenv("BACKUP_INTERVAL")
	POST_SERVER     = os.Getenv("POST_SERVER")
	POST_PORT       = os.Getenv("POST_PORT")
	//@ Admin
	ADMIN_EMAIL = os.Getenv("ADMIN_EMAIL")
	ADMIN_PASS  = os.Getenv("ADMIN_PASS")
	//@ JWT
	JWT_SECRET = os.Getenv("JWT_SECRET")
	//@ SSL/TLS certs path
	Cert = "/var/www/certs/domain-example.ru.pub"
	Key  = "/var/www/private/domain-example.ru.key"
)
