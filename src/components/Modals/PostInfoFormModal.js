import { Box, Button, Grid, Modal, Typography, Divider } from "@mui/material";
import styles from "../../styles/postInfoFormModal.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #7E41A1",
  borderRadius: "20px",
  boxShadow: 24,
  paddingX: "2rem",
  paddingY: "1rem",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "#FFFFFF",
};

export const PostInfoFormModal = ({
  open,
  handleClose,
  formInfo,
  handleAction,
  postStatus,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style}>
        <Typography id="modal-modal-title" className={styles.text_title_modal}>
          Solicitud de publicación
        </Typography>
        {formInfo.map(({ question, answer }) => {
          return (
            <>
              <Divider />

              <Grid container sx={{ paddingY: "1rem" }} key={question}>
                <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{
                    display: "flex",
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  <Typography>{question}</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography>{answer}</Typography>
                </Grid>
              </Grid>
            </>
          );
        })}
        <Grid
          container
          sx={{ justifyContent: { xs: "center", md: "flex-end" }, gap: "1rem" }}
        >
          {postStatus === "created" && (
            <>
              <Button
                variant="contained"
                id="ACCEPTED"
                onClick={() => handleAction("ACCEPTED")}
              >
                Aceptar
              </Button>
              <Button
                variant="contained"
                color="error"
                id="REJECTED"
                onClick={() => handleAction("REJECTED")}
              >
                Denegar
              </Button>
            </>
          )}
          {postStatus === "ACCEPTED" && (
            <Button variant="contained" disabled={true}>
              Publicación aceptada
            </Button>
          )}
          {postStatus === "REJECTED" && (
            <Button variant="contained" disabled={true}>
              Publicación rechazada
            </Button>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};
