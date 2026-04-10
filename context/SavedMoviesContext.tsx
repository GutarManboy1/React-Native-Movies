import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "saved_movies";

interface SavedMoviesContextType {
  savedMovies: Movie[];
  isSaved: (id: number) => boolean;
  toggleSave: (movie: Movie) => void;
}

const SavedMoviesContext = createContext<SavedMoviesContextType>({
  savedMovies: [],
  isSaved: () => false,
  toggleSave: () => {},
});

export function SavedMoviesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) setSavedMovies(JSON.parse(raw));
    });
  }, []);

  const persist = (movies: Movie[]) => {
    setSavedMovies(movies);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  };

  const isSaved = useCallback(
    (id: number) => savedMovies.some((m) => m.id === id),
    [savedMovies]
  );

  const toggleSave = useCallback(
    (movie: Movie) => {
      const updated = isSaved(movie.id)
        ? savedMovies.filter((m) => m.id !== movie.id)
        : [movie, ...savedMovies];
      persist(updated);
    },
    [savedMovies, isSaved]
  );

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, isSaved, toggleSave }}>
      {children}
    </SavedMoviesContext.Provider>
  );
}

export const useSavedMovies = () => useContext(SavedMoviesContext);
