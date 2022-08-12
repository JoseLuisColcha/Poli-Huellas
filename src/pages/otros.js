import React, { useEffect, useState } from "react";
import { getPosts } from "@/lib/posts";
import { PetCard } from "@/components/PetCard";
import {
  CircularProgress,
  Grid,
  Box,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import Image from "next/image";
import styles from "../styles/petPages.module.css";
import PETTYPE from "src/constants/petType";
import { useAuth } from "@/lib/auth";
import PetsIcon from "@mui/icons-material/Pets";

export default function Otros() {
  const [otherPosts, setOtherPosts] = useState();
  const { session } = useAuth();

  useEffect(() => {
    const getOtherPosts = async () => {
      const status = session
        ? session?.role === "user"
          ? "ACCEPTED"
          : undefined
        : "ACCEPTED";
      const posts = await getPosts(PETTYPE.OTROS, status);
      setOtherPosts(posts);
    };
    getOtherPosts();
  }, [session]);

  return (
    <>
      <Box container className={styles.container}>
        {session?.role === "admin" ? (
          <Typography className={styles.text_title_main}>
            Conejos y otros
          </Typography>
        ) : (
          <>
            <Image
              src="/images/banner-other.jpg"
              alt="cover"
              width="3840px"
              height="1240px"
            />
            <Typography className={styles.title}>Sabías que?</Typography>
            <Stack direction="row">
              <PetsIcon className={styles.icon_pet} />
              <Typography className={styles.text}>
                La colita de los conejos es blanca para confundir a los
                depredadores mientras son perseguidos.
              </Typography>
            </Stack>
          </>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <h1>Otros</h1>
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            {otherPosts ? (
              otherPosts?.map((post, index) => (
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
