import { StyleSheet, Image, Platform, TextInput, View, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import { Button, RadioButton } from 'react-native-paper';

const data = [
  { label: 'Sedentary (little or no exercise) ', value: '1.2' },
  { label: 'Light (1-3 times/week)', value: '1.375' },
  { label: 'Moderate (4-5 times/week)', value: '1.55' },
  { label: 'Active (6-7 times/week)', value: '1.9' },
];

export default function TabTwoScreen() {
  const [isFocus, setIsFocus] = useState(false);

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [calories, setCalories] = useState(0);

  const calculateCalories = () => {
    // TODO: Implement calorie calculation logic
    // for men 
    // BMR=10×weight (kg)+6.25×height (cm)−5×age+5
    // for women 
    // BMR=10×weight (kg)+6.25×height (cm)−5×age−161
    // TDEE = BMR x Activity Level
    if (!age || !weight || !height || !gender || !activityLevel) return;

    const bmr = gender === 'male' ? 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5 : 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
    const tdee = bmr * Number(activityLevel);
    setCalories(tdee);
  }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/calories.jpg')}
          style={styles.caloriesImage}
        />
      }>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 35, fontWeight: 700, color: '#fff' }}>Calorie Calculator</Text>
      </View>
      <Text style={{ fontSize: 17, fontWeight: 400, color: '#fff' }}>Calculate your daily calorie needs.</Text>

      <TextInput keyboardType="numeric" value={age} onChangeText={(text) => setAge(text)} style={styles.textInput} placeholderTextColor={'white'} placeholder="Enter your age" />

      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Gender</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value="male"
            status={gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('male')}
            color={gender === 'male' ? '#1CAC78' : '#808080'}
          />
          <Text style={{ color: '#fff' }}>Male</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value="female"
            status={gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('female')}
            color={gender === 'female' ? '#1CAC78' : '#808080'}
          />
          <Text style={{ color: '#fff' }}>Female</Text>
        </View>
      </View>

      <TextInput keyboardType="numeric" value={weight} onChangeText={(text) => setWeight(text)} style={styles.textInput} placeholderTextColor={'white'} placeholder="Enter your weight (kg)" />
      <TextInput keyboardType="numeric" value={height} onChangeText={(text) => setHeight(text)} style={styles.textInput} placeholderTextColor={'white'} placeholder="Enter your height (cm)" />
      {/* <TextInput style={styles.textInput} placeholder="Enter your activity level" /> */}

      <View style={styles.container}>
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'white' }]}
          placeholderStyle={{ color: 'white' }}
          selectedTextStyle={{ color: 'white' }}
          // inputSearchStyle={styles.inputSearchStyle}
          // iconStyle={styles.iconStyle}
          data={data}
          maxHeight={220}
          labelField="label"
          valueField="value"
          placeholder='Select activity level'
          value={activityLevel}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setActivityLevel(item.value);
            setIsFocus(false);
          }} />
      </View>

      <Button onPress={calculateCalories} style={styles.button} ><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Calculate</Text></Button>

      {
        calories > 0 && (
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: 400, color: '#fff', marginBottom: 10 }}>Here's your TDEE</Text>

            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#018bf450', padding: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Extreme Loss:</Text>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}>{(Number(calories) - 700).toFixed(0)} Calories</Text>
            </View>

            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#018bf475', padding: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Weight loss:</Text>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}>{(Number(calories) - 300).toFixed(0)} Calories</Text>
            </View>

            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#018bf4', padding: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Maintain weight:</Text>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}>{calories.toFixed(0)} Calories</Text>
            </View>

            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#018bf475', padding: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Weight gain:</Text>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}>{(Number(calories) + 300).toFixed(0)} Calories</Text>
            </View>

            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#018bf450', padding: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Extreme Gain:</Text>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}>{(Number(calories) + 700).toFixed(0)} Calories</Text>
            </View>
          </View>
        )
      }

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // padding: 16,
  },
  caloriesImage: {
    height: 250,
    width: '100%',
  },
  dropdown: {
    width: '100%',
    height: 50,
    color: '#808080',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    // backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 5,
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1CAC78',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 5,
  }
});
