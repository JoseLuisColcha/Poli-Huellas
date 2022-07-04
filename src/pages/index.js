import { Container } from "@mui/material";
import InformationSection from "@/components/Home/InformationSection";
import MainSection from "@/components/Home/MainSection";
import PetsSection from "@/components/Home/PetsSection";
import SearchPetSection from "@/components/Home/SearchPetSection";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Poli Huellas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <MainSection />
          <PetsSection />
          <SearchPetSection />
          <InformationSection />
        </Container>
      </main>

      <footer></footer>
    </div>
  );
}
