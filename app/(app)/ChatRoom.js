import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Keyboard,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import MessageList from "../../components/MessageList";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import { getRoomId } from "../../utils/common";

export default function ChatRoom() {
    const item = useLocalSearchParams(); // second user
    const { user } = useAuth(); //logged in user
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef();
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();
        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => {
                return doc.data();
            });
            setMessages([...allMessages]);
        });

        const KeyBoardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            updateScrollView
        );

        return () => {
            unsub();
            KeyBoardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        updateScrollView();
    }, [messages]);

    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date()),
        });
    };
    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if (!message) return;
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, "rooms", roomId);
            const messagesRef = collection(docRef, "messages");
            textRef.current = "";
            if (inputRef) {
                inputRef?.current?.clear();
            }
            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date()),
            });

            console.log("new message id:", newDoc.id);
        } catch (e) {
            Alert.alert("Message", e.message);
        }
    };

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 100);
    };
    // console.log("got messages:", messages);
    return (
        <CustomKeyboardView inChat={true}>
            <View className="flex-1 bg-white">
                <StatusBar style="dark" />
                <ChatRoomHeader user={item} router={router} />
                <View className="h-3 border-b border-neutral-200" />
                <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                    <View className="flex-1">
                        <MessageList
                            scrollViewRef={scrollViewRef}
                            messages={messages}
                            currentUser={user}
                        />
                    </View>
                    <View style={{ marginBottom: hp(2.7) }} className="pt-2">
                        <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                            <TextInput
                                ref={inputRef}
                                onChangeText={(value) =>
                                    (textRef.current = value)
                                }
                                className="flex-1 mr-2"
                                style={{ fontSize: hp(2) }}
                                placeholder="Type message...."
                            />
                            <TouchableOpacity
                                className="bg-neutral-200 p-2 mr-[1px] rounded-full"
                                onPress={handleSendMessage}
                            >
                                <Feather
                                    name="send"
                                    size={hp(2.7)}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
}
