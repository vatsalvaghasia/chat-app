import { Feather, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomKeyboardView from "../components/CustomKeyboardView";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";
export default function SignUp() {
    const router = useRouter();
    const { register } = useAuth();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");
    const [loading, setLoading] = useState(false);
    const handleRegister = async () => {
        if (
            !emailRef.current ||
            !passwordRef.current ||
            !usernameRef.current ||
            !profileRef.current
        ) {
            Alert.alert("Sign Up", "Please fill out all the fields!");
            return;
        }
        setLoading(true);
        let response = await register(
            emailRef.current,
            passwordRef.current,
            usernameRef.current,
            profileRef.current
        );
        setLoading(false);
        if (!response.success) {
            Alert.alert("Sign Up", response.msg);
        }
    };
    return (
        <CustomKeyboardView>
            <StatusBar style="dark" />
            <View
                className="flex-1 gap-12"
                style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
            >
                {/* Sign In Image */}
                <View className="items-center">
                    <Image
                        style={{ height: hp(20) }}
                        resizeMode="contain"
                        source={require("../assets/images/register.png")}
                    />
                </View>
                <View className="gap-10">
                    <Text
                        style={{ fontSize: hp(4) }}
                        className="font-bold tracking-wider text-center text-neutral-800"
                    >
                        Sign Up
                    </Text>
                    {/* Inputs */}
                    <View className="gap-4">
                        <View
                            style={{ height: hp(7) }}
                            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
                        >
                            <Feather name="user" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={(value) =>
                                    (usernameRef.current = value)
                                }
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-netural-700"
                                placeholder="Username"
                                placeholderTextColor={"gray"}
                            />
                        </View>
                        <View
                            style={{ height: hp(7) }}
                            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
                        >
                            <Octicons name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={(value) =>
                                    (emailRef.current = value)
                                }
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-netural-700"
                                placeholder="Email address"
                                placeholderTextColor={"gray"}
                            />
                        </View>

                        <View
                            style={{ height: hp(7) }}
                            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
                        >
                            <Octicons name="lock" size={hp(2.7)} color="gray" />
                            <TextInput
                                secureTextEntry
                                onChangeText={(value) =>
                                    (passwordRef.current = value)
                                }
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-netural-700"
                                placeholder="Password"
                                placeholderTextColor={"gray"}
                            />
                        </View>
                        <View
                            style={{ height: hp(7) }}
                            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
                        >
                            <Feather name="image" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={(value) =>
                                    (profileRef.current = value)
                                }
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-netural-700"
                                placeholder="Profile url"
                                placeholderTextColor={"gray"}
                            />
                        </View>

                        {/* Submit Button */}
                        <View>
                            {loading ? (
                                <View className="flex-row justify-center">
                                    <Loading size={hp(6.5)} />
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={handleRegister}
                                    className="bg-indigo-500 rounded-xl justify-center items-center"
                                    style={{ height: hp(6.5) }}
                                >
                                    <Text
                                        style={{ fontSize: hp(2.7) }}
                                        className="text-white font-bold tracking-wider"
                                    >
                                        {" "}
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Sign Up text */}

                        <View className="flex-row justify-center">
                            <Text
                                style={{ fontSize: hp(1.8) }}
                                className="font-semibold text-neutral-500"
                            >
                                Already have an account?
                            </Text>
                            <Pressable
                                onPress={() => {
                                    router.push("signIn");
                                }}
                            >
                                <Text
                                    style={{ fontSize: hp(1.8) }}
                                    className="font-semibold text-indigo-500"
                                >
                                    Sign In
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
}
