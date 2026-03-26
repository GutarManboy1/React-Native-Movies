import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";

import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    fetchData: loadMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        if (movies?.length > 0 && movies?.[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        resetMovies();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, loadMovies, resetMovies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0 flex-1"
        resizeMode="cover"
      />
      {moviesLoading && (
        <ActivityIndicator
          size="large"
          color="#fff"
          className="absolute top-1/2 left-1/2 z-50"
        />
      )}
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                placeholder="Search for..."
              />
            </View>
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}
            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-white text-center font-bold text-xl">
                  Search Results for {""}
                  <Text className="text-accent">{`"${searchQuery.trim()}"`}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-white text-center text-lg">
                {searchQuery.trim()
                  ? `No results found for "${searchQuery.trim()}". Try a different search term.`
                  : "Start typing to search for movies..."}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
