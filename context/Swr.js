import useSWR from 'swr';
export default function Swr() {
  const getGoods = async (params) => {
    const docRef = collection(db, params);
    const querySnapshot = await getDocs(docRef);
    const goodList = querySnapshot.docs.map((doc) => doc.data());
    console.log(goodList);
    return goodList;
  };
  const { data, error } = useSWR('pants', getGoods);
  console.log(data);
  return {
    Fetchgoods: data,
    isLoading: !error && !data,
    isError: error,
  };
}
