import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { posthog } from '../../src/config/posthog';

export default function SubscriptionDetails() {
  const { id } = useLocalSearchParams<{id: string}>();

  useEffect(() => {
    posthog.capture('subscription_viewed', { subscription_id: id })
  }, [id])

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
      <Text className="text-lg font-semibold text-slate-800 dark:text-white">
        Subscription ID: {id}
      </Text>
      <Link href="/" className='text-blue-500'>Go Back</Link>
    </View>
  );
}
