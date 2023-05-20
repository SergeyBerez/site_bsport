import React from "react";
import Image from "next/image";
import square from "../public/static/img/351984_crop_square_icon.svg";
import menu from "../public/static/img/7787586_menu_navigation_direction_arrow_location_icon.svg";
const Doubleicon = ({ toogleGood, show }) => {
 
  return (
    <div className="toogle-icon">
      {!show ? (
        <div className="icon-show-one">
          {" "}
          <Image
            onClick={toogleGood}
            src={menu}
            width={30}
            height={30}
            alt="productOneGood"
            name="name"
          ></Image>
        </div>
      ) : (
        <div className="icon-show-two">
          <Image
            onClick={toogleGood}
            src={square}
            width={30}
            height={30}
            alt="productTwoGood"
          ></Image>
        </div>
      )}{" "}
    </div>
  );
};

export default Doubleicon;
