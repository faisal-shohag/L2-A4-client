import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/NavBar";
import { Toaster } from "react-hot-toast";

import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div>
        <Toaster/>
            <Navbar/>
        <div className="container mx-auto mt-5 px-2">
                <Outlet/>
        </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;