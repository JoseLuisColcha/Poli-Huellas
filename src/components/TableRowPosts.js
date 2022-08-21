import React, { useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { Visibility, Delete, Edit } from "@mui/icons-material";
import DeletePostModal from "@/components/Modals/DeletePostModal";
import { convertDate } from "@/lib/dates";
import { useAlert } from "@/lib/alert";
import { useForm } from "react-hook-form";
import EditPostModal from "@/components/Modals/EditPostModal";
import { useRouter } from "next/router";
import { updatePostInformation } from "@/lib/posts";

export default function TableRowPosts(props) {
  const { post } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openEdition, setOpenEdition] = useState(false);
  const { addAlert } = useAlert();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleOpenEditModal = () => {
    setOpenEdition(true);
    reset({
      petName: post.petName,
      petSize: post.petSize,
      petAge: post.petAge,
      petSex: post.petSex,
      description: post.description,
    });
  };
  const onSubmit = async (data) => {
    const { petName, petSize, petAge, petSex, description } = data;
    console.log(data);
    try {
      await updatePostInformation(
        post.id,
        petName,
        petSex,
        petSize,
        petAge,
        description
      );
      addAlert({
        text: "Publicación actualizada exitosamente",
        severity: "success",
        duration: 3000,
      });
      setOpenEdition(false);
    } catch (error) {
      addAlert({
        text: "Error al actualizar la publicación",
        severity: "error",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <TableRow
        key={post.petName}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {post.petName}
        </TableCell>
        <TableCell align="center" component="th" scope="row" X>
          {post.petSex}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {post.petSize}
        </TableCell>
        <TableCell align="center">{convertDate(post.createdAt)}</TableCell>
        <TableCell align="center">
          {post.status === "ACCEPTED"
            ? "ACEPTADA"
            : post.status === "REJECTED"
            ? "RECHAZADA"
            : "CREADA"}
        </TableCell>
        <TableCell sx={{ display: "flex", justifyContent: "space-around" }}>
          <Visibility
            sx={{ cursor: "pointer" }}
            color="primary"
            titleAccess="Ver otro"
            onClick={() => router.push(`/post/${post.id}`)}
          />
          <Edit
            sx={{ cursor: "pointer" }}
            color="primary"
            titleAccess="Editar"
            onClick={handleOpenEditModal}
          />
          <Delete
            sx={{ cursor: "pointer" }}
            color="error"
            titleAccess="Eliminar"
            onClick={handleOpenModal}
          />
          <EditPostModal
            openEdition={openEdition}
            handleCloseEdition={() => setOpenEdition(false)}
            postPhoto={post.image}
            postId={post.id}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
          />
          <DeletePostModal
            open={open}
            handleClose={() => setOpen(false)}
            postId={post.id}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
