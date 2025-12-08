import { useState } from "react";
import { uploadProfilePhoto } from "../../../../firebase/profileHelpers";
import { useAuth, useProfilePicture } from "../../../../hooks"
import Spinner from "../Spinner/Spinner";
import "./ImageUploader.css";


export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth()
  const [ photo, photoLoading] = useProfilePicture(user.uid)
  // console.log(photo)
  const handleUpload = async (e) => {
    let file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const worker = new Worker(new URL("../../../../workers/imageCompressor.worker.js", import.meta.url), { type: "module" })
    worker.postMessage(file)
    worker.onmessage = async (e) => {
      const compressedFile = e.data
      worker.terminate()

    try {
      await uploadProfilePhoto(compressedFile)
    } catch (err) {
      console.log(err)
    } finally {
      setUploading(false)
    }
  }
  };

  if (uploading || photoLoading) {
    return (
      <div className="image-container">
        Loading
      </div>
    )
  }

  return (
    <div className="image-container">
      {photo && (
        <img src={photo} alt="image preview" className="image-preview" />
      )}
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="image-input"
        onChange={handleUpload}
      />
    </div>
  );
}
