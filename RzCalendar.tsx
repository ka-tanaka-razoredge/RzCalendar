import * as React from 'react';
import 'flatpickr/dist/flatpickr.min.css';
import Flatpickr from 'react-flatpickr';
import { Japanese } from 'flatpickr/dist/l10n/ja.js';

import { useFormContext } from 'react-hook-form';
import flatpickr from 'flatpickr';
flatpickr.localize(Japanese);

interface RzCalendarProps {
  name: string;
}

export default React.forwardRef((props: RzCalendarProps, ref) => {
  const { register } = useFormContext();
  const proxy = React.useRef<HTMLInputElement>(null);
  const picker = React.useRef<Flatpickr>(null);
  const [isShowing, setIsShowing] = React.useState(false);

  const formatDate = (date, format) => {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
  };

  const inquire2Decades = () => {
    let memento = new Date();
    memento.setFullYear(memento.getFullYear() - 20);
    return formatDate(memento, 'yyyy/MM/dd');
  };

  const [value, setValue] = React.useState(inquire2Decades());

  const toDateString = (source, delimiter) => {
    const memento = source.split(delimiter);
    const year = memento[0];
    const month = ('00' + memento[1]).slice(-2);
    const day = ('00' + memento[2]).slice(-2);
    return `${year}-${month}-${day}T00:00:00.000Z`;
  };

  React.useEffect(() => {
    picker.current.flatpickr.setDate(new Date(toDateString(value, '/')));
  }, [value]);

  return (
    <div>
      <div
        onClick={(e) => {
          console.log(proxy);
          if (!isShowing) {
            picker.current.flatpickr.open();
            setIsShowing(true);
          } else {
            picker.current.flatpickr.close();
            setIsShowing(false);
          }
        }}
        style={{ position: 'absolute', zIndex: 1000 }}
      >
        <input
          type="text"
          ref={proxy}
          readOnly={isShowing}
          {...register('birthdate')}
          value={value}
          onChange={(e) => {
            console.log(e.target.value);
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
          setValue(formatDate(e[0] as Date, 'yyyy/MM/dd'));
        }}
      />
    </div>
  );
});
