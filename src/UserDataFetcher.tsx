import React, { useEffect, useState } from "react";

// Set global hook ?

interface userMetaData {
    first_name: string,
    last_name: string,
    username: string
}

interface userListProps {
  usersData: userMetaData[]
}

const UserDataFetcher: React.FC = () => {

  const [usersData, setUsersData] = useState<userListProps>({ usersData : []});

  const getUserData = async () => {
    try {
      const response = await fetch("https://random-data-api.com/api/users/random_user?size=5");
      const data = await response.json();

      // Update userData state
      setUsersData((prevData) => ({ usersData: [...prevData.usersData, ...data]}));
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    } finally {
    }
  };
  // Handle when click fetch more
  const handleFetchMore = async () => {
    try {
      getUserData();
    } catch(error){
      console.error('Error fetching data')
    }
  }

  useEffect(() => {
    // Use the async function inside the effect
    const fetchData = async () => {
      try {
        await getUserData();
      } catch (error) {
        // Handle the error
    }
    };

    fetchData();

  }, []); 

  console.log(usersData);

  return (<div>
    <h1> User data will go here </h1>
    <button onClick={handleFetchMore}>Fetch more</button>
    <UserList userData={usersData.usersData}/>
  </div>);
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


// function SetupUserData() {
//     const [userData, setUserData] = useState<userListProps>({userData: []});

//     const getUserData = async () => {
//         try {
//           const response = await fetch("https://random-data-api.com/api/users/random_user?size=5");
//           const data = await response.json();
    
//           // Update userData state
//           setUserData(data);
//         } catch (error) {
//           console.error('Error fetching data', error);
//           throw error;
//         }
//       };
    
//     // Make it applt only once
//     useEffect(() => {
//         // Use the async function inside the effect
//         const fetchData = async () => {
//         try {
//             await getUserData();
//         } catch (error) {
//             // Handle the error
//         }
//         };

//         fetchData();
//     }, []);
//     return userData
// }

// function AddupUserData({ userData }: userListProps) {
//     const [newUserData, setNewUserData] = useState(userData);

//     const getNewUserData = async () => {
//         try {
//           const response = await fetch("https://random-data-api.com/api/users/random_user?size=5");
//           const responseData = await response.json();
    
//           // Update userData state
//           setNewUserData((prevData) => [...prevData, ...responseData]);
//         } catch (error) {
//           console.error('Error fetching data', error);
//           throw error;
//         }
//       };

//     useEffect(() => {
//     // Use the async function inside the effect
//     const fetchData = async () => {
//     try {
//         await getNewUserData();
//     } catch (error) {
//         // Handle the error
//     }
//     };

//     fetchData();
//     }, []);

//     return newUserData;
// }


export default UserDataFetcher;