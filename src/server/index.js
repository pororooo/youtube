import axios from "axios";

export const getVideos = async (search, nextPageToken) => {
  const key = "AIzaSyD8NhtPbZR0W0tsdNTo8XpUZdF3Jlu_6NE";
  return axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${key}&maxResults=30&order=relevance${
      nextPageToken ? "&pageToken=" + nextPageToken : ""
    }`
  );
};

export const getLikes = async (ids) => {
  const key = "AIzaSyB_Qfguku1t5k5LrJ2r3Q2VvtkZxN_zNyI";
  return axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ids.join(
      ","
    )}&key=${key}`
  );
};
