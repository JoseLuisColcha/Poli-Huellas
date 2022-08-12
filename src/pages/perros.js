import React, { useEffect, useState } from "react";
import { getPosts } from "@/lib/posts";
import { PetCard } from "@/components/PetCard";
import {
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
  Typography,
  FormControlLabel,
  Radio,
  Box,
  Stack,
} from "@mui/material";
import Image from "next/image";
import styles from "../styles/petPages.module.css";
import PETTYPE from "src/constants/petType";
import { useAuth } from "@/lib/auth";
import PetsIcon from "@mui/icons-material/Pets";

export default function Gatos() {
  const [dogPosts, setDogPosts] = useState();
  const { session } = useAuth();

  useEffect(() => {
    const getDogPosts = async () => {
      const status = session
        ? session?.role === "user"
          ? "ACCEPTED"
          : undefined
        : "ACCEPTED";
      const posts = await getPosts(PETTYPE.PERRO, status);
      setDogPosts(posts);
    };
    getDogPosts();
  }, [session]);

  return (
    <>
      <Box container className={styles.container}>
        {session?.role === "admin" ? (
          <Typography className={styles.text_title_main}>Perros</Typography>
        ) : (
          <>
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
                La nariz de los perros puede llegar a tener hasta 300 millones
                de receptores olfativos.
              </Typography>
            </Stack>
          </>
        )}
      </Box>
      <Grid container spacing={2} marginTop={4}>
        <Grid item xs={2}>
          <FormControl>
            <FormLabel>Sexo</FormLabel>
            <RadioGroup
              aria-label="position"
              name="position"
              defaultValue="todos"
            >
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="hembra"
                control={<Radio />}
                label="Hembra"
              />
              <FormControlLabel
                value="macho"
                control={<Radio />}
                label="Macho"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Tamaño</FormLabel>
            <RadioGroup
              aria-label="position"
              name="position"
              defaultValue="Todos"
            >
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="pequeño"
                control={<Radio />}
                label="Pequeño"
              />
              <FormControlLabel
                value="mediano"
                control={<Radio />}
                label="Mediano"
              />
              <FormControlLabel
                value="grande"
                control={<Radio />}
                label="Grande"
              />
            </RadioGroup>
          </FormControl>
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
