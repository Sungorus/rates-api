const fs = require('fs').promises
const path = require('path')

async function writeFileSyncRecursive(filename, content = '') {
  await fs.mkdir(path.dirname(filename), { recursive: true })
  await fs.writeFile(filename, content)
}

async function fetchExchangeRates(
  baseCurrency = 'USD',
  folderName = 'exchange-rates',
) {
  const apiEndpoint = `https://open.er-api.com/v6/latest?base=${baseCurrency}`

  try {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0]
    const response = await fetch(apiEndpoint)
    const { rates } = await response.json()
    const filePath = path.join(__dirname, folderName, `${formattedDate}.json`)
    const content = JSON.stringify(rates, null, 2)
    await writeFileSyncRecursive(filePath, content)
    const latestFilePath = path.join(__dirname, folderName, 'latest.json')
    await writeFileSyncRecursive(latestFilePath, content)
  } catch (error) {
    process.exit(1)
  }
}

fetchExchangeRates()
