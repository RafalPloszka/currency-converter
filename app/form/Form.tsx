import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";

import CurrencySelect from "./CurrencySelect";
import AmountInput from "./AmountInput";
import { FormSchema } from "./schema";
import { ApiResponse, FormProps } from "../types";
import { fetchFxRates } from "./utils";

export default function Form({
  toggleMode,
  setRate,
  register,
  getValues,
  setValue,
  handleSubmit,
  errors,
}: FormProps) {
  const onSubmit: SubmitHandler<FormSchema> = useCallback(async (data) => {
    const callbackFunc = (response: ApiResponse) => {
      setRate(response.rate);
      setValue("toAmount", response.toAmount);
      toggleMode();
    };
    fetchFxRates(data, callbackFunc);
  }, []);

  const swapCurrencies = useCallback(() => {
    const to = getValues("to");
    const from = getValues("from");
    setValue("from", to);
    setValue("to", from);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 min-w">
      <div className="flex items-center">
        <CurrencySelect
          type="from"
          register={register}
          update={handleSubmit(onSubmit)}
        />
        <span className="cursor-pointer" onClick={swapCurrencies}>
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
          update={handleSubmit(onSubmit)}
        />
      </div>

      <div className="flex items-center">
        <AmountInput
          type="fromAmount"
          currency={getValues("from")}
          register={register}
          submit={handleSubmit(onSubmit)}
        />
      </div>

      <button
        type="submit"
        className="w-full focus:outline-none text-white bg-green-400 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 mt-6 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Convert
      </button>

      {errors.fromAmount && (
        <span className="text-red-700">{errors.fromAmount.message}</span>
      )}
    </form>
  );
}
