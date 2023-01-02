import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import LoginContext from "../context/Context";

function BookList() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const { isLogged } = useContext(LoginContext);

  const booksData = async () => {
    try {
      const token = localStorage.getItem("token");
      const responce = await axios.get("http://localhost:3002/book", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setBooks(responce.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    booksData();
  }, []);

  const handleEdit = (bookId) => {
    navigate(`/edit/${bookId}`);
  };
  const handleDelete = async (bookId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3002/book/${bookId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    booksData();
  };
  const userId = localStorage.getItem("userId");
  const renderedBooks = books
    .filter((book) => book.createdBy === userId)
    .map((book) => {
      return (
        <div
          className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700  "
          key={book._id}
        >
          <div className="p-5">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {book.title}
              </h5>
            </div>
            <div className="flex flex-row justify-between">
              <h6 className="mb-3 font-medium text-gray-800 dark:text-gray-400">
                {book.author}
              </h6>
              <h6 className="mb-3 font-medium text-gray-800 dark:text-gray-400">
                {book.published}
              </h6>
            </div>
            <div className="break-words">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
                {book.description}
              </p>
            </div>
            <div className="flex flex-row justify-between ">
              <div
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                onClick={() => handleEdit(book._id)}
              >
                <TbEdit className="text-lg" />
              </div>
              <div
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 cursor-pointer"
                onClick={() => handleDelete(book._id)}
              >
                <TbTrash className="text-lg" />
              </div>
            </div>
          </div>
        </div>
      );
    });
  return isLogged ? (
    <div>
      <Navbar />
      <div
        className="flex flex-row gap-6 flex-wrap justify-center mt-10"
        key={books.map((book) => book.id)}
      >
        {renderedBooks}
      </div>
    </div>
  ) : (
    navigate("/")
  );
}

export default BookList;
