import { useEffect, useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";

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
  
    // Data manipulation
    const getUserData = async () => {
      try {
        const response = await fetch("https://random-data-api.com/api/users/random_user?size=5");
        const data = await response.json();
        setUsersData({ usersInformation : data})
        setFilterUsers(data)
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
        setFilterUsers((prevData) => ([...prevData, ...newData]))
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
  
    // Aply useEffect to make it run only once
    useEffect(() => {
      // Use the async function inside the effect
      const fetchData = async() => {
        try {
          await getUserData();
        } catch (error) {
          console.error('Error can not fetch data', error)
      }
      };
  
      fetchData();
    }, []); 
  
    // Searching manipulation
    const handleSearch = (searchValue: string, searchBy: string) => {

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
    <h1>User Information</h1>
    <Search handleSearch={handleSearch}/>
    <UserList userData={filteredUsers}/>
    <Button
      variant="primary"
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '8px',
        border: '2px solid #4CAF50',
        display: 'block',
        margin: 'auto',
        marginTop: '20px',
      }}
      onClick={handleFetchMore}
    >
      Fetch more Cat 🐱
    </Button>
  </div>
  );
}

// Data map manipulation, mapping
function UserList({ userData }: { userData: userMetaData[] }) {
  return (
    <Row className="card-container">
      {userData.map((user, index) => (
        <Col key={index} lg={6} style={{ marginBottom: '8px' }}>
          <Card>
            <Card.Body className="d-flex align-items-center">
              <div className="avatar-box mr-3">
                <img
                  src={`https://placekitten.com/50/50?image=${index + 1}`}
                  alt={`Avatar ${index + 1}`}
                  style={{ width: '75px', height: '75px', borderRadius: '50%' }}
                />
              </div>
              <div style={{padding: '10px'}}>
                <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {user.username}
                  </Card.Title>
                <Card.Text>
                  <span className="font-weight-bold">{user.first_name} {user.last_name}</span>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

// Searching manipulation
function Search({ handleSearch } : SearchProps) {

  const [selectedBy, setSelectedBy] = useState<string>('username');
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBy(e.target.value);
  };

  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
      <label htmlFor="search" style={{ marginRight: '10px' }}>Search:</label>
      <input
        type="text"
        id="search"
        onChange={(e) => handleSearch(e.target.value, selectedBy)}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <select
        value={selectedBy}
        onChange={handleSelectChange}
        style={{ padding: '5px' }}
      >
        <option value="username">Username</option>
        <option value="firstname">First Name</option>
        <option value="lastname">Last Name</option>
      </select>
    </div>
  );
}
export default App;