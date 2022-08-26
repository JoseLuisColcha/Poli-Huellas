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
import styles from "../../styles/homePage.module.css";

export default function PetsSection() {
  const pets = [
    {
      type: "Perros",
      image: "/images/dog.webp",
      to: Routes.DOGS,
    },
    {
      type: "Gatos",
      image: "/images/cat.webp",
      to: Routes.CATS,
    },
    {
      type: "Otros",
      image: "/images/ham.webp",
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
        <Typography className={styles.text_title_pets}>
          ¿Quieres <span className={styles.text_title_span}>adoptar</span> una
          mascota ?
        </Typography>
      </Grid>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        sx={{ flexWrap: "wrap" }}
      >
        {pets.map((pet) => {
          return (
            <CardActionArea sx={{ maxWidth: "300px", mb: 3 }} key={pet.type}>
              <Link href={pet.to}>
                <Card variant="inlined">
                  <CardMedia
                    component="img"
                    height="300"
                    image={pet.image}
                    alt="pet"
                    sx={{ borderRadius: 50 }}
                  />
                  <CardContent>
                    <Typography variant="h5" align="center">
                      {pet.type}
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
