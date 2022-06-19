//imports
const { ethers, run, network } = require("hardhat")

//asycn main()
const main = async () => {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    console.log("Deploying...")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    console.log(`Deploying contract to \n\n${SimpleStorage.address}`)
    //anytime we deploy without specifiing the wallet/sighner and network hardhat uses its default hardhat network
    //comes with
    //rpc url
    //private key

    //if the network is local dont run and if it is public network then run verify function
    console.log(network.config)
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for 5 block tx...")
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address)
    }

    //interact with the blockchain
    const currentValue = await SimpleStorage.retrieve()
    console.log(`Current Value is ${currentValue}`)

    //update current value
    const transactionResponse = await SimpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await SimpleStorage.retrieve()
    console.log(`Updated Value is ${updatedValue}`)
}

async function verify(contractAddress, args) {
    //args : arguments for contract (when they have constructor)
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}
//call main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
