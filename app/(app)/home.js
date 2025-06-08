import { StatusBar } from "expo-status-bar";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatList from "../../components/ChatList";
import { useAuth } from "../../context/authContext";
import { usersRef } from "../../firebaseConfig";
export default function Home() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const q = query(usersRef, where("userId", "!=", user?.uid));
        // const q = query(usersRef);
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({
                ...doc.data(),
            });
        });
        console.log(data, user?.uid);
        setUsers(data);
    };

    useEffect(() => {
        if (user?.uid) {
            console.log(user.uid);
            getUsers();
        }
    }, []);
    return (
        <View className="flex-1 bg-white">
            <StatusBar style="light" />
            {users.length > 0 ? (
                <ChatList users={users} currentUser={user} />
            ) : (
                <View className="flex items-center" style={{ top: hp(30) }}>
                    <ActivityIndicator size="large" />
                    {/* <Loading size={hp(10)}/> */}
                </View>
            )}
        </View>
    );
}
