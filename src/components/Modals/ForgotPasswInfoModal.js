const {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} = require("@mui/material");
import styles from "../../styles/forgotPasswModal.module.css";
import Routes from "src/constants/routes";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswInfoModal({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Enlace de restablecimiento de contraseña"}
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
          Se ha enviado un email con las instrucciones para restablecer la
          contraseña.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link href={Routes.LOGIN} passHref>
          <Button
            variant="contained"
            className={styles.submit_button}
            autoFocusonClick={handleClose}
          >
            OK!
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
}
