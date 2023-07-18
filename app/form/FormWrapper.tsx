"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormSchema, formSchema } from "./schema";
import FormAutoupdate from "./FormAutoupdate";
import Form from "./Form";

export default function FormWrapper() {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      from: "EUR",
      to: "GBP",
      fromAmount: 1.0,
    },
    resolver: zodResolver(formSchema),
  });
  const [rate, setRate] = useState(1);
  const [autoupdateMode, setAutoupdateMode] = useState(false);

  if (autoupdateMode) {
    return (
      <FormAutoupdate
        rate={rate}
        setRate={setRate}
        register={register}
        getValues={getValues}
        setValue={setValue}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    );
  }

  return (
    <Form
      toggleMode={() => setAutoupdateMode(true)}
      rate={rate}
      setRate={setRate}
      register={register}
      getValues={getValues}
      setValue={setValue}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
}
