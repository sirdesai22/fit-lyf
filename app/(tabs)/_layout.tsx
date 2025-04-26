import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === 'journal') iconName = 'mood';
          else if (route.name === 'mysquad') iconName = 'local-fire-department';
          else if (route.name === 'habitTracker') iconName = 'apps';
          else if (route.name === 'index') iconName = 'insights';

          // return <Ionicons name={iconName} size={size} color={color} />;
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#018bf4',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Analytics' }} />
      <Tabs.Screen name="journal" options={{ title: 'Journal' }} />
      <Tabs.Screen name="mysquad" options={{ title: 'My Squad' }} />
      <Tabs.Screen name="habitTracker" options={{ title: 'Habit Tracker' }} />
    </Tabs>
  );
}
