import { Octicons } from "@expo/vector-icons";
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
export default function SignIn() {
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Sign In", "Please fill out all the fields!");
            return;
        }
        setLoading(true);
        let response = await login(emailRef.current, passwordRef.current);
        setLoading(false);
        if (!response.success) {
            Alert.alert("Sign In", response.msg);
        }
    };
    return (
        <CustomKeyboardView>
            <StatusBar style="dark" />
            <View
                className="flex-1 gap-12"
                style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
            >
                {/* Sign In Image */}
                <View className="items-center">
                    <Image
                        style={{ height: hp(25) }}
                        resizeMode="contain"
                        source={require("../assets/images/login.png")}
                    />
                </View>
                <View className="gap-10">
                    <Text
                        style={{ fontSize: hp(4) }}
                        className="font-bold tracking-wider text-center text-neutral-800"
                    >
                        Sign In
                    </Text>
                    {/* Inputs */}
                    <View className="gap-4">
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
                        <View className="gap-3">
                            <View
                                style={{ height: hp(7) }}
                                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
                            >
                                <Octicons
                                    name="lock"
                                    size={hp(2.7)}
                                    color="gray"
                                />
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
                            <Text
                                style={{ fontSize: hp(1.8) }}
                                className="font-semibold text-right text-neutral-400"
                            >
                                Forgot password?
                            </Text>
                        </View>
                        {/* Submit Button */}
                        <View>
                            {loading ? (
                                <View className="flex-row justify-center">
                                    <Loading size={hp(6.5)} />
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={handleLogin}
                                    className="bg-indigo-500 rounded-xl justify-center items-center"
                                    style={{ height: hp(6.5) }}
                                >
                                    <Text
                                        style={{ fontSize: hp(2.7) }}
                                        className="text-white font-bold tracking-wider"
                                    >
                                        {" "}
                                        Sign In
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
                                Don't have an account?
                            </Text>
                            <Pressable
                                onPress={() => {
                                    router.push("signUp");
                                }}
                            >
                                <Text
                                    style={{ fontSize: hp(1.8) }}
                                    className="font-semibold text-indigo-500"
                                >
                                    Sign Up
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
}
