import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/PostDetails.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAuth } from "@/lib/auth";
import { useAdoptionRequest } from "@/hooks/useAdoptionRequest";

function PostInformation({
  id,
  petName,
  petSex,
  petAge,
  petSize,
  description,
  postUserId,
  petType,
  setOpenPostForm,
}) {
  const { adoptionRequestsByPostId } = useAdoptionRequest({ postId: id });
  const router = useRouter();
  const { session } = useAuth();
  const isUserPostOwner = session?.uid === postUserId;
  const hasUserSentRequest = adoptionRequestsByPostId?.some(request => request?.user?.uid === session?.uid);

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
            !isUserPostOwner && session?.role === 'user' && (
              <p align="right">
                <Button
                  className={styles.button}
                  onClick={() => router.push(`${id}/solicitar-adopcion?petType=${petType}`)}
                  disabled={hasUserSentRequest}
                >
                  {hasUserSentRequest ? "Solicitud enviada" : "Solicitar adopción"}
                </Button>
              </p>
            )
          }
          {
            !isUserPostOwner && session?.role === 'admin' && (
              <Grid
                container
                sx={{ justifyContent: { xs: "center", md: "flex-end" }, gap: "1rem" }}
              >
                <Button
                  className={styles.button}
                  onClick={() => setOpenPostForm(true)}
                >
                  Ver formulario
                </Button>
              </Grid>
            )
          }
          {
            adoptionRequestsByPostId?.length > 0 ? (
              <Accordion sx={{marginTop: '1rem'}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Solicitudes de adopción</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {
                    adoptionRequestsByPostId.map((adoptionRequest, index) => (
                      <ListItem
                        key={index}
                        disablePadding
                      >
                        <ListItemButton disabled={!isUserPostOwner} onClick={() => router.push(`${id}/solicitar-adopcion?userId=${adoptionRequest.user.uid}&petType=${petType}`)}>
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
            ) : (
              <Accordion sx={{marginTop: '1rem'}}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  disabled={true}
                >
                  <Typography>Sin solicitudes</Typography>
                </AccordionSummary>
              </Accordion>
            )
          }
        </CardContent>
      </Card>
    </>
  );
}

export default PostInformation;
