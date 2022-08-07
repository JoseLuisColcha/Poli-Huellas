import {db, storage} from "@/lib/firebase/client";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import {ref, uploadBytesResumable } from "firebase/storage";
import QUESTIONS from "src/constants/questions";

export const newPost = async (answerOne, answerTwo, answerThree, answerFour, petType, petName, petSize, petAge, petSex, petPhoto, extraDescription, userId) => {
    try{
        await addDoc(collection(db, "posts"), {
            form: [
                {"question": QUESTIONS.GIVE_Q1, "answer": answerOne},
                {"question": QUESTIONS.GIVE_Q2, "answer": answerTwo},
                {"question": QUESTIONS.GIVE_Q3, "answer": answerThree},
                {"question": QUESTIONS.GIVE_Q4, "answer": answerFour},
            ],
            petType: petType,
            petName: petName,
            petSize: petSize,
            petAge: petAge,
            petSex: petSex,
            image: petPhoto,
            description: extraDescription,
            status:"created",
            userId,
            createdAt: Timestamp.fromDate(new Date()),
        });
    }catch(error){
        console.log(error);
    }
}

export const uploadPetImage = (file, id) => {
    const date = new Date();
    const createdAt = date.toISOString();
    const imageRef = ref(storage, `images/${id}/${"petImage"}-${createdAt}`);
    const task = uploadBytesResumable(imageRef, file);
    return task;
  };