import axios from "axios";
import { BASE_URL, API_KEY } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Start request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);
apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);

    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", error);
    console.log("RESPONSE ERROR", error.response.data.error);

    return Promise.reject(error);

    // return errorName;
  }
);

export default apiService;
