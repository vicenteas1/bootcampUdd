import { useState, useEffect } from "react";

export function FetchApi() {
  const [users, setUsers] = useState(null);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setUsers(jsonResponse.results);
      });
  }, []);
  return (
    <div>
      <h3>USUARIO:</h3>
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user.login.uuid}>
                {user.name.title} {user.name.first} {user.name.last}
                <p>{user.location.city}, {user.location.state}, {user.location.country}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};
