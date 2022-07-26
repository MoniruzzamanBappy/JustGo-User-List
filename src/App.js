import React, { useEffect, useState } from "react";
import "./App.css";
import UserTable from "./UserTable";
import { useQuery } from "react-query";
import UserGrid from "./UserGrid";
import Loading from './Loading/Loading';

function App() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [startNo, setStartNo] = useState(0);
  const [endNo, setEndNo] = useState(10);
  const [clicked, setClicked] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { isLoading, data, refetch } = useQuery(["products"], () =>
    fetch(`https://randomuser.me/api/?page=1&results=50`)
      .then((res) => res.json())
      .then((data) => setUsers(data.results))
  );
  // useEffect(() => {
  //   fetch(`https://randomuser.me/api/?page=1&results=50`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data.results);
  //     });
  // }, []);
  const handlePage = (startNo, endNo, page) => {
    setStartNo(startNo);
    setEndNo(endNo);
    setPage(page);
  };
  if(isLoading){
    <Loading/>
  }

  const handleOnChange = () => {
    refetch();
    setSearchValue(document.getElementById("search").value);

    const newData = users.filter(
      (item) =>
        item.name.first.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.name.last.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    setUsers(newData);
   
  };
  const handleToggle = () => {
    setClicked(!clicked);
  };
  const handleFilter = (e) => {
    // refetch();
    if (e === "all") {
      refetch();
    } else {
      const newData = users.filter((item) => item.gender === e);
      setUsers(newData);
    }
  };
  return (
    <div>
      {/* header part */}
      <div class="navbar bg-base-100">
        <a href="/" class="btn btn-ghost normal-case font-bold text-xl">
          User List
        </a>
      </div>
      {/* search and navigation part */}
      <div class="flex container mx-auto items-center justify-between">
        <div className=" flex items-center ">
          <input
            type="text"
            onChange={handleOnChange}
            id="search"
            placeholder="Search by Email on Name"
            class="input mr-8 rounded-full input-bordered"
          />
          <div className="flex">
            <h1>Filter by:</h1>
            <div class="flex items-center mx-4">
              <input
                id="inline-radio"
                type="radio"
                onClick={() => handleFilter("all")}
                name="inline-radio-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="inline-radio"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                All
              </label>
            </div>
            <div class="flex items-center mx-4">
              <input
                id="inline-radio"
                type="radio"
                onClick={() => handleFilter("male")}
                name="inline-radio-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="inline-radio"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Male
              </label>
            </div>
            <div class="flex items-center mx-4">
              <input
                id="inline-radio"
                type="radio"
                onClick={() => handleFilter("female")}
                name="inline-radio-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="inline-radio"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Female
              </label>
            </div>
          </div>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Tile view</span>
            <input
              onClick={handleToggle}
              type="checkbox"
              class="toggle ml-4 toggle-primary"
            />
          </label>
        </div>
      </div>
      {clicked ? (
        <div class="overflow-x-auto border rounded-lg container mx-auto mt-2 ">
          <table class="table  w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Registration Date</th>
                <th>User name</th>
              </tr>
            </thead>
            <tbody>
              {users?.slice(startNo, endNo).map((user, index) => (
                <UserTable key={index} index={index} user={user}></UserTable>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10 mt-8 container mx-auto">
          {users?.slice(startNo, endNo).map((user, index) => (
            <UserGrid key={index} index={index} user={user}></UserGrid>
          ))}
        </div>
      )}

      {/* footer part */}
      <div class="flex justify-end container mx-auto my-2 btn-group">
        <button
          onClick={() => handlePage(0, 10, 1)}
          class={page === 1 ? "btn btn-active" : "btn"}
        >
          1
        </button>
        <button
          onClick={() => handlePage(10, 20, 2)}
          class={page === 2 ? "btn btn-active" : "btn"}
        >
          2
        </button>
        <button
          onClick={() => handlePage(20, 30, 3)}
          class={page === 3 ? "btn btn-active" : "btn"}
        >
          3
        </button>
        <button
          onClick={() => handlePage(30, 40, 4)}
          class={page === 4 ? "btn btn-active" : "btn"}
        >
          4
        </button>
        <button
          onClick={() => handlePage(40, 50, 5)}
          class={page === 5 ? "btn btn-active" : "btn"}
        >
          5
        </button>
      </div>
    </div>
  );
}

export default App;
