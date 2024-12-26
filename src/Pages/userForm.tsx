import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import styled from "styled-components";

// Move styled-component declaration outside the component
const Center = styled.div`
  margin: auto;
  width: 50%;
  border: 1px solid;
  padding: 10px;
`;

const UserForm: React.FC = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(""); // State hooks must always run
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim() || !title.trim()) {
      // Prevent submission of empty fields
      return;
    }

    const newUser = {
      userName,
      title,
    };

    dispatch(addUser(newUser));
    setUserName(""); // Clear input
    setTitle("");    // Clear input
  };

  // Render should always return the same structure
  return (
    <form onSubmit={handleSubmit}>
      <Center>
        <div>
          <label>User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit">Add User</button>
      </Center>
    </form>
  );
};

export default UserForm;
