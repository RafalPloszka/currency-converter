import { UseFormRegister } from "react-hook-form";
import { FormSchema } from "./schema";

interface Props {
  type: "from" | "to";
  register: UseFormRegister<FormSchema>;
  update: () => void;
  shouldAutoUpdate?: boolean;
}

export default function CurrencySelect({
  type,
  register,
  update,
  shouldAutoUpdate,
}: Props) {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    register(type).onChange(event);
    if (shouldAutoUpdate) {
      update();
    }
  };

  return (
    <div className="p-4 w-80">
      <label htmlFor="currency-select" className="uppercase">
        {type}:
      </label>
      <select
        id="currency-select"
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        {...register(type)}
        onChange={(event) => onChange(event)}
      >
        <option value="PLN">PLN</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="UAH">UAH</option>
      </select>
    </div>
  );
}
