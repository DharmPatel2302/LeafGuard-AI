export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page flex-grow flex flex-col">{children}</div>;
}
