import {
  DeleteOutlined,
  ModeEditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  Container,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/myPosts.module.css";
import DeletePostModal from "./Modals/DeletePostModal";
import EditPostModal from "./Modals/EditPostModal";
import { useForm } from "react-hook-form";
import { updatePostInformation } from "@/lib/posts";
import { useAlert } from "../../src/lib/alert";
import { convertDate } from "@/lib/dates";

export const MyPostCard = (props) => {
  const { post, session, userId } = props;
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
    <div className={styles.container}>
      <Card>
        <CardContent>
          <CardHeader
            avatar={
              <Avatar
                className={styles.pet_image}
                alt={post.petName}
                src={post.image}
              ></Avatar>
            }
            title={
              <Typography className={styles.name}>{post.petName}</Typography>
            }
            subheader={`Publicado el ${convertDate(post.createdAt)}`}
            action={
              <>
                {userId === session?.uid ? (
                  <Container>
                    <IconButton
                      aria-label="Ver"
                      className={styles.icons}
                      onClick={() => router.push(`/post/${post.id}`)}
                    >
                      <VisibilityOutlined titleAccess="Ver otro" />
                    </IconButton>
                    <IconButton
                      aria-label="Editar"
                      className={styles.icons}
                      onClick={handleOpenEditModal}
                    >
                      <ModeEditOutlined titleAccess="Editar" />
                    </IconButton>
                    <IconButton
                      aria-label="Eliminar"
                      className={styles.icons}
                      onClick={handleOpenModal}
                    >
                      <DeleteOutlined titleAccess="Eliminar" />
                    </IconButton>
                  </Container>
                ) : (
                  ""
                )}
              </>
            }
          />
        </CardContent>
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
      </Card>
    </div>
  );
};
