export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col relative w-full h-full bg-grayscale-50">
      {children}
    </div>
  );
}
