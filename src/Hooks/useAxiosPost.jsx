import axios from "axios";
import { useEffect, useState } from "react";


const useAxiosPost = (url, ID) => {

    const [data, setData] = useState([]);

    useEffect(() => {

        const postRequest = async (urlToPost, postData) => {

            try {
                const res = await axios.post(urlToPost, postData);
                setData(res.data.data);
            } catch (error) {
                console.log(error.message);
            }
        }

        if (ID && url) {
            postRequest(url, ID)
        }

    }, [url, ID]);
    return data;
};

export default useAxiosPost;