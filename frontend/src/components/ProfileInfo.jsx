import React from "react";
import { getInitials } from "../utils/helpers";

function ProfileInfo({ userInfo, onLogout }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {userInfo && userInfo.fullName ? getInitials(userInfo.fullName) : "?"}
      </div>
      <div>
        <p className="text-sm font-medium">
          {userInfo ? userInfo.fullName : "Loading..."}
        </p>
        <button className="text-sm underline text-slate-700" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
