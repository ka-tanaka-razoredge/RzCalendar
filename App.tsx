import * as React from 'react';
import RzCalendar from './RzCalendar';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './style.css';

const schema = z.object({
  birthdate: z.string().refine(() => {
    console.log('---- begin ----');
    console.log(z);
    console.log('---- end ----');
    return false;
  }, 'wrong'),
});

type Schema = z.infer<typeof schema>;

export default function App() {
  /*  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
*/
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
