export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full flex flex-col h-screen pt-[97px]">
      {children}
    </div>
  );
}
