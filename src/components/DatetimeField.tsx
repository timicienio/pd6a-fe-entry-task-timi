import { useField, FieldHookConfig } from 'formik';
import { useState, useEffect, FocusEvent } from 'react';
import moment from 'moment';
import { ISODateString } from 'next-auth';

interface DatetimeFieldProps {
  name: string;
  label: string;
}

const dateFormatExamples = [
  '9 27 2021',
  '09272021',
  '092721',
  'sep 27 2021',
  'Sep 27 2021',
  'SEP 27 2021',
  'sep 27, 2021',
  'Sep 27, 2021',
  'SEP 27, 2021'
];
const timeFormatExamples = ['9:10', '13:15', '1530', '150', '930', '900'];

export default function DatetimeField({ name, label }: DatetimeFieldProps) {
  const [field, meta, helpers] = useField<ISODateString>(name);

  const { value } = field;
  const { error, touched } = meta;
  const { setValue } = helpers;

  const [dateText, setDateText] = useState('');
  const [timeText, setTimeText] = useState('');

  useEffect(() => {
    if (moment(value).isValid()) {
      setDateText(moment(value).format('MMM DD, YYYY'));
      setTimeText(moment(value).format('HH:mm'));
    }
  }, [value]);

  const handleDateBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const parsed = moment(e.target.value, ['MMM D, YYYY', 'M D YYYY', 'M D YY', 'MMDDYYYY', 'MMDDYY']);

    if (parsed.isValid()) {
      setValue(
        moment(value)
          .set({ month: parsed.get('month'), date: parsed.get('date'), year: parsed.get('year') })
          .toISOString()
      );
    } else {
      // Reset time text to original value.
      if (moment(value).isValid()) {
        setDateText(moment(value).format('MMM DD, YYYY'));
      } else {
        setDateText('');
      }
    }
  };

  const handleTimeBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const parsed = moment(e.target.value, ['HHmm', 'HH:mm', 'Hmm', 'H:mm']);

    if (parsed.isValid()) {
      setValue(
        moment(value)
          .set({ hour: parsed.get('hour'), minute: parsed.get('minute') })
          .toISOString()
      );
    } else {
      // Reset time text to original value.
      if (moment(value).isValid()) {
        setTimeText(moment(value).format('HH:mm'));
      } else {
        setTimeText('');
      }
    }
  };

  const [timePlaceHolderIndex, setTimePlaceHolderIndex] = useState(0);
  const [datePlaceHolderIndex, setDatePlaceHolderIndex] = useState(0);

  // suggestion on input formats
  useEffect(() => {
    const interval = setInterval(() => {
      setTimePlaceHolderIndex(prev => (prev + 1) % timeFormatExamples.length);
      setDatePlaceHolderIndex(prev => (prev + 1) % dateFormatExamples.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="join w-full block max-w-xs">
        <input
          id={`${name}-date`}
          className="input join-item w-2/3"
          placeholder={dateFormatExamples[datePlaceHolderIndex]}
          value={dateText}
          onBlur={handleDateBlur}
          onChange={e => setDateText(e.target.value)}
          onFocus={e => e.target.select()}
        />
        <input
          id={`${name}-time`}
          className="input join-item w-1/3"
          placeholder={timeFormatExamples[timePlaceHolderIndex]}
          value={timeText}
          onBlur={handleTimeBlur}
          onChange={e => setTimeText(e.target.value)}
          onFocus={e => e.target.select()}
        />
      </div>
      {error && touched && (
        <label className="label pb-0">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}
