// import Slot from "expo-router/Slot";

import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";

import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";
import { AuthContextProvider, useAuth } from "../context/authContext";

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated or not
        if (typeof isAuthenticated == "undefined") return;
        const inApp = segments[0] == "(app)";
        if (isAuthenticated == true) {
            console.log(inApp);
            //redirect the user to home
            router.replace("home");
        } else if (isAuthenticated == false) {
            // redirect to sign in
            router.replace("signIn");
        }
    }, [isAuthenticated]);

    return <Slot />;
};
export default function RootLayout() {
    return (
        <MenuProvider>
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    );
}
