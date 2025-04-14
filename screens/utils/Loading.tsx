import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
// import { Layout, themeColor } from "@/components/ui";

export default function () {
    return (
        <View style={{
                flex: 1,
                minHeight: 100,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ActivityIndicator size="large" color={'#10a2dd'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    button: {
        backgroundColor: '#10a2dd',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10
    }
});