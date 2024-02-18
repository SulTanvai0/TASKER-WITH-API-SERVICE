import { useContext } from "react";
import toast from 'react-hot-toast';
import { pageRefreshContext, taskDataContext } from "../context";
import postRequest from "../utils/postRequest";
import SearchBox from "./SearchBox";

// eslint-disable-next-line react/prop-types
const TaskAction = ({ onOpen }) => {

    const { taskData } = useContext(taskDataContext);
    const { refresh, setRefresh } = useContext(pageRefreshContext)
    const { userId } = taskData.userInfo;


    const handelDeleteAll = async () => {
        const confirmed = window.confirm("Are you sure about deleting all tasks");

        if (confirmed) {
            const url = `https://tasker-api-cojx.onrender.com/tasker_api/v1/deleteAll_task`;
            const requestData = { postUserId: userId };

            try {
                const response = await postRequest(url, requestData);

                if (response.data.status === "success") {
                    setRefresh(refresh + 1)
                    toast.success(`All tasks removed from task list`)

                } else {
                    console.error("Failed to delete tasks:", response.data.status);
                }
            } catch (error) {
                console.error("Error deleting tasks:", error.message);
            }
        }
    };



    return (<>
        {
            taskData.userInfo.userId ? (
                <div className="mb-14 items-center justify-between sm:flex">
                    <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
                    {
                        taskData.data.length > 0 && <SearchBox />
                    }

                    <div className="flex items-center space-x-5">
                        <button
                            className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
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
            ) : (
                <div className="mb-14 flex items-center justify-between sm:flex text-center p-6 rounded-xl relative overflow-hidden">
                    <p className="text-3xl animate-slideLeft">Please subscribe to Tasker to add, edit, or delete tasks</p>
                </div>

            )
        }


    </>

    );
};

export default TaskAction;

/*  */