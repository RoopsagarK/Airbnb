import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { LuGalleryVertical } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { useMediaQuery } from 'react-responsive';

export default function PlacePage() {
    const {id} = useParams();
    const [placeData, setPlaceData] = useState({});
    const [showAllPhotos, setShowAllPhotos] = useState(false);
        useEffect(() => {
                if(!id) {
                    return;
                }
                axios.get(`/places/${id}`)
                .then(res => setPlaceData(res.data))
                .catch(err => console.error(err));
        }, [id])
        console.log(placeData);
    const isLarger = useMediaQuery({ query: '(min-width: 1024px)' });
    const isPhoneView = useMediaQuery({ query: '(max-width: 767px)'});

    if(showAllPhotos) {
        return (
            <div className="absolute bg-black bg-opacity-95 w-full min-h-auto">
                <button onClick={() => setShowAllPhotos(false)} className="flex bg-transparent text-white text-xl cursor-pointer font-medium items-center gap-2 rounded-md px-2 py-1 fixed right-0 m-5 z-20 transition-transform ease-in-out hover:scale-110"><GrClose /> {!isPhoneView && (
                    <p>Close photos</p>
                )}</button>
                <div className="grid gap-1 w-full place-items-center mt-6">
                    {placeData?.photos?.length > 0 && ( 
                        placeData.photos.map((photo, index) => (
                            <div key={index} className="flex max-w-[65%] justify-center m-2">
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
        <div className="my-4">
            <h1 className="font-bold text-2xl">Description</h1>
            <p className="mt-2">{placeData.description}</p>
        </div>
    </div>
    )
}
