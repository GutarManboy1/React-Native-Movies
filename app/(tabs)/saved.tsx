import { View, Text, Image, FlatList } from "react-native";

import { useSavedMovies } from "@/context/SavedMoviesContext";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";

const EmptyState = () => (
  <View className="flex-1 items-center justify-center mt-20">
    <Image source={icons.save} className="size-16 mb-4" tintColor="#A8B5DB" />
    <Text className="text-white text-xl font-bold mb-2">No saved movies</Text>
    <Text className="text-light-200 text-sm text-center px-10">
      Movies you save will appear here. Tap the bookmark on any movie to save
      it.
    </Text>
  </View>
);

const Saved = () => {
  const { savedMovies } = useSavedMovies();

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, flexGrow: 1 }}
        ListHeaderComponent={
          <View className="flex-row items-center justify-between mt-16 mb-6">
            <Text className="text-white text-2xl font-bold">Saved</Text>
            {savedMovies.length > 0 && (
              <Text className="text-light-200 text-sm">
                {savedMovies.length} movie{savedMovies.length !== 1 ? "s" : ""}
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={<EmptyState />}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        renderItem={({ item }) => <MovieCard {...item} />}
      />
    </View>
  );
};

export default Saved;
