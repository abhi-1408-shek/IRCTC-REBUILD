import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Train, MapPin } from 'lucide-react';
import { stations, Station } from '../../data/stations';
import { cn } from '../../lib/utils';

interface SmartSearchProps {
  type: 'from' | 'to';
  value: string;
  onChange: (station: Station) => void;
  className?: string;
}

const fuseOptions = {
  keys: ['name', 'code', 'state'],
  threshold: 0.3,
};

const fuse = new Fuse(stations, fuseOptions);

export function SmartSearch({ type, value, onChange, className }: SmartSearchProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Station[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [recentSearches, setRecentSearches] = useState<Station[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const stored = localStorage.getItem(`recentSearches-${type}`);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, [type]);

  const saveRecentSearch = (station: Station) => {
    const updated = [station, ...recentSearches.filter(s => s.code !== station.code)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(`recentSearches-${type}`, JSON.stringify(updated));
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length > 1) {
      const searchResults = fuse.search(searchQuery).map(result => result.item);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (station: Station) => {
    setQuery(station.name);
    onChange(station);
    saveRecentSearch(station);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={type === 'from' ? 'From Station' : 'To Station'}
          className="w-full px-4 py-3 pl-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
        />
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
      </div>

      <AnimatePresence>
        {isOpen && (results.length > 0 || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg dark:bg-gray-800"
          >
            {results.length > 0 ? (
              <ul className="py-2">
                {results.map((station) => (
                  <motion.li
                    key={station.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => handleSelect(station)}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Train className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <div className="font-medium">{station.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="inline w-3 h-3 mr-1" />
                        {station.state}
                      </div>
                    </div>
                    <div className="ml-auto text-sm font-mono text-gray-400">
                      {station.code}
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              recentSearches.length > 0 && (
                <div className="py-2">
                  <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase">
                    Recent Searches
                  </div>
                  <ul>
                    {recentSearches.map((station) => (
                      <motion.li
                        key={station.code}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handleSelect(station)}
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Train className="w-4 h-4 mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">{station.name}</div>
                          <div className="text-sm text-gray-500">
                            <MapPin className="inline w-3 h-3 mr-1" />
                            {station.state}
                          </div>
                        </div>
                        <div className="ml-auto text-sm font-mono text-gray-400">
                          {station.code}
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
