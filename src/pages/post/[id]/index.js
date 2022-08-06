import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { getPost, updatePost } from "@/lib/posts";
import { Grid } from "@mui/material";
import PostCover from "@/components/PostDetails/PostCover";
import PostInformation from "@/components/PostDetails/PostInformation";
import Comments from "@/components/PostDetails/Comments";
import { PostInfoFormModal } from "@/components/Modals/PostInfoFormModal";
import { useAlert } from "@/lib/alert";

function Post() {
  const router = useRouter();
  const {addAlert} = useAlert();
  const {
    query: { id },
  } = router;
  const [postData, setPostData] = useState(null);
  const [openPostForm, setOpenPostForm] = useState(false);

  useEffect(() => {
    const getPostData = async () => {
      const post = await getPost(id);
      setPostData(post);
    };
    id && getPostData();
  }, [id]);

  const handleAction = async (action) => {
    try{
       await updatePost({ data: { status: action }, id});
       addAlert({
        text: "Publicación actualizada",
        severity: "success",
        duration: 6000,
      }); 
    } catch(e){
      console.log({e})
      addAlert({
        text: "Error al actualizar la publicación",
        severity: "error",
        duration: 6000,
      });
    }
  }

  const handleClosePostFormModal = () => setOpenPostForm(false);

  return (
    <>
      {postData && (
        <>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PostCover
                petImage={postData.image}
                petName={postData.petName}
                userId={postData.userId}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <PostInformation
                id={id}
                petName={postData.petName}
                petSex={postData.petSex}
                petAge={postData.petAge}
                petSize={postData.petSize}
                description={postData.description}
                postUserId={postData.userId}
                petType={postData.petType}
                setOpenPostForm={setOpenPostForm}
              />
            </Grid>
          </Grid>
          <Comments postId={id} />
          <PostInfoFormModal
            open={openPostForm}
            handleClose={handleClosePostFormModal}
            formInfo={postData.form}
            handleAction={handleAction}
            postStatus={postData.status}
          />
        </>
      )}
    </>
  );
}

export default Post;
