import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "../styles/petCard.module.css";
import NextLink from "next/link";

export const PetCard = (props) => {
  const { postId, petName, petAge, petSex, petImage } = props;
  return (
    <>
      {postId && petAge && petSex && petImage ? (
        <CardActionArea className={styles.card_container}>
          <NextLink href={`/post/${postId}`}>
            <Card>
              <CardContent className={styles.card_container}>
                <Avatar
                  className={styles.pet_image}
                  alt={petName}
                  src={petImage}
                ></Avatar>
                <Typography className={styles.text_content} marginY={2}>
                  <span className={styles.label}>Edad: </span> {petAge}
                </Typography>
                <Typography className={styles.text_content}>
                  <span className={styles.label}>Sexo: </span> {petSex}
                </Typography>
              </CardContent>
            </Card>
          </NextLink>
        </CardActionArea>
      ) : (
        ""
      )}
    </>
  );
};
