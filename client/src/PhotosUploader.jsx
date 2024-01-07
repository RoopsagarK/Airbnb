import axios from "axios";
import { FiUpload } from "react-icons/fi";


export default function PhotosUploader({photoLink, setPhotoLink, addedPhotos, setAddedPhotos}) {

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
  return (
    <div>
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
    </div>
  )
}
