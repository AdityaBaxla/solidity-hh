const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", () => {
    let simpleStorageFactory, SimpleStorage
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("should update when we call store", async function () {
        const expectedValue = "7"
        const trasactionResponse = await simpleStorage.store(expectedValue)

        await trasactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), expectedValue)
    })
})
