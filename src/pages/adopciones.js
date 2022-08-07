import PostCarrusel from "@/components/PostCarrusel";
import { Container } from "@mui/material";
import Routes from "src/constants/routes";
import styles from "../styles/Adoptions.module.css";
import Image from "next/image";

export default function Adoptions() {
  const carruselCategories = [
    {
      title: "Últimas Publicaciones",
    },
    {
      typePet: "Perro",
      title: "Perros en adopción",
      path: Routes.DOGS,
    },
    {
      typePet: "Gato",
      title: " Gatos en adopción",
      path: Routes.CATS,
    },
    {
      typePet: "Otro",
      title: " Otros mascotas en adopción",
      path: Routes.OTHER,
    },
  ];

  return (
    <Container>
      <Container className={styles.container}>
        <Image
          src="/images/banner-adoptions.jpg"
          alt="cover"
          width="1000x"
          height="409px"
        />
      </Container >
      {carruselCategories.map((categorie, index) =>
        categorie.typePet ? (
          <PostCarrusel
            key={index}
            title={categorie.title}
            typePet={categorie.typePet}
            path={categorie.path}
          />
        ) : (
          <PostCarrusel key={index} title={categorie.title} />
        )
      )}
    </Container>
  );
}
