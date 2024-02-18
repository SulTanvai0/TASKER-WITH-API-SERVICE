import { useContext } from "react";
import { taskDataContext } from "../context";
import TableBody from "./TableBody";

/* eslint-disable react/prop-types */
const TaskList = ({ setShowModal, handelAddEditTask }) => {

    const { taskData } = useContext(taskDataContext);

    return (
        <div className="overflow-auto">

            <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                    <tr>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]"> Title </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-full"> Description </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]"> Tags </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Priority </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Options </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        taskData.data.map((data) => <TableBody key={data["_id"]} data={data}
                            setShowModal={setShowModal} handelAddEditTask={handelAddEditTask} />)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default TaskList;