import { useContext } from "react";
import { taskDataContext } from "../context";
import postRequest from "../utils/postRequest";
import SearchBox from "./SearchBox";

// eslint-disable-next-line react/prop-types
const TaskAction = ({ onOpen }) => {

    const { taskData, setTaskData } = useContext(taskDataContext);
    const { userId } = taskData.userInfo;


    const handelDeleteAll = async () => {

        const confirm = window.confirm("Are sure about deleting All Tasks");

        if (confirm) {

            const url = ` https://tasker-api-cojx.onrender.com/tasker_api/v1/deleteAll_task`
            let ID = { postUserId: userId };

            const response = await postRequest(url, ID);

            if (response.statusText === "OK") {
                setTaskData((prevTaskData) => ({
                    ...prevTaskData,
                    refresh: prevTaskData.refresh + 1
                }));
            }
        }
    }


    return (
        <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <SearchBox />

            <div className="flex items-center space-x-5">
                <button className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
                    onClick={onOpen}
                >Add Task</button>
                <button className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
                    onClick={handelDeleteAll}>Delete All</button>
            </div>
        </div>
    );
};

export default TaskAction;