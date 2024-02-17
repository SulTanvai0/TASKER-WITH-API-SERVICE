import { useContext, useEffect, useState } from "react";
import NoTasksFound from "../components/NoTasksFound";
import TaskAction from "../components/TaskAction";
import TaskList from "../components/TaskList";
import TaskModel from "../components/TaskModel";
import { taskDataContext } from "../context";
import postRequest from "../utils/postRequest";

const TaskBoard = () => {

    const { taskData, setTaskData } = useContext(taskDataContext);
    const [showModal, setShowModal] = useState(false)
    const [editTask, setEditTask] = useState(null);
    const { userId } = taskData.userInfo;

    const handelAddEditTask = (task, isAdd, apiReq) => {
        if (isAdd) {
            const handelCreate = async () => {

                const url = ` https://tasker-api-cojx.onrender.com/tasker_api/v1/create_task`

                let postUserId = { postUserId: userId };
                let newTask = { ...task, ...postUserId };

                const response = await postRequest(url, newTask);

                if (response.data.status == "success") {


                    setTaskData((prevTaskData) => ({
                        ...prevTaskData,
                        refresh: prevTaskData.refresh + 1
                    }));
                }
            }
            handelCreate()
        }

        else {

            setEditTask(task);

            const handelUpdate = async () => {

                const url = `https://tasker-api-cojx.onrender.com/tasker_api/v1/update_task`

                let postUserId = task.postUserId;

                let newTask = { ...task, postUserId };

                const response = await postRequest(url, newTask);


                if (response.statusText === "OK") {
                    console.log(response);
                    setTaskData((prevTaskData) => ({
                        ...prevTaskData,
                        refresh: prevTaskData.refresh + 1
                    }));
                }
            }
            handelUpdate();
        }
    };



    useEffect(() => {
        let userID = { postUserId: userId }
        let url = taskData.api;

        if (userID) {
            const fetchData = async (ID, url) => {
                try {
                    const response = await postRequest(url, ID);
                    const newData = response?.data?.data;


                    if (newData.length > 0) {
                        setTaskData((prevTaskData) => ({
                            ...prevTaskData,
                            data: [...newData],
                        }));
                    }
                } catch (error) {
                    console.error('Error fetching task data:', error);
                }
            };

            fetchData(userID, url);
        }
    }, [setTaskData, taskData.api, taskData.refresh, userId]);


    return (
        <section className="mb-20">

            <div className="container">
                <div className="p-2 flex justify-end">

                </div>
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">

                    {
                        showModal && <TaskModel
                            onEditObj={editTask}
                            onSave={handelAddEditTask}
                            onEditSet={() => setEditTask(null)}
                            onClose={() => setShowModal(false)}
                        />

                    }

                    <TaskAction onOpen={() => setShowModal(true)} />

                    {taskData.data.length > 0 ? < TaskList setShowModal={setShowModal} handelAddEditTask={handelAddEditTask} /> : <NoTasksFound />}

                </div>
            </div>
        </section>
    );
};

export default TaskBoard; 