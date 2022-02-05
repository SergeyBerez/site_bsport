// import { useEffect, useState } from 'react';
// import MainLayout from '../../components/MainLayout';
// import Head from 'next/head';
// import Card from '../../components/Card';
// import { Spinner } from '../../components/Spinner';
// import { db } from '../../context/firebaseContext';
// import { collection, getDocs } from 'firebase/firestore/lite';
// export default function Shorts({ goodList }) {
//   const goodClient = JSON.parse(goodList);

//   const [loading, setLoading] = useState(true);

//   const [goods, setGood] = useState(goodClient);

//   useEffect(() => {
//     setLoading(false);
//   }, []);
//   const handlerFilterGoods = (e) => {
//     const value = e.target.value;

//     if (value === 'priceLow') {
//       const copyGood = goods.slice();
//       let sortGood = copyGood.sort((a, b) => {
//         return a.price - b.price;
//       });
//       console.log(sortGood);
//       setGood(sortGood);
//     }
//     if (value === 'priceHigh') {
//       const copyGood = goods.slice();
//       let sortGood = copyGood.sort((a, b) => {
//         return b.price - a.price;
//       });
//       console.log(sortGood);
//       setGood(sortGood);
//     }
//     if (value === 'dataNew') {
//       const copyGood = goods.slice();
//       let sortGood = copyGood.sort((a, b) => {
//         return b.time.seconds - a.time.seconds;
//       });
//       console.log(sortGood);
//       setGood(sortGood);
//     }
//     if (value === 'dataOld') {
//       const copyGood = goods.slice();
//       let sortGood = copyGood.sort((a, b) => {
//         return a.time.seconds - b.time.seconds;
//       });
//       console.log(sortGood);
//       setGood(sortGood);
//     }
//   };
//   return (
//     <MainLayout>
//       <Head>
//         {' '}
//         <title>футболки</title>
//         <meta name="description" content="Generated by create next app" />
//       </Head>

//       {loading ? (
//         <Spinner></Spinner>
//       ) : (
//         <>
//           <h2 className="title-product-block">футболки</h2>
//           <div className="toolbar toolbar-products">
//             <div className="toolbar-sorter sorter">
//               <label className="sorter-label" forhtml="sorter">
//                 сортувати
//               </label>{' '}
//               <select
//                 id="sorter"
//                 data-role="sorter"
//                 onChange={handlerFilterGoods}
//                 className="sorter-options">
//                 <option value="position" defaultValue="">
//                   не сортовано
//                 </option>
//                 <option value="nameHight">имя а-я</option>
//                 <option value="nameLow">имя я-а</option>
//                 <option value="priceHigh">цена више </option>
//                 <option value="priceLow">цена ниже </option>
//                 <option value="dataNew">по датi новi</option>
//                 <option value="dataOld">по датi стaрi</option>
//               </select>
//             </div>
//           </div>
//           {goods.map((good) => {
//             return (
//               <Card
//                 description={good.description}
//                 id={good.id}
//                 key={good.id}
//                 title={good.title}
//                 price={good.price}
//                 url={good.url}></Card>
//             );
//           })}
//         </>
//       )}
//     </MainLayout>
//   );
// }
// export async function getStaticProps(context) {
//   const id = context.params;
//   console.log(context);
//   const docRef = collection(db, 'shorts');
//   const querySnapshot = await getDocs(docRef);
//   const goodList = querySnapshot.docs.map((doc) => doc.data());

//   return {
//     props: { goodList: JSON.stringify(goodList) || null },
//   };
// }
