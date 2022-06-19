const main = async () => {
    const currentValue = await SimpleStorage.retrieve()
    console.log(`Current Value is ${currentValue}`)

    //update current value
    const transactionResponse = await SimpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await SimpleStorage.retrieve()
    console.log(`Updated Value is ${updatedValue}`)
}
