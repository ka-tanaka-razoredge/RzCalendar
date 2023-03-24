import * as React from 'react';
import RzCalendar from './RzCalendar';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './style.css';

import useDate from './utilities/useDate';

const schema = z.object({
  birthdate: z
    .string()
    .min(1, { message: 'required' })
    .refine((v) => {
      return !(v === '2023/02/29');
    }, 'invalid date')
    .refine((v) => {
      console.log('---- begin ----');
      console.log(v);
      const stringToDate = useDate().toDateString(v, '/');
      console.log(new Date(stringToDate).getTime());
      console.log('---- end ----');
      return !isNaN(new Date(v).getTime());
    }, 'wrong'),
});

type Schema = z.infer<typeof schema>;

export default function App() {
  const useFormMethods = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const {
    formState: { errors },
    setValue,
    handleSubmit,
  } = useFormMethods;

  return (
    <div>
      <form
        onSubmit={handleSubmit((d) => {
          console.log(d);
        })}
      >
        <FormProvider {...useFormMethods}>
          <RzCalendar name="birthdate" />
        </FormProvider>
        <p>{errors.birthdate?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
}
