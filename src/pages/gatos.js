import React, { useEffect, useState } from "react";
import { getPosts } from "@/lib/posts";
import { PetCard } from "@/components/PetCard";
import { CircularProgress, Grid, Box, Typography, Stack } from "@mui/material";
import Image from "next/image";
import styles from "../styles/petPages.module.css";
import PETTYPE from "src/constants/petType";
import { useAuth } from "@/lib/auth";
import PetsIcon from "@mui/icons-material/Pets";

export default function Gatos() {
  const [catPosts, setCatPosts] = useState();
  const { session } = useAuth();

  useEffect(() => {
    const getCatPosts = async () => {
      const status = session
        ? session?.role === "user"
          ? "ACCEPTED"
          : undefined
        : "ACCEPTED";
      const posts = await getPosts(PETTYPE.GATO, status);
      setCatPosts(posts);
    };
    getCatPosts();
  }, [session]);

  return (
    <>
      <Box container className={styles.container}>
        {session?.role === "admin" ? (
          <Typography className={styles.text_title_main}>Gatos</Typography>
        ) : (
          <>
            <Image
              src="/images/gato-banner.jpg"
              alt="cover"
              width="3840px"
              height="1240px"
            />
            <Typography className={styles.title}>Sabías que?</Typography>
            <Stack direction="row">
              <PetsIcon className={styles.icon_pet} />
              <Typography className={styles.text}>
                Los gatos tienen una flexibilidad y agilidad impresionante,
                pueden saltar desde más de 3 metros de altura.
              </Typography>
            </Stack>
          </>
        )}
      </Box>

      <Grid container spacing={2} marginTop={4}>
        <Grid item xs={2}>
          <h1>Gatos</h1>
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            {catPosts ? (
              catPosts?.map((post, index) => (
                <PetCard
                  key={index}
                  postId={post.id}
                  petName={post.petName}
                  petAge={post.petAge}
                  petSex={post.petSex}
                  petImage={post.image}
                />
              ))
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
