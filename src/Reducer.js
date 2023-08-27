export const initialState = {
    Authentication: false,
    users: [],
    isDarkMode:false

  }
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case "REGISTER":
        return {
          ...state,
          Authentication: true,
          users: [...state.users, action.payload]
        }
      case "LOGIN":
        const existAccount = localStorage.getItem("data")
        const accounts = JSON.parse(existAccount)
        const accountExists = accounts.some((account)=> account.email === action.payload.email && account.password === action.payload.password )
        if (accountExists) {
          return {
            ...state,
            Authentication: true,
          }
        } else {
          return {
           ...state,
          Authentication: false
          } 
        }

      case "LOGOUT":
        return {
          ...state,
          Authentication: false
        }
        case "TOGGLE_DARK_MODE":
            return{
                ...state,
                isDarkMode: !state.isDarkMode,
            }

      default:
        return state; // Return the current state for unknown actions
    }
  }
  