import React from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CardMedia, Card, CardActionArea } from "@mui/material";
import { useRouter } from "next/router";

export default function CarruselPetCard(props) {
  const { petName, petImage, petSex, petId } = props;
  const infoPet = `Sexo: ${petSex}`;
  const router = useRouter()
  
  return (
    <>
      {petName && petImage ? (
        <CardActionArea onClick={() => router.push(`/post/${petId}`)}>
          <Card>
            <CardMedia component="img" height="250" image={petImage} />
            <ImageListItemBar title={petName} subtitle={infoPet} />
          </Card>
        </CardActionArea>
      ) : (
        ""
      )}
    </>
  );
}
// `${data.name} ${data.lastName}`;
