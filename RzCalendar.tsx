import * as React from 'react';
import 'flatpickr/dist/flatpickr.min.css';
import Flatpickr from 'react-flatpickr';

import { useFormContext } from 'react-hook-form';

interface RzCalendarProps {
  name: string;
}

export default React.forwardRef((props: RzCalendarProps, ref) => {
  const { register } = useFormContext();
  const [value, setValue] = React.useState('');
  let isShowing = false;
  //I WILL DELETE  const proxy = React.useRef<HTMLInputElement | null>(null);
  const picker = React.useRef<Flatpickr>(null);

  return (
    <div>
      <div
        onClick={(e) => {
          if (!isShowing) {
            picker.current.flatpickr.open();
            isShowing = true;
          } else {
            isShowing = false;
          }
        }}
        style={{ position: 'absolute', zIndex: 1000 }}
      >
        <input
          {...register('birthdate')}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <Flatpickr
        ref={picker}
        options={{
          allowInput: true,
        }}
        onChange={(e) => {
          console.log(e);
          setValue((e[0] as Date).toLocaleDateString());
        }}
      />
    </div>
  );
});
