import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';

interface HomeSearchContextProps {
  showPopularKeywords: boolean;
  setShowPopularKeywords: Dispatch<SetStateAction<boolean>>;
}

export const HomeSearchContext = createContext<HomeSearchContextProps | null>(
  null,
);

export const useHomeSearchContext = () => {
  const context = useContext(HomeSearchContext);
  if (!context) {
    throw new Error('useRatingContext must be used within a RatingProvider');
  }

  return context;
};
