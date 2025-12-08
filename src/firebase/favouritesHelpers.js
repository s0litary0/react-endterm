import { firestore } from "./firebaseConfig"
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot} from "firebase/firestore"


export const loadUserFavourites = async (uid) => {
  const docRef = doc(firestore, "users", uid)
  const docSnap = await getDoc(docRef)
  return docSnap?.data().favourites || [] 
}

export const addUserFavourite = async (uid, itemId) => {
  const docRef = doc(firestore, "users", uid)
  await updateDoc(docRef, { favourites: arrayUnion(itemId) })
}

export const removeUserFavourite = async (uid, itemId) => {
  const docRef = doc(firestore, "users", uid)
  await updateDoc(docRef, { favourites: arrayRemove(itemId) })  
}

export const mergeFavourites = async (uid, localFavourites) => {
  const docRef = doc(firestore, "users", uid)
  const docSnap = await getDoc(docRef)
  const serverFavourites = docSnap.exists() ? docSnap.data().favourites || [] : []
  const merged = Array.from(new Set([...serverFavourites, ...localFavourites]))
  await setDoc(docRef, { favourites: merged }, { merge: true })
  return merged
}

export const onFavouritesChange = (uid, callback) => {
  const docRef = doc(firestore, "users", uid)

  return onSnapshot(docRef, (docSnap) => {
    const data = docSnap.data()

    callback(data?.favourites || [])
  })
}