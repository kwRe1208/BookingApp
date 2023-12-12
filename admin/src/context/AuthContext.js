import { createContext, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    // Add a function to clear user authentication
    const clearUserAuth = () => {
        dispatch({ type: "CLEAR_USER_AUTH" });
        // Clear user data from localStorage or perform other cleanup if needed
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading, 
                error: state.error, 
                dispatch,
                clearUserAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};