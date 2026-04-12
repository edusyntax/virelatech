// LeadModalContext.tsx
import { createContext, useContext, useState } from "react";
import LeadCaptureModal from "@/components/LeadCaptureModal";

interface ModalContextType {
  openModal: (meta?: { sourcePage?: string; sourceLabel?: string }) => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<ModalContextType | null>(null);

export const useLeadModal = () => {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used inside provider");
  return ctx;
};

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [meta, setMeta] = useState({
    sourcePage: "",
    sourceLabel: ""
  });

  const openModal = (data?: typeof meta) => {
    setMeta({
      sourcePage: data?.sourcePage || "",
      sourceLabel: data?.sourceLabel || ""
    });
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  return (
    <LeadModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/*  SINGLE GLOBAL MODAL */}
      <LeadCaptureModal
        open={open}
        onClose={closeModal}
        sourcePage={meta.sourcePage}
        sourceLabel={meta.sourceLabel}
      />
    </LeadModalContext.Provider>
  );
}