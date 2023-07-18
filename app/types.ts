import { Dispatch, SetStateAction } from "react";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FormSchema } from "./form/schema";

export type Currency = "PLN" | "EUR" | "GBP" | "UAH";

export type ApiResponse = {
  from: string;
  to: string;
  rate: number;
  fromAmount: number;
  toAmount: number;
};

export interface FormAutoupdateProps {
  rate: number;
  setRate: Dispatch<SetStateAction<number>>;
  register: UseFormRegister<FormSchema>;
  getValues: UseFormGetValues<FormSchema>;
  setValue: UseFormSetValue<FormSchema>;
  handleSubmit: UseFormHandleSubmit<FormSchema>;
  errors: FieldErrors<FormSchema>;
}

export interface FormProps extends FormAutoupdateProps {
  toggleMode: () => void;
}
