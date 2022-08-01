import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/PostDetails.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAuth } from "@/lib/auth";
import { isPostOwner } from "@/lib/posts";

function PostInformation({
  id,
  petName,
  petSex,
  petAge,
  petSize,
  description,
  adoptionRequests,
}) {
  const router = useRouter();
  const { session } = useAuth();
  const [isUserPostOwner, setIsUserPostOwner] = useState(false);
  const hasUserSentRequest = adoptionRequests.some(request => request.user.uid === session?.uid);

  useEffect(() => {
    const checkIsUserPostOwner = async () => {
      const isOwner = await isPostOwner({ userId: session?.uid, postId: id });
      setIsUserPostOwner(isOwner);
    }
    session && checkIsUserPostOwner();
  }, [session]);

  return (
    <>
      <Card>
        <CardContent>
          <Typography className={styles.textHead} sx={{ color: "#484848" }}>
            Hola mi nombre es
          </Typography>
          <Typography className={`${styles.textHead} ${styles.label}`}>
            {petName}
          </Typography>
          <Typography className={styles.text} sx={{ color: "#484848" }}>
            <span className={styles.label}>Sexo: </span> {petSex}
          </Typography>
          <Typography className={styles.text} sx={{ color: "#484848" }}>
            <span className={styles.label}>Edad: </span> {petAge}
          </Typography>
          <Typography className={styles.text} sx={{ color: "#484848" }}>
            <span className={styles.label}>Tamaño: </span> {petSize}
          </Typography>
          <Typography className={[styles.text, styles.label]}>
            Descripción:{" "}
          </Typography>
          <Typography className={styles.text} sx={{ color: "#484848" }}>
            {description}
          </Typography>
          {
            !isUserPostOwner && session && (
              <p align="right">
                <Button
                  className={styles.button}
                  onClick={() => router.push(`${id}/solicitar-adopcion`)}
                  disabled={hasUserSentRequest}
                >
                  {hasUserSentRequest ? "Solicitud enviada" : "Solicitar adopción"}
                </Button>
              </p>
            )
          }
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Solicitudes de adopción</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
                adoptionRequests && adoptionRequests.map((adoptionRequest, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                  >
                    <ListItemButton disabled={!isUserPostOwner} onClick={() => router.push(`${id}/solicitar-adopcion?userId=${adoptionRequest.user.uid}`)}>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°`}
                          src={adoptionRequest.user?.photoURL}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={adoptionRequest.user?.displayName} />
                    </ListItemButton>
                  </ListItem>
                ))
              }
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
}

export default PostInformation;
