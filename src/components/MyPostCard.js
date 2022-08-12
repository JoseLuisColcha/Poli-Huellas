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
import React from "react";
import styles from "../styles/myPosts.module.css";

export const MyPostCard = (props) => {
  const { post, session, userId } = props;
  const router = useRouter();

  const convertDate = (date) => {
    let convertDate = date?.toDate();
    let newDate = `${convertDate?.getDate()} / ${
      convertDate?.getUTCMonth() + 1
    } / ${convertDate?.getUTCFullYear()}`;
    return newDate;
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
                    <IconButton aria-label="Eliminar" className={styles.icons}>
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
      </Card>
    </div>
  );
};
