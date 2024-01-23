import { useEffect, useState } from "react";
// import UserDataFetcher from "./UserDataFetcher"
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
    const [usersData, setUsersData] = useState<userListProps>({ usersData : []});
  
    const getUserData = async () => {
      try {
        const response = await fetch("https://random-data-api.com/api/users/random_user?size=5");
        const data = await response.json();
        // Update userData state
        // setUsersData((prevData) => ({ usersData: [...prevData.usersData, ...data]}));
        setUsersData({ usersData : data})
      } catch (error) {
        console.error('Error fetching data', error);
        throw error;
      }
    };
  
    const updateUserData = async () => {
      try{
        const response = await fetch("https://random-data-api.com/api/users/random_user?size=5");
        const newData = await response.json();
        setUsersData((prevData) => ({ usersData: [...prevData.usersData, ...newData]}));
      } catch (error) {
        console.error(error)
      }
    }
    // Handle when click fetch more
    const handleFetchMore = async () => {
      try {
        updateUserData();
      } catch(error){
        console.error('Error fetching data')
      }
    }
  
    useEffect(() => {
      // Use the async function inside the effect
      const fetchData = async() => {
        try {
          await getUserData();
        } catch (error) {
          // Handle the error
      }
      };
  
      fetchData();
    }, []); 
  
    console.log(usersData);
 
  return (
    <div>
    <h1>User data list </h1>
    <UserList userData={usersData.usersData}/>
    <button onClick={handleFetchMore}> Fetch more</button>
    {/* <button onClick={handleButtonClick}> Fetch data </button>
    {buttonClick && <addupData/>} */}
  </div>
  );
}
function UserList({ userData }: { userData: userMetaData[] }) {
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