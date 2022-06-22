import api from "./api";

export const fetcher = async (url) => {
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`
  );
  console.log("response", response);

  return response.data;
};
