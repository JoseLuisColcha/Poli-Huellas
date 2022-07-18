import { Avatar, Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import styles from '../styles/PetCard.module.css';

export const PetCard = (props) => {
    const { postId, petName, petAge, petSex, petImage } = props;
  return (
    <>
    {postId && petAge && petSex && petImage ?
    <Card className={styles.card_container}>
        <CardContent className={styles.card_container}>
            <Avatar
                className={styles.pet_image}
                alt={petName}
                src={petImage}
            >
            </Avatar>
            <Typography className={styles.title}>{petName}</Typography>
            <Typography className={styles.text}><span className={styles.label}>Edad: </span> {petAge}</Typography>
            <br></br>
            <Typography className={styles.text}><span className={styles.label}>Sexo: </span> {petSex}</Typography>
        </CardContent>
    </Card>
    : ""}
    </>
  )
}
