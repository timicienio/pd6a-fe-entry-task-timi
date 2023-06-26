export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col px-6 flex-grow items-center justify-center">
      <div className="card w-full sm:w-2/3 bg-base-300 shadow-xl min-w-fit max-w-xl">{children}</div>
    </div>
  );
}
