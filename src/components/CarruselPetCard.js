import React from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CardMedia, Card, CardActionArea } from "@mui/material";

export default function CarruselPetCard(props) {
  const { petName, petImage, petSex } = props;
  const infoPet = `Sexo: ${petSex}`;

  return (
    <>
      {petName && petImage ? (
        <CardActionArea>
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
