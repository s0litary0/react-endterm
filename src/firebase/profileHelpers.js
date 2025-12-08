import { firestore, auth } from "./firebaseConfig"
import { doc, setDoc } from "firebase/firestore";
import { fileToBase64 } from "../helpers/index"


async function uploadProfilePhoto(file) {
  const base64 = await fileToBase64(file);
  const user = auth.currentUser;
  console.log(user)

  await setDoc(doc(firestore, "users", user.uid), {
    photoBase64: base64
  }, { merge: true });

  console.log("Photo saved in Firestore");
}

export { uploadProfilePhoto }