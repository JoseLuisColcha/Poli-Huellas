import { Avatar, Grid } from '@mui/material';
import React from 'react'

function Comment(props) {
    const {postId, userId, comment} = props;
  return (
    <>
        <Grid container>
          <Grid item xs={12} sm={2}>
            <Avatar alt={photo} src="/images/pet19.jpg"/>
          </Grid>
        </Grid>
    </>
  )
}

export default Comment