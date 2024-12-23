export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="mx-auto w-full flex flex-col h-screen bg-grayscale-50"
    >
      {children}
    </div>
  );
}
