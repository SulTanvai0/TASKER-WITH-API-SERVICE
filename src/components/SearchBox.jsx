import { useContext, useState } from "react";
import { taskDataContext } from "../context";
import postRequest from "../utils/postRequest";

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { taskData, setTaskData } = useContext(taskDataContext);
    const { userId } = taskData.userInfo;

    const doSearch = async (term) => {
        let url = `https://tasker-api-cojx.onrender.com/tasker_api/v1/searchByKeyWord_task`;
        const postUserId = userId;

        const keyWord = term;
        let postObj = { postUserId, keyWord };

        try {
            let res = await postRequest(url, postObj);

            if (res.data.data.length > 0) {
                let newData = res.data.data;
                setTaskData((prevTaskData) => ({
                    ...prevTaskData,
                    data: [...newData],
                }));
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }




    return (
        <form>
            <div className="flex">
                <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
                        placeholder="Search Task"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required />
                    <button
                        type="submit"
                        className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4"
                        onClick={(e) => { e.preventDefault(); doSearch(searchTerm) }}
                    >

                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBox;