"use client";
import { usePathname } from "next/navigation";

export default function ModalRenderer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showModal = pathname.includes("/sign-up");
  return showModal ? <>{children}</> : null;
}
