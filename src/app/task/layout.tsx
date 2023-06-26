export default function ListLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full sm:w-2/3 max-w-xl px-8 mt-32">
          <h1 className="text-4xl font-bold">Your Todos</h1>
          <div className="flex flex-col mt-6 gap-3">{children}</div>
        </div>
      </div>
      {modal}
    </>
  );
}
