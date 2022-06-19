const { task } = require("hardhat/config")

task("block-number", "Prints the current block nubmer").setAction(
    //const blockTask = async function () => {} this is essentials same

    async (taskArgs, hre) => {
        const blocknumber = await hre.ethers.provider.getBlockNumber()
        console.log(`current block number: ${blocknumber}`)
    }
)
