import { z } from "zod";

const currencyEnum = z.enum(["PLN", "EUR", "GBP", "UAH"]);

const amountSchema = z.coerce
  .number({ required_error: "Amount is required" })
  .positive({ message: "Amount has to be larger than 0" });

const plnSchema = z.object({
  from: z.literal(currencyEnum.enum.PLN),
  to: currencyEnum,
  fromAmount: amountSchema.lte(20000, {
    message: "Amount cannot be larger than 20000 PLN",
  }),
  toAmount: z.coerce.number().optional(),
});

const eurSchema = z.object({
  from: z.literal(currencyEnum.enum.EUR),
  to: currencyEnum,
  fromAmount: amountSchema.lte(5000, {
    message: "Amount cannot be larger than 5000€",
  }),
  toAmount: z.coerce.number().optional(),
});

const gbpSchema = z.object({
  from: z.literal(currencyEnum.enum.GBP),
  to: currencyEnum,
  fromAmount: amountSchema.lte(1000, {
    message: "Amount cannot be larger than £1000",
  }),
  toAmount: z.coerce.number().optional(),
});

const uahSchema = z.object({
  from: z.literal(currencyEnum.enum.UAH),
  to: currencyEnum,
  fromAmount: amountSchema.lte(50000, {
    message: "Amount cannot be larger than 50000 UAH",
  }),
  toAmount: z.coerce.number().optional(),
});

export const formSchema = z.discriminatedUnion("from", [
  plnSchema,
  eurSchema,
  gbpSchema,
  uahSchema,
]);

export type FormSchema = z.infer<typeof formSchema>;
