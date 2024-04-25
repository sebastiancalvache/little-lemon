import { createContext, useState } from 'react';
import Navigation from '../screens/Navigation';

export const UserContext = createContext();

export const UserProvider = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
     <Navigation></Navigation>
    </UserContext.Provider>
  );
};