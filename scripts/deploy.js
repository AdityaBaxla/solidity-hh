//imports
const { ethers } = require("hardhat")

//asycn main()
const main = async () => {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    console.log("Deploying...")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    console.log(`Deploying contract to \n`)
    //anytime we deploy without specifiing the wallet/sighner and network hardhat uses its default hardhat network
    //comes with
    //rpc url
    //private key
}
//call main
main()
