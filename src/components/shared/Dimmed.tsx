function Dimmed({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-transparent-black-70 z-[var(--dimmed-zindex)]">
      {children}
    </div>
  );
}

export default Dimmed;
