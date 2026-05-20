import { Link } from 'expo-router';
import { styled } from "nativewind";
import { Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
export default function Home() {
  return (

    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg font-semibold text-slate-800 dark:text-white">Home Screen</Text>
        <Link href='/(auth)/sign-in' className='text-blue-500'>Sign In</Link>
        <Link href='/(auth)/sign-up' className='text-blue-500'>Sign Up</Link>
        <Link href={{ pathname: '/subscriptions/[id]', params: { id: 'spotify' } }} className='text-white'>Spotify Subscription</Link>
        <Link href={{ pathname: '/subscriptions/[id]', params: { id: 'claude' } }} className='text-white'>Claude Max Subscription</Link>
      </View>
    </SafeAreaView>
  );
}
