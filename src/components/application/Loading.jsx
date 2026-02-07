"use client";
import React from "react";
import LoadingImg from "../../../assets/images/loading.svg";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center mt-12">
      <Image src={LoadingImg.src} height={80} width={80} alt="Loading"></Image>
    </div>
  );
};

export default Loading;
