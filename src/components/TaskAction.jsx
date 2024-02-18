import { useContext } from "react";
import { taskDataContext } from "../context";
import postRequest from "../utils/postRequest";
import SearchBox from "./SearchBox";

// eslint-disable-next-line react/prop-types
const TaskAction = ({ onOpen }) => {

    const { taskData, setTaskData } = useContext(taskDataContext);
    const { userId } = taskData.userInfo;


    const handelDeleteAll = async () => {
        const confirmed = window.confirm("Are you sure about deleting all tasks");

        if (confirmed) {
            const url = `https://tasker-api-cojx.onrender.com/tasker_api/v1/deleteAll_task`;
            const requestData = { postUserId: userId };

            try {
                const response = await postRequest(url, requestData);

                if (response.data.status === "success") {
                    setTaskData((prevTaskData) => ({
                        ...prevTaskData,
                        data: [],
                        refresh: prevTaskData.refresh + 1
                    }));
                } else {
                    console.error("Failed to delete tasks:", response.data.status);
                }
            } catch (error) {
                console.error("Error deleting tasks:", error.message);
            }
        }
    };


    return (
        <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <SearchBox />

            <div className="flex items-center space-x-5">
                <button className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
                    onClick={onOpen}
                >Add Task</button>
                <button
                    className={`rounded-md ${taskData.data.length > 0 ? 'bg-red-500' : 'bg-gray-300'} px-3.5 py-2.5 text-sm font-semibold`}
                    onClick={handelDeleteAll}
                    disabled={taskData.data.length === 0}
                >
                    Delete All
                </button>
            </div>
        </div>
    );
};

export default TaskAction;