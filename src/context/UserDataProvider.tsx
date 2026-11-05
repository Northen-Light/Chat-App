import { ReactElement, useState } from 'react';
import { createSafeContext } from '../context';

type UserContextValueType = {
  favouriteUserIds: Array<number>;
  setFavouriteUserIds: React.Dispatch<React.SetStateAction<number[]>>;
} | null;

const [UserDataContext, useUserData] =
  createSafeContext<UserContextValueType>('UserData');

export function UserDataProvider({ children }: { children: ReactElement }) {
  const [favouriteUserIds, setFavouriteUserIds] = useState([
    12, 23, 32, 45, 50,
  ]);

  return (
    <UserDataContext.Provider value={{ favouriteUserIds, setFavouriteUserIds }}>
      {children}
    </UserDataContext.Provider>
  );
}

export { useUserData };
