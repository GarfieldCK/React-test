import { useEffect, useState } from "react";
// import UserDataFetcher from "./UserDataFetcher"
import './App.css';

interface userMetaData {
  first_name: string,
  last_name: string,
  username: string
}

interface userListProps {
  usersInformation: userMetaData[]
};

interface SearchProps {
  handleSearch: (searchValue: string) => void;
}


function App() {
    const [usersData, setUsersData] = useState<userListProps>({ usersInformation : []});
    const [filteredUsers, setFilterUsers] = useState<userMetaData[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
  
    // Data manipulation
    const getUserData = async () => {
      try {
        const response = await fetch("https://random-data-api.com/api/users/random_user?size=5");
        const data = await response.json();
        // Update userData state
        // setUsersData((prevData) => ({ usersInformation: [...prevData.usersInformation, ...data]}));
        setUsersData({ usersInformation : data})
        setFilterUsers(data);
      } catch (error) {
        console.error('Error fetching data', error);
        throw error;
      }
    };
  
    const updateUserData = async () => {
      try{
        const response = await fetch("https://random-data-api.com/api/users/random_user?size=5");
        const newData = await response.json();
        setUsersData((prevData) => ({ usersInformation: [...prevData.usersInformation, ...newData]}));
        setFilterUsers(usersData.usersInformation);
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

    // Searching manipulation
    const handleSearch = (searchValue: string) => {
      setSearchTerm(searchValue.toLowerCase());

      const filtered = usersData.usersInformation.filter(
        (user) => 
          user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchValue.toLowerCase())

      );
      setFilterUsers(filtered);
    }

 
  return (
    <div>
    <h1>User data list </h1>
    <Search handleSearch={handleSearch}/>
    <UserList userData={usersData.usersInformation}/>
    <button onClick={handleFetchMore}> Fetch more</button>
    <UserList userData={filteredUsers}/>
    {/* <button onClick={handleButtonClick}> Fetch data </button>
    {buttonClick && <addupData/>} */}
  </div>
  );
}

// Data map manipulation
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
// Search term manipulation
// function Search(handleSearch) {
//   return (
//     <div>
//     <label htmlFor="search">Search:</label>
//     <input type="text" id="search" onChange={(e) => handleSearch(e.target.value)} />
//   </div>
//   );
// }

function Search({ handleSearch } : SearchProps) {
  return (
    <div>
    <label htmlFor="search">Search:</label>
    <input type="text" id="search" onChange={(e) => handleSearch(e.target.value)} />
  </div>
  );
}
export default App;