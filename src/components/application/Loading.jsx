import React from "react";
import loading from "../../../assets/loading.svg";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="hscreen w-full flex items-center justify-center mt-12">
      <Image src={loading.src} height={80} width={80} alt="Loading"></Image>
    </div>
  );
};

export default Loading;
