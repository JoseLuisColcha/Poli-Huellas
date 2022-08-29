import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/adoptionRequest.module.css";

const RejectedRequestModal = (props) => {
  const { openRejectedModal, userDataProfile, postId } = props;
  const [open, setOpen] = useState(openRejectedModal);
  const { push } = useRouter();

  const handleClose = async () => {
    setOpen(false);
    push(`/post/${postId}`);
  };
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Negación de mascota en adopción"}
        </DialogTitle>
        <DialogContent className={styles.dialog_container}>
          <Image
            src="/images/huella.webp"
            alt="fingerprint"
            width="154.24px"
            height="60px"
            background="#B224EF"
            transform="rotate(-34.58deg)"
          />
          <DialogContentText
            id="alert-dialog-description"
            className={styles.dialog_text}
          >
            Has denegado a ${userDataProfile?.displayName} como adoptante, se lo
            haremos saber.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className={styles.submit_button}
            autoFocus
            onClick={handleClose}
          >
            OK!
          </Button>
        </DialogActions>
      </Dialog>
      ;
    </>
  );
};

export default RejectedRequestModal;
