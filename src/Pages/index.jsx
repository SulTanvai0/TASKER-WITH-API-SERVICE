import { useContext } from "react";
import { Toaster } from 'react-hot-toast';
import UserForm from "../components/UserFrom";
import { taskDataContext } from "../context";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TaskBoard from "./TaskBoard";
const Page = () => {
    const { taskData } = useContext(taskDataContext);

    return (
        <>

            <Header />
            <div className="flex flex-col justify-center items-center">
                {taskData?.showUserModal && <UserForm />}
                <HeroSection />
                <TaskBoard />
            </div>
            <Footer />
            <Toaster />
        </>
    );
};

export default Page;
