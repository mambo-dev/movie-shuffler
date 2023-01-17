import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import Alert from "./alert";

export default function Modal({ isOpen, setIsOpen, title, children }: any) {
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
      <div className="fixed inset-0 bg-black/90" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-[98%] md:w-[400px] h-[450px] rounded bg-gray-900 flex flex-col gap-y-4 py-4 overflow-y-auto">
            <Dialog.Title className="w-full flex items-center justify-center text-white font-semibold">
              {title}
            </Dialog.Title>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
