import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import styles from '../../styles/PostDetails.module.css';

function PostInformation(props) {
    const {petName, petSex, petAge, petSize, description} = props;
  return (
    <>
     <Card>
        <CardContent>
            <Typography className={styles.textHead} sx={{color:"#484848"}}>Hola mi nombre es</Typography>
            <Typography className={`${styles.textHead} ${styles.label}`}>{petName}</Typography>
            <Typography className={styles.text} sx={{color:"#484848"}}><span className={styles.label}>Sexo: </span> {petSex}</Typography>
            <Typography className={styles.text} sx={{color:"#484848"}}><span className={styles.label}>Edad: </span> {petAge}</Typography>
            <Typography className={styles.text} sx={{color:"#484848"}}><span className={styles.label}>Tamaño: </span> {petSize}</Typography>
            <Typography className={[styles.text,styles.label]}>Descripción: </Typography>
            <Typography className={styles.text} sx={{color:"#484848"}}>{description}</Typography>
            <p align="right"><Button className={styles.button}>Contactar</Button></p>
        </CardContent>
     </Card>
    </>
  )
}

export default PostInformation