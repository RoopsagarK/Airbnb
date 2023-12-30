import { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaList } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function AccountPage() {
    let { subPage } = useParams();
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    if (subPage == undefined) {
        subPage = "profile";
    }

    if (!ready) {
        return "Loading...";
    }

    async function handleLogout() {
        await axios.post("/logout");
        setRedirect("/");
        setUser(null);
    }

    const Profile = () => {
        return (
            <div className="flex items-center justify-center p-4 gap-3 w-full">
                <div className="w-max flex-col text-center gap-2 text-xs sm:text-base xl:text-lg">
                    <p className="font-semibold">Logged in as { user?.name } ({ user?.email })</p><br />
                    <button onClick={ handleLogout } className="primary max-w-sm">Logout</button>
                </div>  
            </div>
        );
    }

    const Bookings = () => {
        return <div>Bookings</div>
    }

    const Places = () => {
        return <div>Places</div>
    }

    function linkClasses(type = null) {
        let classes = "flex text-xs sm:text-base xl:text-lg items-center justify-around gap-2 bg-gray-300 rounded-full px-4 py-2 h-10 text-center"
        if (type == subPage) {
            classes = "flex text-xs sm:text-base xl:text-lg items-center justify-around gap-2 rounded-full px-4 py-2 h-10 bg-primary text-white text-center";
        }
        return classes;
    }
    
    if(redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="w-full">
            <nav className="flex flex-row items-center justify-evenly p-5 gap-1 mx-auto mb-3">
                <Link to={ "/account" } className={ linkClasses("profile") }>
                    <CgProfile size="20px" />
                    <p className="font-semibold">My profile</p>
                </Link>
                <Link to={ "/account/bookings" } className={ linkClasses("bookings") }>
                    <FaList />
                    <p className="font-semibold">My bookings</p>
                </Link>
                <Link to={ "/account/places" } className={ linkClasses("places") }                                                              >
                    <FaHotel />
                    <p className="font-semibold">My accommodations</p>
                </Link>
            </nav>
            { (subPage === "profile") && <Profile /> }
            { (subPage === "bookings") && <Bookings /> }
            { (subPage === "places") && <Places /> }
        </div>
    );
}