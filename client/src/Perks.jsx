import { FaWifi } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { LuMonitorCheck } from "react-icons/lu";
import { MdOutlinePets } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";

export default function Perks({perks, setPerks}) {
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

  )
}
