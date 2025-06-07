import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";
import ChatItem from "./ChatItem";

export default function ChatList({ users }) {
    const router = useRouter();
    return (
        <View className="flex-1">
            <FlatList
                data={users}
                contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
                keyExtractor={(item) => Math.random()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <ChatItem
                        item={item}
                        index={index}
                        noBorder={index + 1 == users.length}
                        router={router}
                    />
                )}
            />
            <Text> textInComponent </Text>
        </View>
    );
}
