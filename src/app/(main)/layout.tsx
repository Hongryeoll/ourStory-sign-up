import ModalRenderer from "@/components/sign-up/ModalRenderer";

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <ModalRenderer>{modal}</ModalRenderer>
    </>
  );
}
