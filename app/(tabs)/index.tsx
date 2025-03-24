import { Image, StyleSheet, Platform, TextInput, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native-paper';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/foods.jpg')}
          style={styles.foodsImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Journal your progress!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.dataViewer}>

      </ThemedView>

      <ThemedView style={styles.textInputContainer}>
        <TextInput style={styles.textInput} placeholderTextColor={'white'} placeholder="Enter food/exercise..." />
        <Button style={styles.button} ><IconSymbol size={20} name="paperplane.fill" color={'white'} /></Button>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  foodsImage: {
    height: 250,
    width: '100%',
  },
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#808080',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 12,
    color: '#fff',
    position: 'relative',
    bottom: 0,
  },
  textInputContainer: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    // gap: 8,
    paddingHorizontal: 15,
  },
  dataViewer: {
    width: '100%',
    height: 450,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1CAC78',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }
});
