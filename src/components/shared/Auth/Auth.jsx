import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth, firestore } from "../../../firebase/firebaseConfig";
import { setCurrentUser } from "../../../store/authSlice";
import { doc, setDoc, getDoc } from "firebase/firestore"


export default function Auth() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("User: ", user)

      if (!user) {
        dispatch(setCurrentUser(null))
        return; 
      }

      const docRef = doc(firestore, "users", user.uid)
      const snap = await getDoc(docRef)
    
      if (!snap.exists()) {
        await setDoc(docRef, {
          email: user.email,
          favourites: [],
          photoBase64: "",
        })
      }

      dispatch(setCurrentUser(user))
    })
    return unsubscribe
  }, [dispatch])

  return null
}