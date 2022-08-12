import { Avatar, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import styles from "../styles/petCard.module.css";
import NextLink from "next/link";

export const PetCard = (props) => {
  const { postId, petName, petAge, petSex, petImage, status, session } = props;
  return (
    <>
      {postId && petAge && petSex && petImage ? (
        <NextLink href={`/post/${postId}`}>
          <Card className={styles.card_container}>
            <CardContent className={styles.card_container}>
              <Avatar
                className={styles.pet_image}
                alt={petName}
                src={petImage}
              ></Avatar>
              <Typography className={styles.title}>{petName}</Typography>
              {session?.role !== "admin" ? (
                <>
                  <Typography className={styles.text} marginBottom={2}>
                    <span className={styles.label}>Edad: </span> {petAge}
                  </Typography>
                  <Typography className={styles.text}>
                    <span className={styles.label}>Sexo: </span> {petSex}
                  </Typography>{" "}
                </>
              ) : (
                ""
              )}
              {session?.role === "admin" ? (
                <Typography className={styles.text}>
                  <span className={styles.label_status}>Estado: </span> {status}
                </Typography>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        </NextLink>
      ) : (
        ""
      )}
    </>
  );
};
