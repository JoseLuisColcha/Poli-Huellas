import { Box } from "@mui/material";
import errorImg from "../../public/images/404Cat.svg";
import Image from 'next/image';


export default function NotFound() {
  return (
    <Box sx={{ justifyContent: "center" }}>
      <Image
        src={errorImg}
        alt="Picture of cat error 404"
        width="1500px"
        height="600px"
      />
    </Box>
  );
}
