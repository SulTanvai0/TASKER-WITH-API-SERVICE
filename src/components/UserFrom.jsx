import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import svg from "../assets/submit.svg";
import { pageRefreshContext, taskDataContext } from "../context";

const UserForm = () => {
    const { setTaskData } = useContext(taskDataContext);

    const { refresh, setRefresh } = useContext(pageRefreshContext);

    const [userInfo, setUserInfo] = useState({ email: "", firstName: "", lastName: "" });
    const [userError, setUserError] = useState("")
    const [errorFiled, setErrorFiled] = useState({
        email: false,
        firstName: false,
        lastName: false,
    });
    function handleUserInfo(e) {
        let name = e.target.name
        let value = e.target.value

        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    }

    const errorMessage = {
        email: "email field is empty",
        firstName: "firstName field is empty",
        lastName: "LastName field is empty",
    };

    const validationCheck = (userInformation) => {

        let { email, firstName, lastName } = userInformation;

        let trimEmail = email.trim()
        let trimFirstName = firstName.trim()
        let trimLastName = lastName.trim()

        if (email && firstName && lastName) {
            handleCreateUser(userInformation);
            toast.success(`${firstName}Welcome to tasker`);
        }
        else {

            const updatedErrorFiled = {
                email: trimEmail.length === 0,
                firstName: trimFirstName.length === 0,
                lastName: trimLastName.length === 0,
            };

            setErrorFiled({
                ...errorFiled,
                ...updatedErrorFiled,
            });

            const errorMessages = Object.keys(updatedErrorFiled)
                .filter(field => updatedErrorFiled[field])
                .map(field => errorMessage[field])
                .join(", ");

            toast.error(`All Fields Are Required: ${errorMessages}`);
        }
    };

    async function handleCreateUser(info) {

        let postObj = { fullName: info.firstName + info.lastName, email: info.email };
        let url = `https://tasker-api-cojx.onrender.com/tasker_api/v1/create_user`;

        if (postObj.fullName && postObj.email) {
            try {
                let res = await axios.post(url, postObj);


                if (res.data.status === "success") {
                    let userInfo = {
                        fullName: res.data.fullName,
                        userId: res.data.userId,
                        userName: res.data.userName,
                    };

                    setTaskData((prevTaskData) => ({
                        ...prevTaskData,
                        userInfo: userInfo,
                        showUserModal: !prevTaskData.showUserModal
                    }));

                    setRefresh((prevRefresh) => ({
                        ...prevRefresh,
                        refresh: refresh + 1
                    }));

                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                }
            } catch (error) {
                setUserError(error.response.data.message);
            }
        }
    }

    function handelShowFrom(value) {
        setTaskData((prevTaskData) => ({
            ...prevTaskData,
            showUserModal: value,
        }));
    }


    return (
        <>
            <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#000000]">

                <div className="container lg:px-20 rounded-xl bg-[#281862] px-6 py-8 md:px-9 md:py-16 h-max w-max border-4 border-sky-500">

                    <form className="px-5">
                        <div className="mb-4 relative">

                            <input
                                type="email"
                                name="email"
                                className="w-full bg-gray-950 px-4 py-2 pr-10 rounded-lg text-white focus:outline-none"
                                placeholder="Email"
                                required
                                onChange={(e) => handleUserInfo(e)}
                            />
                            {errorFiled.email && <span className="text-red-600">{errorMessage.email}</span>}
                            {userError && <p className="text-red-600"> <small>Email already used</small></p>}
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                name="firstName"
                                className="w-full bg-gray-950 px-4 py-2 pr-10 rounded-lg text-white focus:outline-none"
                                placeholder="First Name"
                                required
                                onChange={(e) => handleUserInfo(e)}
                            />
                            {errorFiled.firstName && <span className="text-red-600">{errorMessage.firstName}</span>}
                        </div>

                        <div className=" mb-4">
                            <input
                                type="text"
                                name="lastName"
                                className="w-full bg-gray-950 px-4 py-2 pr-10 rounded-lg text-white focus:outline-none"
                                placeholder="Last Name"
                                required
                                onChange={(e) => handleUserInfo(e)}
                            />
                            {errorFiled.lastName && <span className="text-red-600">{errorMessage.lastName}</span>}
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 p-1 rounded-lg text-white md:right-4"
                                onClick={(e) => {
                                    e.preventDefault();
                                    validationCheck(userInfo)
                                }}
                            >
                                <img src={svg} alt="" className="mr-2" />
                                Submit
                            </button>
                            <button
                                type="submit"
                                className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handelShowFrom(false)
                                }}
                            >
                                close
                            </button>
                        </div>
                    </form>
                </div >
            </section >
        </>
    );
};

export default UserForm;
