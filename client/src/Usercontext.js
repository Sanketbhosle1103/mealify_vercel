import React, { createContext, useState, useEffect, useMemo } from "react";

// Create a Context for User
export const UserContext = createContext({});

// Context Provider Component
export function UserContextProvider({ children }) {
  // Initialize user state from localStorage with error handling
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  // State to indicate readiness
  const [ready, setReady] = useState(false);

  // State for maintenance calories
  const [maintenanceCalories, setMaintenanceCalories] = useState(0);

  // State for macronutrients with default values
  const [macros, setMacros] = useState({
    protein: 0,
    fats: 0,
    carbs: 0,
  });

  // Sync user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Set the component as ready after mounting
  useEffect(() => {
    setReady(true);
  }, []);

  // Memoize the context value to optimize performance
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      ready,
      setReady,
      maintenanceCalories,
      setMaintenanceCalories,
      macros,
      setMacros,
    }),
    [user, ready, maintenanceCalories, macros]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
