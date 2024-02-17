import axios from "axios";

const postRequest = async (urlToPost, postData) => {
  try {
    const res = await axios.post(urlToPost, postData);

    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default postRequest;
