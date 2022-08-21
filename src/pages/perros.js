import React, { useEffect, useState } from "react";
import { getPosts } from "@/lib/posts";
import { PetCard } from "@/components/PetCard";
import { CircularProgress, Grid, Typography, Box, Stack } from "@mui/material";
import Image from "next/image";
import styles from "../styles/petPages.module.css";
import PETTYPE from "src/constants/petType";
import { useAuth } from "@/lib/auth";
import PetsIcon from "@mui/icons-material/Pets";
import FilterPostsRadioGroup from "@/components/FilterPostsRadioGroup";

export default function Gatos() {
  const [dogPosts, setDogPosts] = useState();
  const { session } = useAuth();
  const [petSex, setPetSex] = useState(null);
  const [petSize, setPetSize] = useState(null);
  console.log({ petSex });
  console.log({ petSize });

  useEffect(() => {
    const getDogPosts = async () => {
      const status = session
        ? session?.role === "user"
          ? "ACCEPTED"
          : undefined
        : "ACCEPTED";
      let petSexName = petSex?.at(0).toUpperCase() + petSex?.substring(1);
      petSexName = petSexName === "Todos" ? null : petSexName;
      let petSizeName = petSize?.at(0).toUpperCase() + petSize?.substring(1);
      petSizeName = petSizeName === "Todos" ? null : petSizeName;

      const posts = await getPosts(
        PETTYPE.PERRO,
        status,
        petSexName,
        petSizeName
      );
      setDogPosts(posts);
    };
    getDogPosts();
  }, [session, petSex, petSize]);

  return (
    <>
      <Box container className={styles.container}>
        <Image
          src="/images/perro-banner.jpg"
          alt="cover"
          width="3840px"
          height="1240px"
        />
        <Typography className={styles.title}>Sabías que?</Typography>
        <Stack direction="row">
          <PetsIcon className={styles.icon_pet} />
          <Typography className={styles.text}>
            La nariz de los perros puede llegar a tener hasta 300 millones de
            receptores olfativos.
          </Typography>
        </Stack>
      </Box>
      <Grid container spacing={2} marginTop={4}>
        <Grid item xs={2}>
          <FilterPostsRadioGroup
            setPetSize={setPetSize}
            setPetSex={setPetSex}
          />
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 5, sm: 2, md: 4 }}
          >
            {dogPosts ? (
              dogPosts?.map((post, index) => (
                <PetCard
                  key={index}
                  postId={post.id}
                  petName={post.petName}
                  petAge={post.petAge}
                  petSex={post.petSex}
                  petImage={post.image}
                  status={post.status}
                  session={session}
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
