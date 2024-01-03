import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { FaWifi } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { LuMonitorCheck } from "react-icons/lu";
import { MdOutlinePets } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";

export default function Places() {
    const {action} = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);

    async function addPhotoByLink(e) {
        e.preventDefault();
        const {data:fileName} = await axios.post("/uploadFromLink", {link: photoLink});
        setAddedPhotos(prev => {
            return [...prev, fileName];
        });
        setPhotoLink("");
    }

    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for(let i=0; i<files.length; i++) {
            data.append("photos", files[i]);
        }

        axios.post("/upload", data, {
            headers: {"Content-type": "multipart/form-data"}
        }).then(res => {
            const {data:fileName} = res;
            setAddedPhotos(prev => {
                return [...prev, ...fileName]; 
            });
        });
    }

    function handleCheckBox(e) {
        const {checked, name} = e.target;
        if(checked) {
            setPerks(prev => {
                return [...prev, name];
            });
        }else {
            setPerks(prev => {
                return [...prev.filter(inst => inst !== name)];
            });
        }
    }

    return (
    <>
        {action !== 'new' && (
            <div className="flex items-center justify-center">
                <div className="w-max flex-col text-center gap-2 text-xs sm:text-base xl:text-lg">
                    <Link to={'/account/places/new'} className="bg-primary text-white px-4 rounded-full py-2 flex items-center justify-center gap-1">
                        <FaPlus />Add new place
                    </Link>
                    <div>YoJI</div>
                </div>
            </div>
        )}
        {action === "new" && (
           <div className="flex items-center justify-center w-full">
                <form className="gap-3 w-[90%]">
                    <h2 className="text-2xl font-semibold">Title</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Give your place a unique title that highlights its charm and stands out to guests.</p>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="placeholder:px-3 mt-2" type="text" placeholder="Title, for example: My lovely apartment" />

                    <h2 className="text-2xl font-semibold">Address</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Provide the exact address of your place to help guests plan their journey.</p>
                    <input value={address} onChange={e => setAddress(e.target.value)} className="placeholder:px-3 mt-2" type="text" placeholder="Address" />

                    <h2 className="text-2xl font-semibold">Photos</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Upload high-quality photos to give guests a clear view of your place. The more photos, the better.</p>
                    <div className="flex items-center gap-2 mt-2 p-1">
                        <input value={photoLink} onChange={e => setPhotoLink(e.target.value)} type="text" className="placeholder:px-3" placeholder={"Add using a link....jpg"}/>
                        <button onClick={(e) => addPhotoByLink(e)} className="bg-primary rounded-3xl text-white font-semibold px-4 py-2 mb-4">Add&nbsp;Photo</button>
                    </div>
                    <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mb-4">
                        {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                            <div key={index} className="h-32 flex">
                                <img className="rounded-2xl object-cover h-full w-full" src={"http://localhost:3000/uploads/" + link} alt=""/>
                            </div>
                        ))}
                        <label className="flex items-center cursor-pointer gap-2 justify-center border-2 bg-transparent p-8 rounded-2xl h-32">
                            <input multiple type="file" className={"hidden"} accept="image/*" onChange={uploadPhoto}/>
                            <FiUpload size={"26px"} />
                            <p>Upload</p>
                        </label>
                    </div>

                    <h2 className="text-2xl font-semibold mt-4">Description</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Describe the unique features, amenities, and atmosphere of your place. Make it inviting for potential guests.</p>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" cols="50" className="p-2 mt-4 border-gray-500 border-2 rounded-xl w-full" placeholder="Enter your text hear..." />

                    <h2 className="text-2xl font-semibold mt-4">Perks</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Select all the perks of your place</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 text-base font-semibold">
                        <label className="flex gap-2 p-6 border-2 rounded-2xl items-center justify-center cursor-pointer">
                            <input type="checkbox" name="wifi" onChange={handleCheckBox}/>
                            <FaWifi />
                            <span>Wi-fi</span>
                        </label>
                        <label className="flex gap-2 p-6 border-2 rounded-2xl items-center justify-center cursor-pointer">
                            <input type="checkbox"name="parking" onChange={handleCheckBox}/>
                            <FaCar />
                            <span>Parking</span>
                        </label>
                        <label className="flex gap-2 p-6 border-2 rounded-2xl items-center justify-center cursor-pointer">
                            <input type="checkbox" name="tv" onChange={handleCheckBox}/>
                            <LuMonitorCheck />
                            <span>TV</span>
                        </label>
                        <label className="flex gap-2 p-6 border-2 rounded-2xl items-center justify-center cursor-pointer">
                            <input type="checkbox" name="games" onChange={handleCheckBox}/> 
                            <IoGameController />
                            <span>Games</span>
                        </label>
                        <label className="flex gap-2 p-6 border-2 rounded-2xl items-center justify-center cursor-pointer">
                            <input type="checkbox" name="pets" onChange={handleCheckBox}/>
                            <MdOutlinePets />
                            <span>Pets</span>
                        </label>
                        <label className="flex gap-2 p-6 border-2 rounded-2xl items-center justify-center cursor-pointer">
                             <input type="checkbox" name="privateEntrance" onChange={handleCheckBox}/> 
                             <FaArrowRightToBracket/>
                            <span>Private entrance</span>
                        </label>
                    </div>

                    <h2 className="text-2xl font-semibold mt-4">Extra info</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Specify your house rules, check-in/check-out times, and any additional information that guests should be aware of.</p>
                    <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} rows="4" cols="50" className="p-2 mt-4 border-gray-500 border-2 rounded-xl w-full" placeholder="Enter your text hear..." />

                    <h2 className="text-2xl font-semibold mt-4">Check in & out times, max guests</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Add in and out times, remember to have some time window for cleaning the rooms between guests.</p>
                    <div className="mt-2 grid sm:grid-cols-3 gap-1 md:gap-3">
                      <div>
                        <h3 className="font-semibold text-lg text-center">Check in time</h3>
                        <input value={checkIn} onChange={e => setCheckIn(e.target.value)} type="text" placeholder="e.g., After 2 PM"/>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-center">Check out time</h3>
                        <input value={checkOut} onChange={e => setCheckOut(e.target.value)} type="text" placeholder="e.g., Before 11 AM"/>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-center">Max guests</h3>
                        <input value={maxGuests} onChange={e => setMaxGuests(e.target.value)} type="number" placeholder="e.g., 4" />
                      </div>
                    </div>
                    <div className="w-[90%] mx-auto">
                        <button className="primary my-2">Save</button>
                    </div>
                </form>
           </div>
        )}
    </>
    );
}
