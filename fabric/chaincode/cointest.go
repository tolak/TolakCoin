package main

import (
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
	token "github.com/chaincode/token"
)

type CoinTest struct {

}

var tolakCoin *token.TolakCoin

func (c *CoinTest) Init(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println("CoinTest Init....")
	var asset int

	tolakCoin = new(token.TolakCoin)

	asset = 10000
	id := "public"
	if tolakCoin.Init("Tolak Bank", 1, "TLK", "v1.0.0", int(asset), id) == false{
		return shim.Error("Failed to create TolakCoin")
	}else{

		err := stub.PutState(id, []byte(strconv.Itoa(asset)))
		if err != nil{
			return shim.Error(err.Error())
		}
	}

	return shim.Success(nil)
}

func (c *CoinTest) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println("CoinTest Invoke")
	function, args := stub.GetFunctionAndParameters()
	if function == "newAccount" {
		// Create user account
		return c.newAccount(stub, args)
	} else if function == "sendTransfer" {
		// Make payment of X units from A to B
		return c.sendTransfer(stub, args)
	} else if function == "queryAsset" {
		// Query user balance
		return c.queryAsset(stub, args)
	}

	return shim.Error("Invalid invoke function name. Expecting \"invoke\" \"delete\" \"query\"")
}


//create a user
//string args[0]: user id
//string args[1]: user asset
func (c *CoinTest) newAccount(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var id string
	var asset int
	var err error

	if len(args) == 1{
		id = args[0]
		asset = 0
	}else if len(args) == 2{
		id = args[0]
		//asset, err = strconv.Atoi(args[1])
		//if err != nil{
		//	return shim.Error("Invalid asset amount, expecting a integer value")
		//}
		asset = 0;
	}else{
		return shim.Error("Incorrect number of arguments.")
	}

	//deliver 0 number of TolakCoin to user
	tolakCoin.Token.Deliver(token.Address(id), int(asset))

	//write to ledger
	err = stub.PutState(id, []byte(strconv.Itoa(asset)))
	if err != nil{
		return shim.Error(err.Error())
	}

	return shim.Success(nil)
}

//make a transaction between two user
//string args[0]: from
//string args[1]: to
//string args[2]: amounts
func (c *CoinTest) sendTransfer(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var A, B string    // Entities
	var Aval, Bval int // Asset holdings
	var X int          // Transaction value
	var err error

	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 3")
	}

	A = args[0]
	B = args[1]

	// Get the state from the ledger
	// TODO: will be nice to have a GetAllState call to ledger
	Avalbytes, err := stub.GetState(A)
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if Avalbytes == nil {
		return shim.Error("Entity not found")
	}
	Aval, _ = strconv.Atoi(string(Avalbytes))

	Bvalbytes, err := stub.GetState(B)
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if Bvalbytes == nil {
		return shim.Error("Entity not found")
	}
	Bval, _ = strconv.Atoi(string(Bvalbytes))

	// Perform the execution
	X, err = strconv.Atoi(args[2])
	if err != nil {
		return shim.Error("Invalid transaction amount, expecting a integer value")
	}
	Aval = Aval - X
	Bval = Bval + X
	fmt.Printf("Aval = %d, Bval = %d\n", Aval, Bval)

	// Write the state back to the ledger
	err = stub.PutState(A, []byte(strconv.Itoa(Aval)))
	if err != nil {
		return shim.Error(err.Error())
	}

	err = stub.PutState(B, []byte(strconv.Itoa(Bval)))
	if err != nil {
		return shim.Error(err.Error())
	}

	//TODO: make a transfer to update token out-of-ledger balance

	return shim.Success(nil)
}

//query user balance
//string args[0]: user id
func (c *CoinTest) queryAsset(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var A string // Entities
	var err error

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting name of the person to query")
	}

	A = args[0]

	// Get the state from the ledger
	Avalbytes, err := stub.GetState(A)
	if err != nil {
		jsonResp := "{\"Error\":\"Failed to get state for " + A + "\"}"
		return shim.Error(jsonResp)
	}

	if Avalbytes == nil {
		jsonResp := "{\"Error\":\"Nil amount for " + A + "\"}"
		return shim.Error(jsonResp)
	}

	jsonResp := "{\"Name\":\"" + A + "\",\"Amount\":\"" + string(Avalbytes) + "\"}"
	fmt.Printf("Query Response:%s\n", jsonResp)
	return shim.Success(Avalbytes)
}

func main() {
	err := shim.Start(new(CoinTest))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}
