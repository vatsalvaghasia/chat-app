import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
export default function ChatRoomHeader({ user, router }) {
    return (
        <Stack.Screen
            options={{
                title: "",
                // title: "Hello",
                headerShadowVisible: false,
                headerLeft: () => (
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity
                            onPress={() => {
                                console.log("Presses");
                                router.back();
                            }}
                        >
                            <Entypo
                                name="chevron-left"
                                size={hp(3)}
                                color="#737373"
                            />
                        </TouchableOpacity>
                        <View className="flex-row items-center gap-8">
                            <Image
                                source={user?.profileUrl}
                                style={{
                                    height: hp(4.5),
                                    aspectRatio: 1,
                                    borderRadius: 100,
                                }}
                            />
                            <Text
                                className="text-neutral-700 font-medium"
                                style={{ fontSize: hp(2.5) }}
                            >
                                {user?.username}
                            </Text>
                        </View>
                    </View>
                ),
                headerRight: () => (
                    <View className="flex-row items-center gap-8">
                        <Ionicons
                            name="call"
                            size={hp(2.5)}
                            color={"#737373"}
                        />
                        <Ionicons
                            name="videocam"
                            size={hp(2.5)}
                            color={"#737373"}
                        />
                    </View>
                ),
            }}
        />
    );
}
