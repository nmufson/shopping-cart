const CartQuantityInput = ({ quantity, setQuantity }) => {
  const handleInput = (e) => {
    const value = e.target.value;
    if (value === '') {
      setQuantity(0);
    } else {
      const newValue = Math.max(1, Math.floor(value));
      setQuantity(newValue);
    }
  };
  const increment = () => {
    setQuantity((prevValue) => prevValue + 1);
  };

  const decrement = () => {
    setQuantity((prevValue) => Math.max(1, prevValue - 1));
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <input
        type="number"
        className={styles.input}
        value={quantity}
        // {} insetad of "" so that JSX interprets them as numbers instead of strings
        min={1}
        step={1}
        onInput={handleInput}
      />
      <button onClick={increment}>+</button>
    </div>
  );
};

export default CartQuantityInput;

// const CartQuantityContainer = ({ cartItems, setCartItems, item }) => {
//   // use state to control the input value so user can type whatever they want
//   // handleBlur sees when we tab or click away from input, and then
//   // runs updateCartItem which uses setCartItems
//   // the value of our input element is now our inputValue state
//   const [inputValue, setInputValue] = useState(item.quantity.toString());

//   // useEffect(() => {
//   //   setInputValue(item.quantity.toString());
//   // }, [item.quantity]);

//   const updateCartItem = (newValue) => {
//     const updatedCartItems = cartItems.map((cartItem) =>
//       cartItem.id === item.id ? { ...cartItem, quantity: newValue } : cartItem
//     );
//     setCartItems(updatedCartItems);
//   };

//   const handleInput = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleBlur = () => {
//     let newValue = parseInt(inputValue, 10);
//     if (isNaN(newValue) || newValue < 1) {
//       newValue = 1;
//     }
//     setInputValue(newValue.toString());
//     updateCartItem(newValue);
//   };

//   const increment = () => {
//     // we make a shallow copy of cartItems so React recognizes the state
//     // change and delivers a new render
//     const updatedCartItems = cartItems.map((cartItem) =>
//       cartItem.id === item.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//     setCartItems(updatedCartItems);
//   };

//   const decrement = () => {
//     const updatedCartItems = cartItems.map((cartItem) =>
//       cartItem.id === item.id
//         ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
//         : cartItem
//     );
//     setCartItems(updatedCartItems);
//   };

//   return (
//     <div>
//       <button onClick={decrement}>-</button>
//       <input
//         type="number"
//         className={styles.input}
//         value={inputValue}
//         // {} insetad of "" so that JSX interprets them as numbers instead of strings
//         min={1}
//         step={1}
//         onInput={handleInput}
//         onBlur={handleBlur}
//       />
//       <button onClick={increment}>+</button>
//     </div>
//   );
// };
