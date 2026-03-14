.PHONY: start build
start: 
	clear
	ENV=development air

build-win:
	mkdir -p build
	go build -o ./build/bsr_server.exe .

build:
	mkdir -p ../build
	go build -o ../build/bsr_server.linux .
build-termux:
	mkdir -p ../build
	GOOS=linux GOARCH=arm64 go build -o ../build/bsr_server.termux . 
# 	go build -o ../build/bsr_server.termux .