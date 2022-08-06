import { Box, Button, Grid, Modal, Typography } from '@mui/material'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "1px solid #000056",
  boxShadow: 24,
  paddingX: "2rem",
  paddingY: "1rem",
};

export const PostInfoFormModal = ({ open, handleClose, formInfo, handleAction, postStatus }) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component='form' sx={style}>
        {
          formInfo.map(({ question, answer }) => {
            return (
              <Grid
                container
                sx={{ paddingY: "1rem" }}
                key={question}
              >
                <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{ display: "flex", textAlign: { xs: 'center', md: 'left' } }}
                >
                  <Typography>{question}</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
                >
                  <Typography>{answer}</Typography>
                </Grid>
              </Grid>
            )
          })
        }
        <Grid
          container
          sx={{ justifyContent: { xs: "center", md: "flex-end" }, gap: "1rem" }}
        >
          {
            postStatus === "created" && (
              <>
                <Button
                  variant="contained"
                  id='ACCEPTED'
                  onClick={() => handleAction('ACCEPTED')}
                >
                  Aceptar
                </Button>
                <Button
                  variant="contained"
                  color='error'
                  id='REJECTED'
                  onClick={() => handleAction('REJECTED')}
                >
                  Denegar
                </Button>
              </>
            )
          }
          {
            postStatus === "ACCEPTED" && (
              <Button
                variant="contained"
                disabled={true}
              >
                Publicación aceptada
              </Button>
            )
          }
          {
            postStatus === "REJECTED" && (
              <Button
                variant="contained"
                disabled={true}
              >
                Publicación rechazada
              </Button>
            )
          }
        </Grid>
      </Box>
    </Modal>
  )
}