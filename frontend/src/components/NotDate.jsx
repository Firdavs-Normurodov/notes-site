import React from "react";
import NotFound from "../assets/not-found.svg";

function EmptCard() {
  return (
    <div className="flex justify-center items-center w-screen h-full">
      <div>
        <img className=" w-96" src={NotFound} alt="Document Add Icon" />
        <h1 className=" text-center">Nothing found, try again</h1>
      </div>
    </div>
  );
}

export default EmptCard;
