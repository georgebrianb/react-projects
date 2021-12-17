const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      const newState = { ...state, cart: [] };
      return newState;
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "INCREASE_AMOUNT":
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return {
        ...state,
        cart: tempCart,
      };

    case "DECREASE_AMOUNT":
      let newCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        })
        .filter((item) => item.amount > 0);
      return {
        ...state,
        cart: newCart,
      };
    case "GET_TOTAL":
      const { total, amount } = state.cart.reduce(
        (cartTotal, item) => {
          const { price, amount } = item;
          cartTotal.amount += amount;
          cartTotal.total += price * amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      return { ...state, total: total.toFixed(2), amount };
  }
  return state;
};

export default reducer;
