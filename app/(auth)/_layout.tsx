import "@/global.css";
import { useSession } from "@clerk/expo";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
    const { isSignedIn } = useSession();

    useEffect(() => {
        if (isSignedIn) {
            router.replace('/');
        }
    }, [isSignedIn]);

    return <Stack screenOptions={{
        headerShown: false
    }} />;
}