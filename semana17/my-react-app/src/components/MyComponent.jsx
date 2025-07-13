import { Contador } from "./ContadorComponent";
import { FetchApi } from "./FetchApi";

function MyComponent({ props }) {
  const { name, age, adult, hobbies, address, lastname } = props;

  return (
    <div>
      <h1>My Component works!!</h1>
      <div>{name}</div>
      <div>{age}</div>
      <div>{adult ? 'Yes' : 'No'}</div>
      <div>{hobbies.join(', ')}</div>
      <div>{address.street + ', ' + address.number}</div>
      <div>{lastname}</div>
      <Contador />
      <FetchApi />
    </div>
  );
}

export default MyComponent;
