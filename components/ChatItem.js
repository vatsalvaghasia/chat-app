import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { blurhash } from "../utils/common";
export default function ChatItem({ item, noBorder, router }) {
    return (
        <TouchableOpacity
            className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
                noBorder ? "" : "border-b border-b-neutral-200"
            }  `}
        >
            {/* <Image
                source={require({item.profileUrl})}
                style={{ height: hp(6), width: hp(6) }}
                className="rounded-full"
            /> */}
            <Image
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
                source={item?.profileUrl}
                placeholder={blurhash}
                transition={500}
            />

            {/* name and last message */}
            <View className="flex-1 gap-1">
                <View className="flex-row justify-between">
                    <Text
                        style={{ fontSize: hp(1.8) }}
                        className="font-semibold text-neutal-800"
                    >
                        {item?.username}
                    </Text>
                    <Text
                        style={{ fontSize: hp(1.6) }}
                        className="font-medium text-neutal-500"
                    >
                        Time
                    </Text>
                </View>
                <Text
                    style={{ fontSize: hp(1.6) }}
                    className="font-medium text-neutral-500"
                >
                    Last message
                </Text>
            </View>
        </TouchableOpacity>
    );
}
