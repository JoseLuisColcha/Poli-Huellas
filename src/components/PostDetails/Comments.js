import React, { useState, useEffect } from 'react'
import { listtenComments } from "@/lib/comments";
import { Typography, Box, FormControl, OutlinedInput, Button, ButtonGroup } from '@mui/material';
import styles from '../../styles/Comments.module.css';
import Comment from './Comment';
import { CommentOutlined } from '@mui/icons-material';
import SendComment from './SendComment';

function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const cb = (snapshot) => {
      const comments = snapshot.docs
      setComments(comments.map(doc => ({ ...doc.data(), id: doc.id })))
    }
    const unsub = listtenComments({ postId, callback: cb });
    return () => unsub();
  }, [postId]);

  return (
    <>
      {
        comments === [] || comments === undefined ?
          <Typography>No tiene comentarios</Typography>
          :
          <Typography>{comments.length} comentarios</Typography>
      }
      <SendComment postId={postId} />
      <div>
        {comments?.map(comment => (
          <Comment key={comment.id} comment={comment.comment} postId={comment.postId} userId={comment.userId} />
        ))}
      </div>
    </>
  )
}

export default Comments