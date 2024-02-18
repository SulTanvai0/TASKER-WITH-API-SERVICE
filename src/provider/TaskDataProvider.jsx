
import { useState } from "react";
import { taskDataContext } from "../context";

const TaskDataProvider = ({ children }) => {

    const [taskData, setTaskData] = useState({
        api: "https://tasker-api-cojx.onrender.com/tasker_api/v1/getTasks",
        data: [],
        userInfo: {},
        showUserModal: false
    });

    return (
        <taskDataContext.Provider value={{ taskData, setTaskData }}>
            {children}
        </taskDataContext.Provider>
    );
};

export default TaskDataProvider;