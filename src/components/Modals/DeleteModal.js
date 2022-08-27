import { Box, Modal, Typography, Button } from "@mui/material";
import React from "react";
import styles from "../../styles/deletePost.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "442px",
  bgcolor: "background.paper",
  border: "1px solid #000056",
  borderRadius: "20px",
  paddingX: "2rem",
  paddingY: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "#FAF1FF",
};

const DeleteModal = ({ open, handleClose, handleDelete }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography className={styles.text}>
          <span className={styles.label}>¿Está seguro que desea</span>{" "}
          {`eliminar ?`}
        </Typography>
        <Box>
          <Button
            className={styles.cancel_button}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            className={styles.submit_button}
            onClick={handleDelete}
          >
            Aceptar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
