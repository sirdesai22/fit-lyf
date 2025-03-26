import { StyleSheet, Image, Platform, SafeAreaView, View, SafeAreaViewComponent, ScrollView, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from 'react-native-paper';

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.content}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">User Feed</ThemedText>
        <Button style={{ backgroundColor: '#d81f26', borderRadius: 5 }}><Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Logout</Text></Button>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 25,
    paddingTop: 35,
    gap: 16,
    overflow: 'hidden',
  },
});
