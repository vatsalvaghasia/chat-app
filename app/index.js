import { ActivityIndicator, Text, View } from "react-native";
// import "../global.cs";
export default function StartPage() {
    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="gray" />
            <Text>Loading</Text>
        </View>
    );
}
