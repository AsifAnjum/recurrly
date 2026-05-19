import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
      <Text className="text-lg font-semibold text-slate-800 dark:text-white">Home Screen</Text>
      <Link href='/(auth)/sign-in' className='text-blue-500'>Sign In</Link>
      <Link href='/(auth)/sign-up' className='text-blue-500'>Sign Up</Link>
      <Link href={{pathname:'/subscriptions/[id]', params:{id:'spotify'}}} className='text-white'>Spotify Subscription</Link>
      <Link href={{pathname:'/subscriptions/[id]', params:{id:'claude'}}} className='text-white'>Claude Max Subscription</Link>
    </View>
  );
}
