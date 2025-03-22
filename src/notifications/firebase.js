// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCFZFIdl1qTKo9hrWwYXc_2T8Cj98YgrmA",
    authDomain: "h3lth-18b24.firebaseapp.com",
    projectId: "h3lth-18b24",
    storageBucket: "h3lth-18b24.firebasestorage.app",
    messagingSenderId: "1086454241381",
    appId: "1:1086454241381:web:4d3c00d9915dd1dac3ce8c",
    measurementId: "G-VCM2CENCLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log("permission", permission)
    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: "BAYWmI64EsmGz5wGr1PZbCYlhMlLZ1ZksAA41B0NdkQZbGmC9TIWiORpYUsJSY5z66mrrQ2gccWlgpzMFsp4f40"
        })
        console.log("tokennnn", token)
        if (typeof window !== "undefined") {
            localStorage.setItem("fcm_token", token);
        }
    }

}