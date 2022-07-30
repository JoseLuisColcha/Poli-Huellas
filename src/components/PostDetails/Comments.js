import React,{useState, useEffect} from 'react'
import { getComments } from "@/lib/posts";
import { Typography, Box, FormControl, OutlinedInput, Button, ButtonGroup } from '@mui/material';
import styles from '../../styles/Comments.module.css';
import Comment from './Comment';
import { CommentOutlined } from '@mui/icons-material';
import SendComment from './SendComment';

function Comments(props) {
    const {postId} = props;
    const [comments, setComments] = useState([]);

    // useEffect(() => {
    //     const getCommentsByPost = async () => {
    //         let commentsList = [];
    //         const postComments = await getComments(postId).then(
    //             comments => {
    //                 comments.map(comment => {
    //                     commentsList.push(comment);
    //                 }
    //                 );
    //                 setComments(commentsList);
    //             }
    //         );
    //     }
    //     getCommentsByPost();
    // }, [postId]);
    // console.log(comments);
  return (
    <>
        {
        comments === [] || comments === undefined ?
        <Typography>No tiene comentarios</Typography>
        :
        <Typography>{comments.length} comentarios</Typography>
        }
        <SendComment postId={postId}/>
        <div>
            {comments?.map(comment => (
                <Comment key={comment.id} comment={comment.comment} postId={comment.postId} userId={comment.userId} />
            ))}
        </div>
    </>
  )
}

export default Comments