import { Currency, ApiResponse } from "../types";

type Params = {
  from: Currency;
  to: Currency;
  fromAmount: number;
};

export const fetchFxRates = async (
  { from, to, fromAmount }: Params,
  callbackFunc: (args: ApiResponse) => void
) => {
  try {
    const response = await fetch(
      `https://my.transfergo.com/api/fx-rates?from=${from}&to=${to}&amount=${fromAmount}`
    );
    const formattedResponse: ApiResponse = await response.json();
    if (response.status === 200) {
      callbackFunc(formattedResponse);
    }
  } catch (error) {
    // TODO: handle it in more elegant way
    console.log(error);
  }
};
