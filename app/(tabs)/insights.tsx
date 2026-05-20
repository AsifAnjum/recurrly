import { styled } from "nativewind";
import { Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
export default function Insights() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <Text className="text-lg font-semibold text-slate-800 dark:text-white">Insights Screen</Text>
      </View>
    </SafeAreaView>
  );
}
