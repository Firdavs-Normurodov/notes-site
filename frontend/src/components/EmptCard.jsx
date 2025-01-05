import React from "react";
import DocAdd from "../assets/doc-add.svg";

function EmptCard() {
  return (
    <div className="flex justify-center items-center w-screen h-full">
      <div>
        <img className=" w-96" src={DocAdd} alt="Document Add Icon" />
        <h1 className=" text-center">You haven't created any notes yet.</h1>
      </div>
    </div>
  );
}

export default EmptCard;
