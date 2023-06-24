export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="card w-2/3 bg-base-300 shadow-xl min-w-fit max-w-xl">{children}</div>;
}