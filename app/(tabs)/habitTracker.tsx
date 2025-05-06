// App.js or your screen component
import { AntDesign } from '@expo/vector-icons';
import HeatMap from '@ncuhomeclub/react-native-heatmap';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const opacitys = [
    {
        opacity: 0.2,
        limit: 5,
    },
    {
        opacity: 0.4,
        limit: 10,
    },
    {
        opacity: 0.6,
        limit: 15,
    },
    {
        opacity: 0.8,
        limit: 20,
    },
    {
        opacity: 1,
        limit: 25,
    },
]

export default function App() {
    const habitData = Array.from({ length: 250 }, () => Math.floor(Math.random() * 100));
    return (
        <View>
            <View style={styles.navbar}>
                <Text style={styles.branding}>Habit Tracker</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
            <Button style={{backgroundColor:'#fff', width:120}}><Text style={{color: '#000', fontSize: 15, fontWeight: 700}}>New Habit</Text> </Button>
            </View>

            <ScrollView style={{ padding: 20, paddingTop:0 }}>
                <View style={[styles.habitContainer]}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 7 }}>
                        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500', }}>Book Reading</Text>
                        <AntDesign name="checkcircle" size={24} color="#FF6B6B" />
                    </View>
                    <HeatMap data={habitData} color={{ theme: '#FF6B6B', opacitys: opacitys }} shape='circle' />
                </View>

                <View style={[styles.habitContainer]}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 7 }}>
                        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500', }}>Journaling</Text>
                        <AntDesign name="checkcircle" size={24} color="#F8F8FF" />
                    </View>
                    <HeatMap data={habitData} color={{ theme: '#F8F8FF', opacitys: opacitys }} shape='circle' />
                </View>

                <View style={[styles.habitContainer]}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 7 }}>
                        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500', }}>Gym/Workout</Text>
                        <AntDesign name="checkcircle" size={24} color="#e6fe4e" />
                    </View>
                    <HeatMap data={habitData} color={{ theme: '#e6fe4e', opacitys: opacitys }} shape='circle' />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    habitContainer: {
        backgroundColor: '#121212',
        borderRadius: 25,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 15,
        paddingTop: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //height: 200,
        //borderColor: '#d9fe7d', 
        //backgroundColor: '#d9fe7d50',
        marginTop: 15,
    },
    navbar: {
        backgroundColor: '#121212',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    branding: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '700',
    },
});