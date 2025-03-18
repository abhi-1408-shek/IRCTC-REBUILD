import { useState, useEffect } from 'react';
import { Station } from '@/types';

interface RecentSearch {
  from: Station;
  to: Station;
  date: Date;
  passengers: number;
}

const MAX_RECENT_SEARCHES = 5;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches);
        setRecentSearches(parsed.map((search: any) => ({
          ...search,
          date: new Date(search.date)
        })));
      } catch (error) {
        console.error('Error parsing recent searches:', error);
      }
    }
  }, []);

  const addRecentSearch = (search: RecentSearch) => {
    setRecentSearches((prev) => {
      const newSearches = [
        search,
        ...prev.filter(
          (s) =>
            !(
              s.from.code === search.from.code &&
              s.to.code === search.to.code &&
              s.date.getTime() === search.date.getTime()
            )
        )
      ].slice(0, MAX_RECENT_SEARCHES);

      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      return newSearches;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  };
}
