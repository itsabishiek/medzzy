import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";

type DeleteModalProps = {
  children: React.ReactNode;
  loading: boolean;
  handleDelete: (id: string) => void;
  id: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  children,
  loading,
  handleDelete,
  id,
}) => {
  const [open, setOpen] = React.useState(false);

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
        sx={{
          backgroundImage: "var(--bg-gradient-red)",
        }}
      >
        {children}
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Patient Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, want to delete patient details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size="small" sx={{ color: "#eee" }}>
            Cancel
          </Button>
          <Button
            autoFocus
            color="error"
            variant="contained"
            size="small"
            onClick={() => {
              handleDelete(id);
              !loading && handleClose();
            }}
          >
            {loading ? (
              <CircularProgress color="inherit" size={15} />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteModal;
