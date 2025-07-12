import { Contador } from "./ContadorComponent";

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
    </div>
  );
}

export default MyComponent;
