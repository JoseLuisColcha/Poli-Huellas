import { getAdoptionRequestsByPostId, getUserAdoptionRequestsByPostId } from "@/lib/adoption-requests"
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";

export const useAdoptionRequest = ({postId, userId}) => {
  const [adoptionRequestsByPostId, setAdoptionRequestsByPostId] = useState(null);
  const [userAdoptionRequestByPostId, setUserAdoptionRequestByPostId] = useState(null);
  const {users} = useAuth()

  useEffect(() => {
    const getAdoptionRequests = async () => {
      const adoptionRequests = await getAdoptionRequestsByPostId({postId});
      const newAdoptionsRequests = adoptionRequests.map(adoptionRequest => {
        const user = users?.find(user => user.uid === adoptionRequest.userId)
        const {userId, ...rest} = adoptionRequest
        return {...rest, user}
      })
      setAdoptionRequestsByPostId(newAdoptionsRequests);
    }
    postId && getAdoptionRequests();
  }, [postId, users]);

  useEffect(() => {
    const getAdoptionRequests = async () => {
      const adoptionRequest = await getUserAdoptionRequestsByPostId({postId, userId});
      const {userId: _, ...rest} = adoptionRequest
      const user = users?.find(user => user.uid === adoptionRequest.userId)
      const newAdoptionR = {...rest, user}
      setUserAdoptionRequestByPostId(newAdoptionR);
    }
    postId && userId && getAdoptionRequests();
  }, [postId, users, userId]);

  return {
    adoptionRequestsByPostId,
    userAdoptionRequestByPostId 
  }
}