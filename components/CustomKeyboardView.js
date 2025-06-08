import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
const ios = Platform.OS == "ios";
export default function CustomKeyboardView({ children, inChat }) {
    let kavConfig = {};
    let scrollViewCOnfig = {};

    if (inChat) {
        kavConfig = { keyboardVerticalOffset: 90 };
        scrollViewCOnfig = { contentContainerStyle: { flex: 1 } };
    }
    return (
        <KeyboardAvoidingView
            behavior={ios ? "padding" : "height"}
            style={{ flex: 1 }}
            {...kavConfig}
        >
            <ScrollView
                style={{ flex: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                {...scrollViewCOnfig}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
