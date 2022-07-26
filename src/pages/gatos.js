import React,{useEffect, useState} from 'react'
import { getPosts } from '@/lib/posts';
import { PetCard } from '@/components/PetCard';
import {CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import styles from '../styles/PetPages.module.css';

export default function Gatos() {

  const [catPosts, setCatPosts] = useState();

  useEffect(() => {
    const getCatPosts = async () => {
      const posts = await getPosts("Gato");
      setCatPosts(posts);
    }
    getCatPosts();
  }, []);
  
  return (
    <>
      <Grid container className={styles.container}>
      <Image
          src="/images/gato-banner.jpg"
          alt="cover"
          width="3840px"
          height="1240px"
        />
      <Typography className={styles.title}>Sabías que?</Typography>
      <Typography className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <h1>Gatos</h1>
        </Grid>
        <Grid item xs={10}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            {catPosts ? catPosts?.map((post,index) => 
              <PetCard key={index} postId={post.id} petName={post.petName} petAge={post.petAge} petSex={post.petSex} petImage={post.image} />
            ): 
              <CircularProgress />
            }
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}
