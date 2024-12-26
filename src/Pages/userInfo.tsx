import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Remove from '../components/Remove'
import { fetchUsers } from '../store/userSlice';
import { RootState, AppDispatch } from '../store/store';
const UserList: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>(); 


  const users = useSelector((state: RootState) => state.user.users); // ดึงข้อมูลผู้ใช้จาก Redux store

  // เมื่อคอมโพเนนต์ถูกโหลดให้ dispatch fetchTodos
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  

  return (
    <div>
      <h3>User List:</h3>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={user.id}>
              {index + 1} Id: {user.id} title {user.userName} 
              {user.title}
              <Remove id={user.id} /> 
            </li>
          ))}
        </ul>
      ) : (
        <p>No users added yet.</p>
      )}
    </div>
  );
};

export default UserList;
