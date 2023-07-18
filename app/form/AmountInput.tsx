import { UseFormRegister } from "react-hook-form";
import { Currency } from "../types";
import { FormSchema } from "./schema";

interface Props {
  type: "fromAmount" | "toAmount";
  currency: Currency;
  register: UseFormRegister<FormSchema>;
  submit: () => void;
  shouldAutoUpdate?: boolean;
}

export default function AmountInput({
  type,
  currency,
  register,
  submit,
  shouldAutoUpdate,
}: Props) {
  const label = type === "fromAmount" ? "AMOUNT:" : "CONVERTED TO:";
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    register(type).onChange(event);
    if (shouldAutoUpdate) {
      submit();
    }
  };
  return (
    <div className="relative p-4 w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type="number"
        step="0.01"
        min={0}
        lang="en"
        {...register(type)}
        onChange={(event) => onChange(event)}
        className="bg-gray-50 border-bottom border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <span className="absolute right-6 bottom-6 text-gray-400 bg-gray-50">
        {currency}
      </span>
    </div>
  );
}
