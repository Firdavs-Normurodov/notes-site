import React, { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "../components/AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import Navbar from "../components/Navbar";
import Toats from "../components/Toats";
import EmptCard from "../components/EmptCard";
import NotDate from "../components/NotDate";

// Modalni to'g'ri ishlashini ta'minlash uchun
Modal.setAppElement("#root");

function Dashboard() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    inShown: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [showToatsMsg, setShowToatsMsg] = useState({
    inShown: false,
    message: "",
    type: "",
  });
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ inShown: true, data: noteDetails, type: "edit" });
  };

  const showToatsMessage = (message, type) => {
    setShowToatsMsg({
      inShown: true,
      message,
      type,
    });
  };

  const handleClosToats = () => {
    setShowToatsMsg({
      inShown: false,
      message: "",
      type: "",
    });
  };

  // Foydalanuvchi ma'lumotlarini olish
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear(); // Token mavjud emas bo'lsa, logout qilish
        navigate("/login"); // Foydalanuvchini login sahifasiga yo'naltirish
      } else {
        showToatsMessage("Error fetching user info.", "error");
      }
    }
  };

  // Barcha notes'larni olish
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes); // Notes'larni yangilash
      }
    } catch (error) {
      console.log("Error fetching notes:", error);
      showToatsMessage("Error fetching notes.", "error");
    }
  };

  // Note o'chirish
  const deleteNote = async (noteId) => {
    try {
      await axiosInstance.delete(`/delete-note/${noteId}`); // DELETE so'rovini yuborish
      showToatsMessage("Note successfully deleted.", "delete");
      getAllNotes(); // Notes'larni qayta yuklash
    } catch (error) {
      console.log("Error deleting note:", error);
      showToatsMessage("Error deleting note.", "error");
    }
  };

  // Notes'larni qidirish
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes); // Qidiruv natijalarini yangilash
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes(); // Qidiruvni tozalash va barcha notes'larni ko'rsatish
  };

  // Note pin holatini yangilash
  const upateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      await axiosInstance.put(`/update-note-pinned/${noteId}`, {
        isPinned: !noteData.isPinned,
      });
      showToatsMessage("Note successfully updated.", "success");
      getAllNotes(); // Notes'larni qayta yuklash
    } catch (error) {
      console.log(error);
    }
  };

  // Sahifa yuklanganda notes'lar va foydalanuvchi ma'lumotlarini olish
  useEffect(() => {
    getAllNotes();
    getUserInfo();
    const token = localStorage.getItem("token"); // Tokenni olish
    if (!token) {
      navigate("/login"); // Agar token bo'lmasa, login sahifasiga o'tish
    }
  }, [navigate]);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {allNotes.length > 0 ? (
            allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item._id)} // noteId ni to'g'ri o'tkazish
                onPinNote={() => upateIsPinned(item)}
              />
            ))
          ) : isSearch ? (
            <NotDate /> // Qidiruv natijasida hech narsa topilmasa
          ) : (
            <EmptCard /> // Notes bo'lmasa
          )}
        </div>
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ inShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.inShown}
        onRequestClose={() =>
          setOpenAddEditModal({ inShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add or Edit Note"
        className="w-full sm:w-[80%] lg:w-[40%] max-h-[90%] bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ inShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToatsMessage={showToatsMessage}
        />
      </Modal>
      <Toats
        isShown={showToatsMsg.inShown}
        message={showToatsMsg.message}
        type={showToatsMsg.type}
        onClose={handleClosToats}
      />
    </>
  );
}

export default Dashboard;
