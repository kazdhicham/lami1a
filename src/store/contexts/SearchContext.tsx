import React, { useEffect } from 'react';
import { GET_SELECTION } from '@/graphql/selection/queries';
import { useQuery } from '@apollo/client';
const initialState = {
  result: [],
  setTerm: (term: string) => {
    console.log({ term });
  },
};
const SearchContext = React.createContext(initialState);

type SearchProviderProps = {
  children: React.ReactNode;
};

function SearchProvider({ children }: SearchProviderProps) {
  const [term, setTerm] = React.useState('');
  const [result, setResult] = React.useState<any>([]);

  const { data, error } = useQuery(GET_SELECTION, { variables: { term } });
  useEffect(() => {
    if (data) {
      setResult(data);
    } else if (error) {
      setResult(null);
    }
  }, [data, error]);

  return <SearchContext.Provider value={{ setTerm, result }}>{children}</SearchContext.Provider>;
}

export { SearchProvider, SearchContext };
