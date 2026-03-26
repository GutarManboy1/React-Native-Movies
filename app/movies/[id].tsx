import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row items-start gap-x-2 mb-2">
    <Text className="text-light-200 text-sm font-semibold w-24">{label}</Text>
    <Text className="text-white text-sm flex-1">{value}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading, error } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 bg-primary items-center justify-center px-5">
        <Text className="text-white text-center">
          {error?.message ?? "Movie not found"}
        </Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-5">
          <Text className="text-accent">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Backdrop */}
        <View className="relative w-full h-64">
          <Image
            source={{
              uri: movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                : `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
            }}
            className="w-full h-64"
            resizeMode="cover"
          />
          {/* Dark gradient overlay */}
          <View
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(3,0,20,0.4)",
            }}
          />
        </View>

        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-5 bg-dark-200 rounded-full p-2 z-10"
        >
          <Image
            source={icons.arrow}
            className="size-5"
            style={{ tintColor: "#D6C7FF", transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>

        {/* Poster + title row */}
        <View className="px-5 -mt-16 flex-row gap-x-4">
          <Image
            source={{
              uri: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            className="w-28 h-40 rounded-lg"
            resizeMode="cover"
          />

          <View className="flex-1 justify-end pb-2">
            <Text className="text-white text-xl font-bold" numberOfLines={3}>
              {movie.title}
            </Text>
            {movie.tagline ? (
              <Text className="text-light-200 text-xs italic mt-1" numberOfLines={2}>
                "{movie.tagline}"
              </Text>
            ) : null}

            {/* Rating row */}
            <View className="flex-row items-center gap-x-2 mt-2">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white text-sm font-bold">
                {movie.vote_average.toFixed(1)}
                <Text className="text-light-300 font-normal"> / 10</Text>
              </Text>
              <Text className="text-light-300 text-xs">
                ({movie.vote_count.toLocaleString()} votes)
              </Text>
            </View>
          </View>
        </View>

        {/* Genres */}
        {movie.genres?.length > 0 && (
          <View className="flex-row flex-wrap gap-2 px-5 mt-4">
            {movie.genres.map((g) => (
              <View key={g.id} className="bg-dark-100 rounded-full px-3 py-1">
                <Text className="text-accent text-xs font-semibold">{g.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Overview */}
        {movie.overview ? (
          <View className="px-5 mt-5">
            <Text className="text-white font-bold text-base mb-2">Overview</Text>
            <Text className="text-light-200 text-sm leading-5">{movie.overview}</Text>
          </View>
        ) : null}

        {/* Details */}
        <View className="px-5 mt-6">
          <Text className="text-white font-bold text-base mb-3">Details</Text>

          {movie.release_date ? (
            <InfoRow
              label="Release"
              value={new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          ) : null}

          {movie.runtime ? (
            <InfoRow
              label="Runtime"
              value={`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
            />
          ) : null}

          {movie.status ? (
            <InfoRow label="Status" value={movie.status} />
          ) : null}

          {movie.original_language ? (
            <InfoRow
              label="Language"
              value={movie.original_language.toUpperCase()}
            />
          ) : null}

          {movie.budget > 0 ? (
            <InfoRow
              label="Budget"
              value={`$${movie.budget.toLocaleString()}`}
            />
          ) : null}

          {movie.revenue > 0 ? (
            <InfoRow
              label="Revenue"
              value={`$${movie.revenue.toLocaleString()}`}
            />
          ) : null}

          {movie.production_companies?.length > 0 ? (
            <InfoRow
              label="Studio"
              value={movie.production_companies.map((c) => c.name).join(", ")}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
