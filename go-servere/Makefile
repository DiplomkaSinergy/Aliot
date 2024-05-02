# variables
appname = app

# run the application
.PHONY: all

# building docs and run the app
all: run

# run the app
run:
	go run ./cmd/$(appname)/main.go
# build go app
build:
	go build -o $(appname) ./cmd/$(appname)/main.go

# start binary app
start:
	./$(appname)