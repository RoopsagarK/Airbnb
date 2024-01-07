import { FaPlus } from "react-icons/fa6";
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import axios from "axios";

export default function Places() {
    const {action} = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [photoLink, setPhotoLink] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    let [redirect, setRedirect] = useState("");
    if(redirect) {
        <Navigate to={redirect}/>
    }
    async function addNewPlace(e) {
        e.preventDefault();
        try {
            await axios.post("/places", {
                title, address, addedPhotos, 
                description, perks, extraInfo, 
                checkIn, checkOut, maxGuests,
            });
        }catch(err) {
            console.error(err, "failed to add new place!!");
        }
    
        setRedirect("/account/places");
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
                <form className="gap-3 w-[90%]" onSubmit={addNewPlace}>
                    <h2 className="text-2xl font-semibold">Title</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Give your place a unique title that highlights its charm and stands out to guests.</p>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="placeholder:px-3 mt-2" type="text" placeholder="Title, for example: My lovely apartment" />

                    <h2 className="text-2xl font-semibold">Address</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Provide the exact address of your place to help guests plan their journey.</p>
                    <input value={address} onChange={e => setAddress(e.target.value)} className="placeholder:px-3 mt-2" type="text" placeholder="Address" />

                    <h2 className="text-2xl font-semibold">Photos</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Upload high-quality photos to give guests a clear view of your place. The more photos, the better.</p>
                    <PhotosUploader photoLink={photoLink} setPhotoLink={setPhotoLink} addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos}/>  

                    <h2 className="text-2xl font-semibold mt-4">Description</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Describe the unique features, amenities, and atmosphere of your place. Make it inviting for potential guests.</p>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" cols="50" className="p-2 mt-4 border-gray-500 border-2 rounded-xl w-full" placeholder="Enter your text hear..." />

                    <h2 className="text-2xl font-semibold mt-4">Perks</h2>
                    <p className="text-gray-500 text-sm md:text-base font-semibold">Select all the perks of your place</p>
                    <Perks perks={perks} setPerks={setPerks}/>

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
