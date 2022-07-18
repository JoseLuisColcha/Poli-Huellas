import { DeleteOutlined, ModeEditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import React from 'react'
import styles from '../styles/MyPosts.module.css';

export const MyPostCard = (props) => {
    const {post} = props;

    const convertDate = (date) => {
        let convertDate = date?.toDate();
        let newDate = `${convertDate?.getDate()} / ${
          convertDate?.getUTCMonth() + 1
        } / ${convertDate?.getUTCFullYear()}`;
        return newDate;
    }
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
                    >
                    </Avatar>
                }
                title={
                    <Typography className={styles.name}>{post.petName}</Typography>
                }
                subheader={`Publicado el ${convertDate(post.createdAt)}`}
                action={
                    <>
                    <IconButton aria-label="Ver" className={styles.icons}>
                        <VisibilityOutlined/>
                    </IconButton>
                    <IconButton aria-label="Editar" className={styles.icons}>
                        <ModeEditOutlined/>
                    </IconButton>
                    <IconButton aria-label="Eliminar" className={styles.icons}>
                        <DeleteOutlined/>
                    </IconButton>
                    </>
                }
            />
        </CardContent>
    </Card>
    </div>
  )
}
