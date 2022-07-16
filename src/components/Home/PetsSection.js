import {
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Stack,
  Grid,
} from "@mui/material";
import Link from "next/link";
import Routes from "../../constants/routes";
import styles from "../../styles/TextGlobal.module.css";

export default function PetsSection() {
  const pets = [
    {
      type: "Perros",
      image: "/images/dog.jpg",
      to: Routes.DOGS,
    },
    {
      type: "Gatos",
      image: "/images/cat.png",
      to: Routes.CATS,
    },
    {
      type: "Otros",
      image: "/images/ham.jpg",
      to: Routes.OTHER,
    },
  ];
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        sx={{ p: 8 }}
      >
        <Typography variant="h3" mt={6} mb={6}>
          ¿Quieres <span className={styles.txtcolor}>adoptar</span> una mascota
          ?
        </Typography>
      </Grid>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        sx={{ flexWrap: "wrap" }}
      >
        {pets.map((item) => {
          return (
            <CardActionArea sx={{ maxWidth: "300px", my: 5 }} key={item.type}>
              <Link href={item.to}>
                <Card variant="inlined">
                  <CardMedia
                    component="img"
                    height="300"
                    image={item.image}
                    alt="pet"
                    sx={{ borderRadius: 50 }}
                  />
                  <CardContent>
                    <Typography variant="h5" align="center">
                      {item.type}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </CardActionArea>
          );
        })}
      </Stack>
    </>
  );
}
