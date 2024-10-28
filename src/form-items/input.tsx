import { twMerge } from 'tailwind-merge';

type InputProps = React.ComponentPropsWithoutRef<'input'>;

export function Input({ className, ...rest }: InputProps) {
  return (
    <input className={twMerge('is-dark', className)} {...rest} />
  );
}
