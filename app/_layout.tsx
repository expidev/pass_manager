import { Stack } from 'expo-router';
import { useState } from 'react';
import LockScreen from './lock';

// Root Layout, enabling the locks on top of everything
export default function RootLayout() {
  const [isLocked, setIsLocked] = useState(true);

  if (isLocked) {
    return <LockScreen setIsLocked={setIsLocked} />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}