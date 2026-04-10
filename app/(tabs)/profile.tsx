import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const MOCK_USER = {
  username: "GutarManboy1",
  email: "gutarmanboy1@gmail.com",
  memberSince: "January 2024",
  savedMovies: 12,
  watched: 47,
  reviews: 8,
};

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <View className="flex-1 items-center bg-dark-100 rounded-2xl py-4 px-2">
      <Text className="text-white text-2xl font-bold">{value}</Text>
      <Text className="text-light-200 text-sm mt-1">{label}</Text>
    </View>
  );
}

function MenuRow({
  icon,
  label,
  danger,
}: {
  icon: any;
  label: string;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-dark-100 rounded-2xl px-4 py-4 mb-3"
      activeOpacity={0.7}
    >
      <Image
        source={icon}
        className="size-5 mr-3"
        tintColor={danger ? "#FF6B6B" : "#A8B5DB"}
      />
      <Text
        className={`flex-1 text-base font-medium ${danger ? "text-red-400" : "text-light-100"}`}
      >
        {label}
      </Text>
      {!danger && (
        <Image source={icons.arrow} className="size-4" tintColor="#A8B5DB" />
      )}
    </TouchableOpacity>
  );
}

const Profile = () => {
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <Text className="text-white text-2xl font-bold mt-16 mb-8">
          Profile
        </Text>

        {/* Avatar + User Info */}
        <View className="items-center mb-8">
          <View className="size-24 rounded-full bg-dark-100 items-center justify-center mb-4 border-2 border-accent">
            <Image source={images.profile} className="size-12" tintColor="#AB8BFF" />
          </View>
          <Text className="text-white text-xl font-bold">
            {MOCK_USER.username}
          </Text>
          <Text className="text-light-200 text-sm mt-1">{MOCK_USER.email}</Text>
          <Text className="text-light-300 text-xs mt-1">
            Member since {MOCK_USER.memberSince}
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3 mb-8">
          <StatCard label="Saved" value={MOCK_USER.savedMovies} />
          <StatCard label="Watched" value={MOCK_USER.watched} />
          <StatCard label="Reviews" value={MOCK_USER.reviews} />
        </View>

        {/* Account Section */}
        <Text className="text-light-200 text-sm font-semibold uppercase tracking-widest mb-3 ml-1">
          Account
        </Text>
        <MenuRow icon={icons.person} label="Edit Profile" />
        <MenuRow icon={icons.save} label="Saved Movies" />
        <MenuRow icon={icons.star} label="My Reviews" />

        {/* Preferences Section */}
        <Text className="text-light-200 text-sm font-semibold uppercase tracking-widest mb-3 mt-3 ml-1">
          Preferences
        </Text>
        <MenuRow icon={icons.search} label="Search History" />

        {/* Danger Zone */}
        <View className="mt-3">
          <MenuRow icon={icons.arrow} label="Sign Out" danger />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
