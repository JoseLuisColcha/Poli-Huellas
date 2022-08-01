import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { getPost } from "@/lib/posts";
import {
  Grid,
} from "@mui/material";
import PostCover from "@/components/PostDetails/PostCover";
import PostInformation from "@/components/PostDetails/PostInformation";
import Comments from "@/components/PostDetails/Comments";
import { useAdoptionRequest } from "@/hooks/useAdoptionRequest";

function Post() {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [postData, setPostData] = useState(null);
  const { adoptionRequestsByPostId } = useAdoptionRequest({ postId: id });

  useEffect(() => {
    const getPostData = async () => {
      const post = await getPost(id);
      setPostData(post);
    };
    id && getPostData();
  }, [id]);

  return (
    <>
      {postData ? (
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
                adoptionRequests={adoptionRequestsByPostId}
              />
            </Grid>
          </Grid>
          <Comments postId={id} />
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Post;
