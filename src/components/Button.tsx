'use client';

type ButtonColor = 'default' | 'neutral' | 'primary' | 'secondary';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: ButtonColor;
  loading?: boolean;
}

const mapButtonColorToClassName = (color: ButtonColor): string => {
  switch (color) {
    case 'neutral':
      return 'btn-neutral';
    case 'primary':
      return 'btn-primary';
    case 'secondary':
      return 'btn-secondary';
    default:
      return '';
  }
};

export default function Button({
  color = 'default',
  loading = false,
  disabled,
  className,
  children,
  ...restProps
}: ButtonProps): JSX.Element {
  return (
    <button
      type="submit"
      className={`btn ${mapButtonColorToClassName(color)} ${disabled ? 'btn-disabled' : ''} ${className}`}
      disabled={disabled}
      {...restProps}
    >
      {loading ? <span className="loading loading-spinner" /> : children}
    </button>
  );
}
