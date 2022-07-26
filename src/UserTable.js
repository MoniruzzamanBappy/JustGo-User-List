import React from "react";

const UserTable = ({ user, index }) => {
  const { name, picture, email, registered, login } = user;
  const [date] = registered.date.split("T");
  return (
    <tr>
      <th>{index + 1}</th>

      <th>
        <img className="rounded-full" src={picture.medium} alt="" />
      </th>
      <th>
        <p>
          <span>{name.last}</span>, <span>{name.first}</span>
        </p>
        <p>{email}</p>
      </th>
      <th>{date}</th>
      <th>{login.username}</th>
    </tr>
  );
};

export default UserTable;
