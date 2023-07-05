export const metadata = {
  title: "Home",
};
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <body lang="en">{children}</body>;
}
