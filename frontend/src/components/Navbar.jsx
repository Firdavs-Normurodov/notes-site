import React, { useState } from "react"; // useState ni import qilish kerak
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar({ userInfo, onSearchNote, handleClearSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        <a href="/">Notes</a>
      </h2>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      {userInfo ? (
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      ) : (
        <p> </p> // You can show a loading message if userInfo is not yet available
      )}
    </div>
  );
}

export default Navbar;
