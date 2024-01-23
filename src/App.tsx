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
  handleSearch: (searchValue: string, searchBy: string) => void;
}


function App() {
    const [usersData, setUsersData] = useState<userListProps>({ usersInformation : []});
    const [filteredUsers, setFilterUsers] = useState<userMetaData[]>([]);
    // const [searchTerm, setSearchTerm] = useState<string>('');
  
    // Data manipulation
    const getUserData = async () => {
      try {
        const response = await fetch("https://random-data-api.com/api/users/random_user?size=5");
        const data = await response.json();
        setUsersData({ usersInformation : data})
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
  
    // Searching manipulation
    const handleSearch = (searchValue: string, searchBy: string) => {
      // setSearchTerm(searchValue.toLowerCase());

      const filtered = usersData.usersInformation.filter((user) => {
        switch(searchBy) {
          case 'username':
            return user.username.toLowerCase().includes(searchValue.toLowerCase());
          case 'firstname':
            return user.first_name.toLowerCase().includes(searchValue.toLowerCase());
          case 'lastname':
            return user.last_name.toLowerCase().includes(searchValue.toLowerCase());
          default:
            return (
              user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
              user.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
              user.last_name.toLowerCase().includes(searchValue.toLowerCase())
            ); 
        }
      })
      setFilterUsers(filtered);
    }
 
  return (
    <div>
    <h1>User data list </h1>
    <Search handleSearch={handleSearch}/>
    <UserList userData={usersData.usersInformation}/>
    <button onClick={handleFetchMore}> Fetch more</button>
    <UserList userData={filteredUsers}/>
  </div>
  );
}

// Data map manipulation, mapping
function UserList({ userData }: { userData: userMetaData[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {userData.map((user, index) => (
        <li key={index} style={{ marginBottom: '8px', padding: '10px', border: '1px solid #ddd' }}>
          <strong>{user.username}</strong> - {user.first_name} {user.last_name}
        </li>
      ))}
    </ul>
  );
}

// Searching manipulation
function Search({ handleSearch } : SearchProps) {

  const [selectedBy, setSelectedBy] = useState<string>('username');
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBy(e.target.value);
  };

  return (
    <div>
    <label htmlFor="search">Search:</label>
    <input type="text" id="search" onChange={(e) => handleSearch(e.target.value, selectedBy)} />
    <select value={selectedBy} onChange={handleSelectChange}>
        <option value="username">Username</option>
        <option value="firstname">First Name</option>
        <option value="lastname">Last Name</option>
      </select>

  </div>
  );
}
export default App;