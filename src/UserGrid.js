import React from "react";

const UserGrid = ({ user, index }) => {
  const { name, picture, email, registered, login } = user;
  const [date] = registered.date.split("T");
  return (
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="flex items-center mx-4">
        <img className="rounded-full" src={picture.medium} alt="" />
        <div class="ml-4">
          <p>
            <span>{name.last}</span>, <span>{name.first}</span>
          </p>
          <p>{email}</p>
          <p>{date}</p>
          <p>{login.username}</p>
        </div>
      </div>
    </div>
  );
};

export default UserGrid;
