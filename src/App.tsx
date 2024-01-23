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

  // Hook :
  // const [userData, setUserData] = useState<userMetaData[]>([]);
  // const [usersData, setUserData] = useState<userListProps>({usersData: []});

  // const [buttonClick, setButtonClick] = useState(false);

  // const handleButtonClick = () => {
  //   setButtonClick(!buttonClick);
  // };

  // const userData = dataManipulation.setupData();
  // const addupData = dataManipulation.addupData(userData)
 
  return (
    <div>
    <h1>User data list </h1>
    <UserDataFetcher />
    {/* <button onClick={handleButtonClick}> Fetch data </button>
    {buttonClick && <addupData/>} */}
  </div>
  );
}



function UserList(userData: userMetaData[]) {
  return (
    <ul>
      {userData.map((user, index) => (
        <li key={index}>
          {/* Customize display data */}
          {user.username} {user.first_name} {user.last_name}
        </li>
      ))}
    </ul>
  );
}


export default App;