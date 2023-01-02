import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:3002/book`,
      {
        title: title,
        author: author,
        published: published,
        description: description,
        createdBy: userId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    navigate("/home");
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const changePublished = (e) => {
    setPublished(e.target.value);
  };
  const changeDescriptipn = (e) => {
    setDescription(e.target.value);
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-center justify-items-center mt-[3%]">
        <div className="block max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-blue-600  md:text-5xl lg:text-5xl dark:text-white">
            Create{" "}
            <span className="text-gray-900 dark:text-blue-500">Book</span>{" "}
          </h2>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="Title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name of the Book"
                required
                value={title}
                onChange={changeTitle}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="Author"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name of the Book Author"
                required
                value={author}
                onChange={changeAuthor}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="Published"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Published
              </label>
              <input
                type="number"
                id="published"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Book Published Date"
                required
                value={published}
                onChange={changePublished}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Book Description
              </label>
              <textarea
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                value={description}
                onChange={changeDescriptipn}
              ></textarea>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBook;
