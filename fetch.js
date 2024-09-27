const fs = require('fs').promises
const path = require('path')

async function writeFileSyncRecursive(filename, content = '') {
  await fs.mkdir(path.dirname(filename), { recursive: true })
  await fs.writeFile(filename, content)
}

async function fetchExchangeRates(baseCurrency = 'USD', folderName = 'data') {
  const apiEndpoint = `https://open.er-api.com/v6/latest?base=${baseCurrency}`

  try {
    const currentDate = new Date()
    const year = String(currentDate.getFullYear())
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')
    const response = await fetch(apiEndpoint)
    const { rates } = await response.json()
    const currencyFolder = path.join(
      __dirname,
      folderName,
      baseCurrency,
      year,
      month,
    )
    const filePath = path.join(currencyFolder, `${day}.json`)
    const content = JSON.stringify(rates, null, 2)
    await writeFileSyncRecursive(filePath, content)
    const latestFilePath = path.join(
      __dirname,
      folderName,
      baseCurrency,
      'latest.json',
    )
    await writeFileSyncRecursive(latestFilePath, content)
  } catch (error) {
    process.exit(1)
  }
}

fetchExchangeRates()
