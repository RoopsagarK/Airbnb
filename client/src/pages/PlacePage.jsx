import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { LuGalleryVertical } from "react-icons/lu";
import { useMediaQuery } from 'react-responsive';

export default function PlacePage() {
    const {id} = useParams();
    const [placeData, setPlaceData] = useState({});
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
        
    return (
    <div className="px-12 py-4">
            <h1 className="text-2xl font-semibold">{placeData.title}</h1>
            <a target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=${placeData.address}`} className="flex items-center cursor-pointer my-2 font-bold underline"><IoLocationSharp  />{placeData.address}</a>
        <div className="relative">
            <div className="grid grid-cols-[2fr_1fr]  lg:grid-cols-[2fr_1fr_1fr] gap-2">
                <div className="flex max-h-72">
                    {placeData.photos?.[0] && (
                        <img className="object-cover grow rounded-tl-2xl rounded-bl-2xl cursor-pointer" src={`http://localhost:3000/uploads/${placeData.photos[0]}`} alt="" />
                        )
                    }
                </div>
                <div className="grid grid-rows-2 gap-2 max-h-72">
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
                <div className="grid grid-rows-2 gap-2 max-h-72">
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
            </div>
            <button className="flex items-center px-2 bg-white font-medium border-2 border-black py-1 rounded-md gap-2 absolute bottom-0 right-0 m-4 hover:bg-gray-100"><LuGalleryVertical />Show all photos</button>
        </div>
    </div>
    )
}
