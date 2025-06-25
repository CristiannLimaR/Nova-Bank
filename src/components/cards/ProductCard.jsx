import React from "react";

const ProductCard = ({
  name,
  type,
  enterprise,
  originalPrice,
  profitPrice,
  img,
}) => {
  const imageUrl =
    img && img !== ""
      ? `http://localhost:3000/${img.replace(/\\/g, "/")}`
      : "https://pic.onlinewebfonts.com/thumbnails/icons_328197.svg";

  console.log("Final image URL:", imageUrl);
  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src={
            imageUrl || "https://via.placeholder.com/300x300?text=Sin+Imagen"
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/300x300?text=Sin+Imagen";
          }}
          alt={name}
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {enterprise}
          </span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {name}
          </p>
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-700/60 text-blue-100">
            {type}
          </span>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ${profitPrice}
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">
                ${originalPrice}
              </p>
            </del>
            <div className="ml-auto"></div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
