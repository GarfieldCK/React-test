import { useEffect, useState } from "react";
import UserDataFetcher from "./UserDataFetcher"
import './App.css';

interface userMetaData {
  first_name: string,
  last_name: string,
  username: string
}

interface userListProps {
  usersData: userMetaData[]
};


function App() {

 
  return (
    <div>
    <h1>User data list </h1>
    <UserDataFetcher />
    {/* <button onClick={handleButtonClick}> Fetch data </button>
    {buttonClick && <addupData/>} */}
  </div>
  );
}


export default App;