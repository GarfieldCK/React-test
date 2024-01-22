import { useEffect, useState } from "react";
import './App.css';

interface userMetaData {
  first_name: string,
  last_name: string,
  username: string
}

function App() {

  // Fetch data:
  const Fetch = () => {
    const [userMetaData, setUserMetaData] = useState<userMetaData[]>([]);
    useEffect(() => {
      fetch("https://random-data-api.com/api/users/random_user?size=5")
      .then((res) => {
        return res.json();
      })
      .then((metaData) => {
        console.log(metaData);
        setUserMetaData(metaData);
      });
    }, []);
    return <div>
      <ul>
        {userMetaData.map((user, index) => (
          <li key={index}>
            {user.first_name}
            {user.last_name}
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  }
  return (
    <div>
    <h1> Hello world</h1>
    <FetchButton/>
    <Fetch/>
  </div>
  );
}

// Button component :
function FetchButton() {
  return (
    <button>
      Fetch data
    </button>
  );
}
