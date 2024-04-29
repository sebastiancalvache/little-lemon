import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [menu, setMenu] = useState([]);

  const removeFilter  = (name) => {
    let newFilters = [...filters];
    const index = filters.findIndex((filter) => filter === name);

    if (index !== -1) {
        // Remove the element at the found index using splice
        newFilters.splice(index, 1);
        // Update the state with the modified array
        setFilters(newFilters);
    } else {
        console.log("Filter not found");
    }
  }

  const addFilter  = (name) => {
    let newFilters = [...filters];
    newFilters.push(name);
    setFilters(newFilters);
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo , categories, setCategories, addFilter , removeFilter , menu, setMenu, filters, setFilters}}>
      {children}
    </UserContext.Provider>
  );
};