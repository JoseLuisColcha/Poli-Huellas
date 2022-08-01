import React,{useEffect, useState} from 'react'
import { getPosts } from '@/lib/posts';
import { PetCard } from '@/components/PetCard';
import { CircularProgress, FormControl, FormLabel, Grid, RadioGroup, Typography, FormControlLabel, Radio, Box } from '@mui/material';
import Image from 'next/image';
import styles from '../styles/PetPages.module.css';
import PETTYPE from 'src/constants/petType';

export default function Gatos() {

  const [dogPosts, setDogPosts] = useState();

  useEffect(() => {
    const getDogPosts = async () => {
      const posts = await getPosts(PETTYPE.PERRO);
      setDogPosts(posts);
    }
    getDogPosts();
  }, []);
  
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
      <Typography className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
      </Box>
      <br/>
      <br/>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControl>
            <FormLabel>Sexo</FormLabel>
            <RadioGroup aria-label="position" name="position" defaultValue="todos">
              <FormControlLabel value="todos" control={<Radio />} label="Todos" />
              <FormControlLabel value="hembra" control={<Radio />} label="Hembra" />
              <FormControlLabel value="macho" control={<Radio />} label="Macho" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Tamaño</FormLabel>
            <RadioGroup aria-label="position" name="position" defaultValue="Todos">
              <FormControlLabel value="todos" control={<Radio />} label="Todos" />
              <FormControlLabel value="pequeño" control={<Radio />} label="Pequeño" />
              <FormControlLabel value="mediano" control={<Radio />} label="Mediano" />
              <FormControlLabel value="grande" control={<Radio />} label="Grande" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >
            {dogPosts ? dogPosts?.map((post,index) => 
              <PetCard key={index} postId={post.id} petName={post.petName} petAge={post.petAge} petSex={post.petSex} petImage={post.image} />
            ):
            <CircularProgress />
          }
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
