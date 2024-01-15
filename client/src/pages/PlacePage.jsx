import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { LuGalleryVertical } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive';
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
    const {id} = useParams();
    const [placeData, setPlaceData] = useState({});
    const [userData, setUserData] = useState({});
    const [showAllPhotos, setShowAllPhotos] = useState(false);
        useEffect(() => {
            if(!id) {
                return;
            }
            axios.get(`/places/${id}`)
            .then(res => {
                setPlaceData(res.data);
                return axios.get(`/user/${res.data.owner}`);
            })
            .then(res => {
                setUserData(res.data);
            })
            .catch(err => console.error(err));

        }, [id]);
    const isLarger = useMediaQuery({ query: '(min-width: 1024px)' });
    const isPhoneView = useMediaQuery({ query: '(max-width: 767px)'});

    if(showAllPhotos) {
        return (
            <div className="fixed bg-black inset-0 bg-opacity-95 min-h-screen overflow-auto">
                <button onClick={() => setShowAllPhotos(false)} className="flex bg-transparent text-white cursor-pointer font-medium items-center gap-2 rounded-md px-2 py-1 fixed right-0 m-5 transition-transform ease-in-out hover:scale-110">
                    <GrClose size={'23px'} /> 
                    {!isPhoneView && (
                        <p className="text-sm md:text-base lg:text-xl">Close photos</p>
                    )}
                </button>
                <div className="grid gap-1 w-full place-items-center mt-6">
                    {placeData?.photos?.length > 0 && ( 
                        placeData.photos.map((photo, index) => (
                            <div key={index} className="flex max-w-[65%] xl:max-w-[700px] justify-center m-2">
                                <img className="object-cover grow" src={"http://localhost:3000/uploads/" + photo} alt={photo} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
        
    return (
    <div className="px-12 py-4">
            <h1 className="text-2xl font-semibold">{placeData.title}</h1>
            <a target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=${placeData.address}`} className="flex items-center cursor-pointer my-2 font-bold underline"><IoLocationSharp  />{placeData.address}</a>
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr] gap-2">
                <div className="flex max-h-72 md:max-h-[55vh] lg:max-h-[60vh]">
                    {placeData.photos?.[0] && (
                        <img className="object-cover grow rounded-2xl md:rounded-tr-none md:rounded-br-none cursor-pointer" src={`http://localhost:3000/uploads/${placeData.photos[0]}`} alt="" />
                        )
                    }
                </div>
                {!isPhoneView && (
                    <>
                        <div className="grid grid-rows-2 gap-2 max-h-72 md:max-h-[55vh] lg:max-h-[60vh]">
                            <div className="flex">
                                {placeData.photos?.[1] && (
                                    <img className="object-cover grow cursor-pointer" src={`http://localhost:3000/uploads/${placeData.photos[1]}`} alt="" />
                                    )
                                }
                            </div>
                            <div className="flex">
                                {placeData.photos?.[2] && (
                                    <img className="object-cover grow cursor-pointer" src={`http://localhost:3000/uploads/${placeData.photos[2]}`} alt="" />
                                    )
                                }
                            </div>
                        </div>
                        <div className="grid grid-rows-2 gap-2 max-h-72 md:max-h-[55vh] lg:max-h-[60vh]">
                            {isLarger && (
                                <>
                                  <div className="flex">
                                    {placeData.photos?.[3] && (
                                      <img className="object-cover grow rounded-tr-2xl cursor-pointer" src={`http://localhost:3000/uploads/${placeData.photos[3]}`} alt="" />
                                    )}
                                  </div>
                                  <div className="flex">
                                    {placeData.photos?.[4] && (
                                      <img className="object-cover grow rounded-br-2xl cursor-pointer" src={`http://localhost:3000/uploads/${placeData.photos[4]}`} alt="" />
                                    )}
                                  </div>
                                </>
                            )}
                        </div>
                    </>
            )}
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex items-center px-2 bg-white font-medium border-2 border-black py-1 rounded-md gap-2 absolute bottom-0 right-0 m-4 hover:bg-gray-100"><LuGalleryVertical />Show all photos</button>
        </div>
    
        <div className="grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[2fr_1.25fr] gap-6 mt-4">
            <div className="grid">
                <div className="my-4">
                    <h1 className="font-bold text-2xl">About this space</h1>
                    <p className="mt-2 text-wrap text-justify">{placeData.description}</p>
                </div>
                <hr />
                <div className="flex items-center">
                    <FaUserCircle size={'40px'}/>
                    <div className="my-4">
                        <p className="font-bold px-4">Hosted by {userData.name}</p>
                        <p className="px-4">{userData.email}</p>
                    </div>
                </div>
                 <hr />
                <div>
                    <div className="flex flex-col justify-center h-full p-4">
                        <p><span className="font-semibold uppercase">Check-in:</span> {placeData.checkin}</p>
                        <p><span className="font-semibold uppercase">Check-out:</span> {placeData.checkout}</p>
                        <p><span className="font-semibold uppercase">Maximum number of guests:</span> {placeData.maxguests}</p>
                    </div>
                </div>
            </div>
            <div>
                <BookingWidget placeData={placeData} />
            </div>
        </div>
        <h2 className="font-bold text-2xl mt-6">Other things to know</h2>
        <pre className="mt-2 text-wrap text-justify font-sans">{placeData.extrainfo}</pre>
    </div>
    )
}
