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
import React, {useState} from "react";
import styles from "../styles/myPosts.module.css";
import DeletePostModal from "./Modals/DeletePostModal";

export const MyPostCard = (props) => {
  const { post, session, userId } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const convertDate = (date) => {
    let convertDate = date?.toDate();
    let newDate = `${convertDate?.getDate()} / ${
      convertDate?.getUTCMonth() + 1
    } / ${convertDate?.getUTCFullYear()}`;
    return newDate;
  };

  const handleOpenModal = () => {
    setOpen(true);
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
                      <VisibilityOutlined />
                    </IconButton>
                    <IconButton aria-label="Editar" className={styles.icons}>
                      <ModeEditOutlined />
                    </IconButton>
                    <IconButton aria-label="Eliminar" className={styles.icons} onClick={handleOpenModal}>
                      <DeleteOutlined />
                    </IconButton>
                  </Container>
                ) : (
                  ""
                )}
              </>
            }
          />
        </CardContent>
        <DeletePostModal open={open} handleClose={() => setOpen(false)} postId={post.id}/>
      </Card>
    </div>
  );
};
