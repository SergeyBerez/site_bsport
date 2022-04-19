import React from 'react';

export default function Toolbar(props) {
  const handelSortGoods = (e) => {
    const value = e.target.value;

    if (value === 'priceLow') {
      const copyGood = state.pants.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.price - b.price;
      });
      dispatch({ type: 'ADD PANTS', payload: [...sortGood] });
    }
    if (value === 'priceHigh') {
      const copyGood = state.pants.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.price - a.price;
      });
      dispatch({ type: 'ADD PANTS', payload: [...sortGood] });
    }
    if (value === 'dataNew') {
      const copyGood = state.pants.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.time.seconds - a.time.seconds;
      });
      dispatch({ type: 'ADD PANTS', payload: [...sortGood] });
    }
    if (value === 'dataOld') {
      const copyGood = state.pants.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.time.seconds - b.time.seconds;
      });
      dispatch({ type: 'ADD PANTS', payload: [...sortGood] });
    }
  };

  return (
    <div className="toolbar-sorter sorter">
      <label className="sorter-label" forhtml="sorter">
        сортувати
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
    </div>
  );
}
