import logo from "./../components/UI/Images/logo.png";

let initialState = {
  active: [
    { name: "dimas", logo: logo, id: 1 },
    { name: "sanya", logo: logo, id: 2 },
    { name: "danya", logo: logo, id: 3 },
  ],
};
const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "something":
      
      return {
        ...state,
        friends: [...state.friends, 'something'],
      };
    default:
      return state;
  }
};

export default friendsReducer;
