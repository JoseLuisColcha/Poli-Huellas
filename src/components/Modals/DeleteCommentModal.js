import { deleteComment } from "@/lib/posts";
import React from "react";
import { useAlert } from "../../lib/alert";
import DeleteModal from "./DeleteModal";

const DeleteCommentModal = ({ open, handleClose, commentId }) => {
  const { addAlert } = useAlert();

  const handleDeleteComment = () => {
    try {
      deleteComment(commentId);
      addAlert({
        text: "Comentario eliminado exitosamente",
        severity: "success",
        duration: 3000,
      });
    } catch (e) {
      addAlert({
        text: "Error al eliminar comentario",
        severity: "error",
        duration: 3000,
      });
    }
    handleClose();
  };

  return (
    <DeleteModal
      open={open}
      handleClose={handleClose}
      handleDelete={handleDeleteComment}
    />
  );
};

export default DeleteCommentModal;
