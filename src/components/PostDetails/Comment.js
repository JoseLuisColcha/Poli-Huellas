import { Avatar, Grid } from '@mui/material';
import React from 'react'

function Comment({postId, userId, comment}) {
  return (
    <>
        <Grid container>
          <Grid item xs={12} sm={2}>
            <Avatar alt={comment} src="/images/pet19.jpg"/>
          </Grid>
        </Grid>
    </>
  )
}

export default Comment