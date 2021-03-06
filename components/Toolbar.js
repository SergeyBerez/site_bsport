import React from 'react';
import Image from 'next/image';
import filter from '../public/static/img/filter_filters_icon.svg';
import { useGoodsContext } from '../context/contextGoods';
export default function Toolbar(props) {
  const { dispatch } = useGoodsContext();
  const handelSortGoods = (e) => {
    const value = e.target.value;

    if (value === 'priceLow') {
      const copyGood = props.state.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.price - b.price;
      });
      dispatch({ type: props.type, payload: [...sortGood] });
    }
    if (value === 'priceHigh') {
      const copyGood = props.state.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.price - a.price;
      });
      dispatch({ type: props.type, payload: [...sortGood] });
    }
    if (value === 'dataNew') {
      const copyGood = props.state.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.time.seconds - a.time.seconds;
      });
      dispatch({ type: props.type, payload: [...sortGood] });
    }
    if (value === 'dataOld') {
      const copyGood = props.state.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.time.seconds - b.time.seconds;
      });
      dispatch({ type: props.type, payload: [...sortGood] });
    }
  };

  return (
    <div className="toolbar-sorter sorter">
      <label className="sorter-label" forhtml="sorter">
        {/* <Image src={filter} width={20} height={20} alt="cart"></Image> фiльтр */}
      </label>{' '}
      <select id="sorter" data-role="sorter" onChange={handelSortGoods} className="sorter-options">
        <option value="position" defaultValue="">
          не сортовано
        </option>
        <option value="nameHight">имя а-я</option>
        <option value="nameLow">имя я-а</option>
        <option value="priceHigh">цiна:више-нижче </option>
        <option value="priceLow">цiна:нижче-вище </option>
        <option value="dataNew">спочатку новi</option>
        <option value="dataOld">спочатку стaрi</option>
      </select>
      <style jsx>{`
        .toolbar-sorter {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
        }
        .sorter-label {
          display: flex;
          align-items: center;
          font-size: 1.2rem;
          color: #6f6f6f;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .sorter-options {
          /* border-color: #ccc; */
          text-align: center;

          border: none;
          outline: none;
          font-size: 1rem;
          letter-spacing: 1px;

          text-transform: uppercase;
        }
        select {
          background-color: #fff;
          box-shadow: none;
          height: 35px;
        }
      `}</style>
    </div>
  );
}
