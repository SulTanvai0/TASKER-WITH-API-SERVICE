import { useContext, useEffect } from "react";
import { taskDataContext } from "../context";

/* eslint-disable react/prop-types */
const UserUI = () => {
    const { taskData, setTaskData } = useContext(taskDataContext);

    function handelShowFrom(value) {
        setTaskData((prevTaskData) => ({
            ...prevTaskData,
            showUserModal: value,
        }));
    }

    useEffect(() => {

        let userinfoStr = localStorage.getItem("userInfo");
        let userInfo = JSON.parse(userinfoStr);

        if (userInfo) {
            setTaskData((prevTaskData) => ({
                ...prevTaskData,
                userInfo: userInfo,
                refresh: prevTaskData.refresh + 1
            }));
        }

    }, [setTaskData])



    const { fullName } = taskData.userInfo;

    return (
        <>

            {fullName && <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md hover:bg-gradient-to-l font-extrabold p-2 mx-3 whitespace-nowrap">
                {fullName}
            </div>}

            {
                !fullName && <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md hover:bg-gradient-to-l font-bold p-2 mx-3 whitespace-nowrap"
                    onClick={() => handelShowFrom(!taskData.showUserModal)}
                >
                    Subscribe To Tasker
                </button>
            }

        </>
    );
};

export default UserUI;
