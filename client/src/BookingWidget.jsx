import { useState } from "react";
import {differenceInCalendarDays} from "date-fns";

export default function BookingWidget({placeData}) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState(0);
    let numberOfDays = 0;
    let priceForTheDays = 0;

    if(checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
        priceForTheDays = numberOfDays * placeData.prize;
    }
  return (
    <div className="bg-white p-4 rounded-2xl shadow-xl border-[1px]">
                    <p className="text-xl font-semibold">Price: &#8377;{(priceForTheDays && numberOfDays) ? <span>{priceForTheDays} for {numberOfDays} days</span> : (placeData.prize + "/night")}</p>
                    <div className="grid my-4 border-[2px] rounded-2xl">
                        <div className="grid grid-cols-2 border-b-[2px] border-gray-300 py-2 px-4">
                            <div className="border-r-[2px] border-gray-300">
                                <label className="font-semibold uppercase text-sm" htmlFor="dateCheckIn">Check-in:</label><br/>
                                <input type="date" name="dateCheckIn" value={checkIn} onChange={e => setCheckIn(e.target.value)} id="date" />
                            </div>
                            <div className="pl-4">
                                <label className="font-semibold uppercase text-sm" htmlFor="dateCheckOut">Check-out:</label><br />
                                <input type="date" name="dateCheckOut" value={checkOut} onChange={e => setCheckOut(e.target.value)} id="date" />
                            </div>
                        </div>
                        <div className="p-2">
                            <label className="font-semibold uppercase text-sm" htmlFor="guests">number of guests</label>
                            <input className="mt-2" value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} type="text" name="guests" placeholder="e.g, 1" />
                        </div>  
                    </div>
                    {numberOfDays > 0 && (
                        <>
                            <hr />
                            <div className="mt-2">
                                <label className="font-semibold uppercase text-sm" htmlFor="name">your name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)} placeholder="John Doe"/>
                                    
                                <label className="font-semibold uppercase text-sm" htmlFor="conatactNumber">conatact number</label>
                                <input className="mt-2" 
                                    value={contactNumber} 
                                    onChange={e => setContactNumber(e.target.value)} 
                                    type="text" name="contactNumber" 
                                    placeholder="+91 xxxxxxxxxx" />
                            </div>
                        </>
                    )}
                    <button className="bg-gradient-to-r from-red-500 to-pink-500 w-full rounded-md my-2 p-2 text-white">
                        Book this place 
                        {numberOfDays && (
                            <>
                                <span className="p-2">{numberOfDays + " for days"}</span>
                            </>
                        )}
                    </button>
                </div>
  )
}
