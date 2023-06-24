'use client';

import { FieldConfig, FieldInputProps } from 'formik';

export interface TextFieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label: string;
  error?: string | boolean;
  getFieldProps: <Value = any>(props: string | FieldConfig<Value>) => FieldInputProps<Value>;
}

export default function TextField({ id, label, error, getFieldProps, ...restProps }: TextFieldProps): JSX.Element {
  return (
    <div>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        id={id}
        className={error ? 'input w-full max-w-xs input-error' : 'input w-full max-w-xs'}
        {...getFieldProps(id)}
        {...restProps}
      />
      {error && (
        <label className="label pb-0">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}
