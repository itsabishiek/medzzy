import { Dialog, IconButton } from "@mui/material";
import React, { useState } from "react";
import EditPatientTabs from "../../components/tabs/editPatientTabs/EditPatientTabs";

type EditModalProps = {
  children: React.ReactNode;
};

const EditModal: React.FC<EditModalProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          handleClickOpen();
        }}
        sx={{ marginTop: 1.5, border: "1px solid var(--accent-color)" }}
      >
        {children}
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            maxWidth: "700px",
            width: "100%",
          },
        }}
      >
        <EditPatientTabs handleClose={handleClose} />
      </Dialog>
    </>
  );
};
export default EditModal;
