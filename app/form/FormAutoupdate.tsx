import { useCallback, useMemo } from "react";
import { SubmitHandler } from "react-hook-form";
import debounce from "lodash.debounce";

import CurrencySelect from "./CurrencySelect";
import AmountInput from "./AmountInput";
import { FormSchema } from "./schema";
import { ApiResponse, Currency, FormAutoupdateProps } from "../types";
import { fetchFxRates } from "./utils";

export default function FormAutoupdate({
  rate,
  setRate,
  register,
  getValues,
  setValue,
  handleSubmit,
  errors,
}: FormAutoupdateProps) {
  const convert: SubmitHandler<FormSchema> = useCallback(async (data) => {
    const callbackFunc = (response: ApiResponse) => {
      setRate(response.rate);
      setValue("toAmount", response.toAmount);
    };
    fetchFxRates(data, callbackFunc);
  }, []);

  const debouncedConvert = useMemo(() => {
    return debounce(convert, 500);
  }, [convert]);

  const reverseConvert: SubmitHandler<FormSchema> = useCallback(
    async (data) => {
      if (!data.toAmount) {
        return;
      }
      const params = {
        from: data.to,
        to: data.from,
        fromAmount: data.toAmount,
      };
      const callbackFunc = (response: ApiResponse) => {
        setValue("fromAmount", response.toAmount);
      };
      fetchFxRates(params, callbackFunc);
    },
    []
  );

  const debouncedReverseConvert = useMemo(() => {
    return debounce(reverseConvert, 500);
  }, [reverseConvert]);

  const swapCurrencies: SubmitHandler<FormSchema> = useCallback(
    async (data) => {
      const params = {
        from: data.to,
        to: data.from,
        fromAmount: data.fromAmount,
      };
      const callbackFunc = (response: ApiResponse) => {
        setRate(response.rate);
        setValue("fromAmount", response.fromAmount);
        setValue("toAmount", response.toAmount);
        setValue("from", response.from as Currency);
        setValue("to", response.to as Currency);
      };
      fetchFxRates(params, callbackFunc);
    },
    []
  );

  return (
    <form className="bg-white p-8 min-w">
      <div className="flex items-center">
        <CurrencySelect
          type="from"
          register={register}
          update={handleSubmit(convert)}
          shouldAutoUpdate
        />
        <span className="cursor-pointer" onClick={handleSubmit(swapCurrencies)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z" />
          </svg>
        </span>
        <CurrencySelect
          type="to"
          register={register}
          update={handleSubmit(convert)}
          shouldAutoUpdate
        />
      </div>

      <div className="flex items-center">
        <AmountInput
          type="fromAmount"
          currency={getValues("from")}
          register={register}
          submit={handleSubmit(debouncedConvert)}
          shouldAutoUpdate
        />
        <AmountInput
          type="toAmount"
          currency={getValues("from")}
          register={register}
          submit={handleSubmit(debouncedReverseConvert)}
          shouldAutoUpdate
        />
      </div>

      {errors.fromAmount && (
        <span className="text-red-600 m-2">{errors.fromAmount.message}</span>
      )}

      <div className="flex flex-col m-2 gap-4">
        <p>
          1 {getValues("from")} = {rate} {getValues("to")}
        </p>
        <p className="text-gray-400 text-sm">
          All figures are live mid-market rates, which are for informational
          purposes only.
          <br />
          To see the rates for money transfer, please select sending money
          option
        </p>
      </div>
    </form>
  );
}
