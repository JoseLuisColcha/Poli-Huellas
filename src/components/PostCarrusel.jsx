import { React, useState, useEffect } from "react";
import { Skeleton, Button, Typography, Container, Box } from "@mui/material";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { getPosts } from "@/lib/posts";
import Link from "next/link";
import CarruselPetCard from "./CarruselPetCard";
import styles from "../styles/adoptions.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "@/lib/auth";

export default function PostCarrusel(props) {
  const { typePet, path, title } = props;
  const [postsPets, setPostsPets] = useState();
  const numSliders = [0, 1, 2, 3];
  const {session} = useAuth()

  useEffect(() => {
    const getPostsPets = async () => {
      const status = session ? session?.role === "user" ? "ACCEPTED" : undefined : 'ACCEPTED';
      const posts = await getPosts(typePet, status);
      setPostsPets(posts);
    };
    getPostsPets();
  }, [session]);

  return (
    <Container className={styles.container_carrusel}>
      <Typography className={styles.title} variant="h5" color="inherit">
        {title}
      </Typography>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={2}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 40 },
          1024: { slidesPerView: 4, spaceBetween: 50 },
        }}
        navigation={true}
        modules={[Navigation]}
      >
        {postsPets
          ? postsPets?.map((post, index) => (
              <>
                <SwiperSlide key={index}>
                  <CarruselPetCard
                    petName={post.petName}
                    petImage={post.image}
                    petSex={post.petSex}
                    petId={post.id}
                  />
                </SwiperSlide>
              </>
            ))
          : numSliders?.map((index) => (
              <SwiperSlide key={index}>
                <Skeleton variant="rectangular" height={250} />
              </SwiperSlide>
            ))}
      </Swiper>
      {typePet ? (
        <Box className={styles.button_container}>
          <Link href={path} passHref>
            <Button
              size="large"
              variant="contained"
              
              endIcon={<ArrowForwardIcon />}
              className={styles.button_view_more}
            >
              Ver más
            </Button>
          </Link>
        </Box>
      ) : (
        ""
      )}
    </Container>
  );
}
