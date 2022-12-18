import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FAVORITES } from '@/graphql/selection/queries';
const initialState = {
  result: [],
  addFavorite: (arg: any) => {
    console.log({ arg });
  },
};
const FavoritesContext = React.createContext(initialState);

type FavoritesProviderProps = {
  children: React.ReactNode;
};

function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [result, _setResult] = React.useState<any>([]);
  const { data, error } = useQuery(GET_FAVORITES);

  useEffect(() => {
    if (data) {
      _setResult(data);
    } else if (error) {
      _setResult(null);
    }
  }, [error, data]);
  function addFavorite(titleSlug: string) {
    const newResult = result.contact(titleSlug);
    _setResult(newResult);
  }
  const favoriteValue = {
    result,
    addFavorite,
  };
  return <FavoritesContext.Provider value={favoriteValue}>{children}</FavoritesContext.Provider>;
}

export { FavoritesProvider, FavoritesContext };
