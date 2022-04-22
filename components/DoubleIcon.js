import React from 'react';
import Image from 'next/image';
import square from '../public/static/img/351984_crop_square_icon.svg';
import menu from '../public/static/img/4243313_ux_basic_app_menu_icon.svg';
const Doubleicon = ({ showOneGood, showTwoGood }) => {
  return (
    <div className="toogle-icon">
      {' '}
      <div className="icon-show-one">
        {' '}
        <Image onClick={showOneGood} src={square} width={30} height={30} alt="product"></Image>
      </div>
      <div className="icon-show-two">
        <Image onClick={showTwoGood} src={menu} width={20} height={20} alt="product"></Image>
      </div>
    </div>
  );
};

export default Doubleicon;
