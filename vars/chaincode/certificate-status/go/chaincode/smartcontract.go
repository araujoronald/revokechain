package chaincode

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type CertificateEntry struct {
	SerialNumber     string `json:"serialNumber"`
	Status           string `json:"status"`
	RevocationReason string `json:"revocationReason"`
	RevocationTime   int    `json:"revocationTime"`
	IssuerKeyHash    string `json:"issuerKeyHash"`
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	fmt.Printf("Ledger initialized")
	return nil
}

func (s *SmartContract) CreateCertificateEntry(ctx contractapi.TransactionContextInterface, serialNumber string, revocationReason string, revocationTime int, issuerKeyHash string) error {
	exists, err := s.CertificateEntryExists(ctx, serialNumber)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the Certificate Entry %s already exists", serialNumber)
	}

	certEntry := CertificateEntry{
		SerialNumber:     serialNumber,
		Status:           "REVOKED",
		RevocationReason: revocationReason,
		RevocationTime:   revocationTime,
		IssuerKeyHash:    issuerKeyHash,
	}
	certEntryJSON, err := json.Marshal(certEntry)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(serialNumber+":"+issuerKeyHash, certEntryJSON)
}

func (s *SmartContract) ReadCertificateEntry(ctx contractapi.TransactionContextInterface, id string) (*CertificateEntry, error) {
	certEntryJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if certEntryJSON == nil {
		return nil, nil
	}

	var certEntry CertificateEntry
	err = json.Unmarshal(certEntryJSON, &certEntry)
	if err != nil {
		return nil, err
	}

	return &certEntry, nil
}

func (s *SmartContract) CertificateEntryExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	certEntryJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return certEntryJSON != nil, nil
}

func (s *SmartContract) GetAllAssets(ctx contractapi.TransactionContextInterface) ([]*CertificateEntry, error) {
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var certEntries []*CertificateEntry
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var certEntry CertificateEntry
		err = json.Unmarshal(queryResponse.Value, &certEntry)
		if err != nil {
			return nil, err
		}
		certEntries = append(certEntries, &certEntry)
	}

	return certEntries, nil
}
