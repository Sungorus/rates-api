const fs = require("fs").promises;
const path = require("path");

async function writeFileSyncRecursive(filename, content = "") {
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, content);
}

async function fetchExchangeRates() {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const response = await fetch("https://open.er-api.com/v6/latest");
    const { rates } = await response.json();

    const filePath = path.join(
      __dirname,
      "exchange-rates",
      `${formattedDate}.json`
    );
    await writeFileSyncRecursive(filePath, JSON.stringify(rates, null, 2));

    console.log("Exchange rates saved to:", filePath);
  } catch (error) {
    console.error("Error making request:", error.message);
    process.exit(1);
  }
}

fetchExchangeRates();
