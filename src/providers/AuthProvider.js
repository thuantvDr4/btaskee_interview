import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //------>RETURN
    return (
        <AuthContext.Provider
            value={{
                isLoading,
                user,
                setUser,
                signIn: async (email, password) => {
                    setIsLoading(true);
                    try {
                        const result = await auth().signInWithEmailAndPassword(
                            email,
                            password
                        );
                        console.log("User account created & signed in!");
                    } catch (err) {
                        if (err.code === "auth/invalid-email") {
                            // console.log("That email address is invalid!");
                            Alert.alert("Thông báo!", "\nEmail không hợp lệ!\n");
                        } else if (err.code === "auth/user-not-found") {
                            Alert.alert("Thông báo!", "\nNgười dùng không tồn tại!\n");
                        } else if (err.code === "auth/wrong-password") {
                            Alert.alert("Thông báo!", "\nMật khẩu không hợp lệ!\n");
                        } else if (err.code === "auth/network-request-failed") {
                            Alert.alert(
                                "Thông báo!",
                                "\nĐã xảy ra lỗi mạng. Vui lòng thử lại!\n"
                            );
                        } else {
                            //
                            console.log("---loginFail:", err);
                        }
                    }
                    setIsLoading(false);
                },
                createNewUser: async (email, password, phone) => {
                    setIsLoading(true);
                    try {
                        await auth().createUserWithEmailAndPassword(email, password, phone);
                    } catch (error) {
                        console.log(error);
                        if (error.code === "auth/email-already-in-use") {
                            // console.log("That email address is already in use!");
                            Alert.alert("Thông báo!", "\nEmail này đã được đăng ký!\n");
                        }

                        if (error.code === "auth/invalid-email") {
                            // console.log("That email address is invalid!");
                            Alert.alert("Thông báo!", "\nEmail không hợp lệ!\n");
                        }
                    }
                    setIsLoading(false);
                },

                googleLogin: async () => {
                    setIsLoading(true);
                    try {
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential =
                            auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential);
                        //
                    } catch (error) {
                        console.log('---googleLogin-error:',error);
                    }
                    setIsLoading(false);
                },

                signOut: async () => {
                    setIsLoading(true);
                    try {
                        await auth().signOut();
                    } catch (err) {
                        console.log(err);
                    }
                    setIsLoading(false);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}