import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import Alert from "./alert";

export default function Modal({
  isOpen,
  setIsOpen,
  title,
  children,
  addShow,
}: any) {
  const router = useRouter();
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);

        router.reload();
      }}
      className="relative z-40"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-40"
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <Dialog.Panel className="h-fit  w-fit">{children}</Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
