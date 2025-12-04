import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase/firebaseConfig";
import { setCurrentUser } from "../../../store/authSlice";


export default function Auth() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User: ", user)
      dispatch(setCurrentUser(user))
    })
    return unsubscribe
  }, [dispatch])

  return null
}