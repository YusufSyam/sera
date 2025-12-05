export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#001029] h-screen py-10">{children}</div>; // tidak ada sidebar di sini
}
