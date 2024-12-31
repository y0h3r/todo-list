import { object, number, InferType } from 'yup';

export const envSchema = object({
  PORT: number().required('PORT is required'),
});

export type ConfigSchema = InferType<typeof envSchema>;
