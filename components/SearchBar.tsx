import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}   
// here i am deconstructuring the props that i will be passing to the search bar component, which includes a placeholder for the text input and an onPress function that will be called when the user presses the search bar. the void type indicates that the function does not return anything. this is a common pattern for event handlers in react native.

const SearchBar = ({placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#A8B5DB"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        placeholderTextColor="#A8B5DB"
        value={value}
        onChangeText={(text) => onChangeText?.(text)}
        className="ml-3 flex-1 text-white"
      />
    </View>
  );
};

export default SearchBar;
