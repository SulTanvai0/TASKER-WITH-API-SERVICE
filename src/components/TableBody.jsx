/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { taskDataContext } from "../context";
import postRequest from "../utils/postRequest";



const TableBody = ({ data, setShowModal, handelAddEditTask }) => {

    const { _id, title, description, isFavourite, priority, tags = [] } = data;



    const tagBackground = [
        '#00D991A1',
        '#1C92FFB0',
        '#FE1A1AB5',
        '#BD560BB2',
        '#00B2D9CC',
        '#8407E6A8',
        '#07AC67D6',
        '#2F43F8BF',
        '#AE6D0BDB',
        '#10FBEDB2',
    ];

    const { setTaskData } = useContext(taskDataContext);


    const handelDelete = async (ID) => {

        const confirm = window.confirm(`sure you want to delete ${title}`);

        if (confirm) {
            const url = ` https://tasker-api-cojx.onrender.com/5689/tasker_api/v1/delete_task`
            const deleteIfo = { "PostId": ID }

            const response = await postRequest(url, deleteIfo);

            if (response.statusText === "OK") {
                setTaskData((prevTaskData) => ({
                    ...prevTaskData,
                    refresh: prevTaskData.refresh + 1
                }));
            }
        }

    }

    const handelFavorite = async (Favorite) => {

        const url = ` https://tasker-api-cojx.onrender.com/tasker_api/v1/update_task`


        let newTask = { ...data, isFavourite: Favorite };


        const response = await postRequest(url, newTask);

        if (response.statusText === "OK") {
            setTaskData((prevTaskData) => ({
                ...prevTaskData,
                refresh: prevTaskData.refresh + 1
            }));
        }

    }





    return (
        <>

            <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
                <td>
                    <button onClick={() => handelFavorite(!isFavourite)} >
                        {
                            isFavourite ? <FaStar color="yellow" /> : <FaStar />
                        }
                    </button>
                </td>
                <td>{title}</td>
                <td>
                    <div>
                        {description}
                    </div>
                </td>
                <td>
                    <ul className="flex justify-center gap-1.5 flex-wrap">
                        {
                            tags.map((tag) => {
                                const randomIndex = Math.round(Math.random() * (tagBackground.length - 1));
                                return (
                                    <li key={tag}>
                                        <span
                                            style={{ background: tagBackground[randomIndex] }}
                                            className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#2F43F8BF] px-2.5 text-sm capitalize text-[#F4F5F6]">{tag}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </td>
                <td className="text-center">{priority}</td>
                <td>
                    <div className="flex items-center justify-center space-x-3">
                        <button className="text-red-500"
                            onClick={() => handelDelete(_id)}
                        >Delete</button>
                        <button className="text-blue-500"
                            onClick={() => { setShowModal(true); handelAddEditTask(data, false) }}
                        >Edit</button>
                    </div>
                </td>
            </tr >
        </>
    );
};

export default TableBody;

