import { useAuth } from '@/lib/auth';
import React from 'react';
import { Box, FormControl, OutlinedInput, Button } from '@mui/material';
import styles from '../../styles/Comments.module.css';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { addComment } from '@/lib/comments';

const schema = yup.object({
    comment: yup
      .string("El campo debe ser alfanumérico")
      .required("Este campo es requerido"),
  });

function SendComment(props) {
    const {postId} = props;
    const {currentUser} = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    const onSubmit = async (data) => {
        const {comment} = data;
        try{
            await addComment (comment, currentUser.uid, postId);
        }catch (error) {
            if (error.response) {
              alert(error.response.message);
              console.log(error.response);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          }
    }


  return (
    <>
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ width: '100%' }}>
        <OutlinedInput 
            {...register("comment")}
            placeholder="Escribe aquí tu comentario"/>
        </FormControl>
        <Box sx={{display:"flex", alignItems:"right", justifyContent:"right", paddingTop:"10px"}}>
        <Button className={styles.submit_button} type="submit">Enviar</Button>
        <Button className={styles.cancel_button}>Cancelar</Button>
        </Box>
    </Box>
    </>
  )
}

export default SendComment