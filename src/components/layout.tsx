import NavBar from "./navBar";

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
