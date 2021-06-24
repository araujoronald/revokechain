package main

import (
	"log"

	"github.com/araujoronald/certificate-status-chaincode-go/chaincode"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	assetChaincode, err := contractapi.NewChaincode(&chaincode.SmartContract{})
	if err != nil {
		log.Panicf("Error creating certificate-status-chaincode: %v", err)
	}

	if err := assetChaincode.Start(); err != nil {
		log.Panicf("Error starting certificate-status-chaincode: %v", err)
	}
}
