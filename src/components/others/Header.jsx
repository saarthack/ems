import React, { useEffect, useState } from 'react';
import { setLocalStroage } from '../../utils/LocalStrorage';

const Header = ({data, changeUser}) => {
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (!data) {
      setUsername('Admin');
    } else {
      setUsername(data.firstName);
    }
  }, [data]);

  const logOut = () => {
    localStorage.setItem("loggedInUser", "")
    changeUser('')
    // window.location.reload()
  }

  return (
    <div className='flex items-end justify-between '>
      <h1 className='text-2xl font-medium'>Hello <br /> <span className='text-3xl font-semibold'>{username} 👋</span> </h1>
      <button onClick={logOut} className='bg-red-600 px-5 py-2 rounded-sm  text-lg font-medium'>Log Out</button>
    </div>
  );
}

export default Header;