import { deletePost } from '@/lib/posts';
import { Box, Modal, Typography, Button } from '@mui/material'
import React from 'react';
import styles from "../../styles/deletePost.module.css";
import { useAlert } from "../../../src/lib/alert";

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
  backgroundColor: "#FAF1FF"
};

const DeletePostModal = ({open, handleClose, postId}) => {
  const { addAlert } = useAlert();

  const handleDeletePost = () => {
    try{
      deletePost(postId);
      addAlert({
        text: "Publicación eliminada exitosamente",
        severity: "success",
        duration: 3000,
      });
    }
    catch(e){
      addAlert({
        text: "Error al eliminar la publicación",
        severity: "error",
        duration: 3000,
      });
    }
    handleClose();
  }

  return (
    <Modal
    open={open}
    onClose={handleClose}>
        <Box sx={style}>
          <Typography className={styles.text}>
            <span className={styles.label}>¿Está seguro que desea</span> {`eliminar ?`}
          </Typography>
          <Box>
            <Button className={styles.cancel_button} onClick={handleClose}>
              Cancelar
            </Button>
            <Button className={styles.submit_button} onClick={handleDeletePost}>
              Aceptar
            </Button>
          </Box>
        </Box>
    </Modal>
  )
}

export default DeletePostModal