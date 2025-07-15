import { type ReactNode } from "react";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";

type SharedModalWrapperProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const SharedModalWrapper = ({
  open,
  onClose,
  children,
}: SharedModalWrapperProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: 350,
          maxWidth: "90vw",
          borderRadius: "md",
          p: 4,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        {children}
      </Sheet>
    </Modal>
  );
};

export default SharedModalWrapper;
