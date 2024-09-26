# Rates API

This API provides access to daily exchange rates for various currencies. Exchange rates are stored in a structured format for easy access and manageability.

## Directory Structure

Exchange rates are stored in the following structure:

```
/data
  /USD
    /2024
      /01
        - 01.json
    latest.json
```

## Fetching Daily Rates

To access the exchange rates for a specific day, use the following URL format:

```bash
https://cdn.jsdelivr.net/gh/Sungorus/rates-api@2/data/USD/2024/01/01.json
```

### Example Requests

To get the exchange rates for January 1, 2024:

```bash
curl https://cdn.jsdelivr.net/gh/Sungorus/rates-api@2/data/USD/2024/01/01.json
```

### Response Example

The response for daily rates will be a JSON object containing the exchange rates:

```json
{
  "EUR": 0.85,
  "GBP": 0.75,
  "JPY": 110.50
}
```

## Latest Rates

The latest exchange rates can be accessed using the following URL format:

```bash
https://cdn.jsdelivr.net/gh/Sungorus/rates-api@2/data/USD/latest.json
```

### Example Requests for Latest Rates

To get the latest exchange rates:

```bash
curl https://cdn.jsdelivr.net/gh/Sungorus/rates-api@2/data/USD/latest.json
```

### Response Example for Latest Rates

The response for the latest rates will be structured similarly:

```json
{
  "EUR": 0.85,
  "GBP": 0.75,
  "JPY": 110.50
}
```

## Note

- Ensure the directory structure is properly set up on your server or local environment to access the files correctly.
- Regularly run the script to update exchange rates as needed.
