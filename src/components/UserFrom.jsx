import axios from "axios";
import { useContext, useState } from "react";
import svg from "../assets/submit.svg";
import { pageRefreshContext, taskDataContext } from "../context";

const UserForm = () => {
    const { setTaskData } = useContext(taskDataContext);
    const { refresh, setRefresh } = useContext(pageRefreshContext);

    const [userInfo, setUserInfo] = useState({ email: "", firstName: "", lastName: "" });
    const [userError, setUserError] = useState("")
    function handleUserInfo(e) {
        let name = e.target.name
        let value = e.target.value

        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    }

    async function handleCreateUser(e, info) {
        e.preventDefault();

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



    return (
        <>
            <section className="pb-[114px] pt-20 md:mt-[100px]">
                <div className="container lg:px-20 rounded-xl border border-[rgba(206,206,206,0.12)] px-6 py-8 md:px-9 md:py-16 bg-[#18244315]">
                    <form className="px-5">
                        <div className="mb-4 relative">
                            {/* <label htmlFor="title">Email</label> */}
                            <input
                                type="email"
                                name="email"
                                className="w-full bg-gray-800 px-4 py-2 pr-10 rounded-lg text-white focus:outline-none"
                                placeholder="Email"
                                required
                                onChange={(e) => handleUserInfo(e)}
                            />
                            {userError && <p className="text-red-600"> <small>Email already used</small></p>}
                        </div>

                        <div className="mb-4">
                            {/* <label htmlFor="title">First Name</label> */}
                            <input
                                type="text"
                                name="firstName"
                                className="w-full bg-gray-800 px-4 py-2 pr-10 rounded-lg text-white focus:outline-none"
                                placeholder="First Name"
                                required
                                onChange={(e) => handleUserInfo(e)}
                            />
                        </div>

                        <div className=" mb-4">
                            {/* <label htmlFor="title">Last Name</label> */}
                            <input
                                type="text"
                                name="lastName"
                                className="w-full bg-gray-800 px-4 py-2 pr-10 rounded-lg text-white focus:outline-none"
                                placeholder="Last Name"
                                required
                                onChange={(e) => handleUserInfo(e)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg text-white md:right-4"
                            onClick={(e) => handleCreateUser(e, userInfo)}
                        >
                            <img src={svg} alt="" className="mr-2" />
                            Submit
                        </button>
                    </form>
                </div>
            </section >
        </>
    );
};

export default UserForm;
