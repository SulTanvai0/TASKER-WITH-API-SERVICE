/* eslint-disable react/prop-types */
import { useState } from "react";


const Modal = ({ onSave, onEditObj, onClose, onEditSet }) => {

    const [task, setTask] = useState(onEditObj || {
        title: "",
        description: "",
        tags: [],
        priority: "",
        isFavorite: false,
    });
    //no need for set..function ;
    const [isAdd] = useState(Object.is(onEditObj, null));

    const [errorFiled, setErrorFiled] = useState({
        title: false,
        description: false,
        tags: false,
        priority: false,
    });

    const handelTask = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        if (name === "tags") {
            value = value.split(",");
        }
        setTask({
            ...task,
            [name]: value
        });
    }



    const errorMessage = {
        title: "Title field is empty",
        description: "Description field is empty",
        tags: "Tags field is empty",
        priority: "Select one of the priority options",
    };

    const validationCheck = (task, isAdd) => {

        let { title, description, tags, priority } = task;

        let trimTitle = title.trim()
        let trimDescription = description.trim()




        if (trimTitle && trimDescription && tags[0] && priority) {

            onSave(task, isAdd);
            onClose();
        } else {
            const updatedErrorFiled = {
                title: trimTitle.length === 0,
                description: trimDescription.length === 0,
                tags: tags[0]?.length === 0,
                priority: priority.length === 0,
            };

            setErrorFiled({
                ...errorFiled,
                ...updatedErrorFiled,
            });

            const errorMessages = Object.keys(updatedErrorFiled)
                .filter(field => updatedErrorFiled[field])
                .map(field => errorMessage[field])
                .join(", ");

            // toast.error(`All Fields Are Required: ${errorMessages}`);
        }
    };



    return (

        <form
            className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11"
        >
            <h2
                className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]"
            >
                {isAdd ? "Add New Task" : "Edit Task"}
            </h2>

            <div className="space-y-9 text-white lg:space-y-10">

                <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="title">Title</label>
                    <input
                        className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        value={task.title}
                        onChange={handelTask}
                    />
                    {errorFiled.title && <span className="text-red-600">{errorMessage.title}</span>}
                </div>

                <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                        type="text"
                        name="description"
                        placeholder="Task Description"
                        value={task.description}
                        onChange={handelTask}
                    ></textarea>
                    {errorFiled.description && <span className="text-red-600">{errorMessage.description}</span>}
                </div>

                <div
                    className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20"
                >
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="tags">Tags</label>
                        <input
                            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                            type="text"
                            name="tags"
                            placeholder="For different tag use comma"
                            value={task.tags}
                            onChange={handelTask}
                        />
                        {errorFiled.tags && <span className="text-red-600">{errorMessage.tags}</span>}
                    </div>

                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="priority">Priority</label>
                        <select
                            className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                            name="priority"
                            id="priority"
                            value={task.priority}
                            onChange={handelTask}
                        >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        {errorFiled.priority && <span className="text-red-600">{errorMessage.priority}</span>}

                    </div>
                </div>
            </div>

            <div className="mt-16 flex justify-between lg:mt-20">
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                    onClick={(e) => {
                        e.preventDefault();
                        validationCheck(task, isAdd)
                        onEditSet();
                    }}
                >
                    {isAdd ? "Add New Task" : " Save Task"}
                </button>
                <button
                    type="submit"
                    className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
                    onClick={(e) => {
                        onClose()
                        onEditSet()
                        e.preventDefault();
                    }}
                >
                    <a href="/">close</a>
                </button>
            </div>
        </form>
    );
};

export default Modal;