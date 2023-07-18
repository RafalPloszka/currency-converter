# Currency converter

## Brief description

This simple app is a recruitment task for Front-End Engineer position in TransferGo. 

## Acceptance critera
* Uses TransferGo API for FX rates (details below).
* Allows user to select initial FROM currency, TO currency and AMOUNT to convert (defaults to EUR -> GBP with amount 1.00 EUR).
* Mocked supported currency pairs. I.e. 2 lists for FROM, TO (supported currencies: PLN, EUR, GBP, UAH).
* Has a button for initial conversion.
* After conversion, AMOUNT and CONVERTED TO should be updated and conversion rate should be displayed at the bottom.
* After initial conversion using the button, the following conversions should be automatic when any of the values change.
* If the user updates CONVERTED TO input the AMOUNT value should be updated accordingly.
* All values should be updated via a new API call to get the most recent conversion rates.

## Endpoint

FX rates endpoint: GET https://my.transfergo.com/api/fx-rates with following parameters:
* from (3-lettered currency),
* to (3-lettered currency),
* amount (float number).
* Limits to be used for ‘sending currency’ (20000PLN, 5000EUR, 1000GBP, 50000UAH). No limits for the ‘receiving currency’.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
