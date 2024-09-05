import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native";
import React,{useEffect, useState} from "react";
import {Button, Image, Text, View, Alert, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStripe } from "@stripe/stripe-react-native";

const Main = () => {
    const [ready, setReady] = useState(false);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const { paymentIntent, loading, error } = usePaymentSheet();
     
    useEffect(() => {
        initialisePaymentSheet();
    })

    const initialisePaymentSheet = async () => {
        const { error, paymentSheet } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: "1234",
            customerEphemeralKeySecret: "1234",
            paymentIntentClientSecret: paymentIntent?.client_secret,
            allowsDelayedPaymentMethods: true,
            returnURL:"stripe-example://stripe-redirect",

            applePay: {
                merchantCountryCode: "US",
            },

            googlePay: {
                merchantCountryCode: "US",
            },
        });

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else if (paymentSheet) {
            setReady(true);
        }
    };

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                paymentIntentClientSecret: paymentIntent?.client_secret,
            }),
        });
        const {paymentIntent, ephemeralKey, customer} = await response.json();
        return {paymentIntent, ephemeralKey, customer};
};

async function buy(){
    const {error} = await presentPaymentSheet();
    if(error){
        Alert.alert(`Error code: ${error.code}`, error.message);
    }else{
        Alert.alert("Success", "The payment was confirmed successfully!");
    }
}

return (
    <View style={styles.container}>
        <StripeProvider 
        publishableKey = {PUBLISHABLE_KEY}
            merchantIdentifier={MERCHANT_ID}>

           <Button title="Pay" onPress={buy} />

        </StripeProvider>
    </View>
)