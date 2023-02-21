import axios from "axios";

const key = "AIzaSyDCKnZ3IEKOgmcBv8HPT-L7AffneFDgrwE";

export const getVideos = async (search, nextPageToken) => {
  return axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${key}&maxResults=30&order=relevance${
      nextPageToken ? "&pageToken=" + nextPageToken : ""
    }`
  );
};

export const getLikes = async (ids) => {
  return axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ids.join(
      ","
    )}&key=${key}`
  );
};
