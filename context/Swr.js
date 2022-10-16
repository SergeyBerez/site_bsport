import useSWR from "swr";
import { db } from "./firebaseAuthContext";
import { collection, getDocs } from "firebase/firestore/lite";

export default function getGoods() {
  const getGoods = async (params) => {
    const docRef = collection(db, params);
    const querySnapshot = await getDocs(docRef);
    const goodList = querySnapshot.docs.map((doc) => doc.data());

    return goodList;
  };
  const { data, isValidating, error } = useSWR("pants", getGoods);

  return {
    data,
    isValidating,
  };
}
