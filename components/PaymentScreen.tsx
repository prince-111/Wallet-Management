import {
  CardField,
  useStripe,
  InitPaymentSheetResult,
  PresentPaymentSheetResult,
  PaymentSheetError,
} from "@stripe/stripe-react-native";
import { useState } from "react";
import { Button, Modal, Text, TextInput, View, StyleSheet, Pressable, Alert } from "react-native";
import { createPaymentIntent } from "./services";

function PaymentScreen() {
  const [card, setCard] = useState(null);
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
     const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState("0");
  
     const [name, setName] = useState<string>("");
    const stripe = useStripe();



    const handleCreatePaymentIntent = async () => {
      try {
        const result = await createPaymentIntent(
          parseInt(amount), // assuming the amount is in dollars, converting to cents
          "usd",
          "cus_Qmm0rij8Ybngo9"
        );
        setPaymentIntent(result);
        setError(null);
        setModalVisible(false); // Close the modal after successful payment intent creation
      } catch (err) {
        setError(err.message);
        setPaymentIntent(null);
      }
    };

    const { confirmPayment } = useStripe();d
    // const subscribe = async () => {
    //   try {
    //     // sending request
    //     const response: Response = await fetch("http://localhost:8080/pay", {
    //       method: "POST",
    //       body: JSON.stringify({ name }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });

    //     const data: { clientSecret: string; message?: string } =
    //       await response.json();

    //     if (!response.ok) {
    //       return Alert.alert(data.message || "Payment failed");
    //     }

    //     const clientSecret = data.clientSecret;

    //     const initSheet: InitPaymentSheetResult = await stripe.initPaymentSheet(
    //       {
    //         paymentIntentClientSecret: clientSecret,
    //       }
    //     );

    //     if (initSheet.error) {
    //       return Alert.alert(
    //         initSheet.error.message || "Failed to initialize payment sheet"
    //       );
    //     }

    //     const presentSheet: PresentPaymentSheetResult =
    //       await stripe.presentPaymentSheet({
    //         clientSecret,
    //       });

    //     if (presentSheet.error) {
    //       return Alert.alert(
    //         presentSheet.error.message || "Failed to present payment sheet"
    //       );
    //     }

    //     Alert.alert("Payment complete, thank you!");
    //   } catch (err) {
    //     console.error(err);
    //     Alert.alert("Something went wrong, try again later!");
    //   }
    // };

    //  const handleCreatePaymentIntent = async () => {
    //    try {
    //      const result = await createPaymentIntent(
    //        7000,
    //        "usd",
    //        "cus_Qmm0rij8Ybngo9"
    //      );
    //      setPaymentIntent(result);
    //      setError(null);
    //    } catch (err) {
    //      setError(err.message);
    //      setPaymentIntent(null);
    //    }
    //  };



    const handlePayPress = async () => {
      // Example client secret from backend (you need to implement this on your server)
      const clientSecret = "your-client-secret-here";

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        type: "Card",
        billingDetails: {
          // You can pass additional billing details here
          email: "email@example.com",
        },
      });

      if (error) {
        console.log("Payment confirmation error", error);
      } else if (paymentIntent) {
        console.log("Payment successful", paymentIntent);
      }
    };
  
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.text}>Add Money</Text>
        </Pressable>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >

          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text>Enter Amount:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.button}
                  onPress={handleCreatePaymentIntent}
                >
                  <Text style={styles.text}>save</Text>
                </Pressable>
                <Pressable
                  style={styles.button}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.text}>Cancel</Text>
                </Pressable>

                {/* <Button title="save" onPress={handleCreatePaymentIntent} /> */}
                {/* <Button title="Cancel" onPress={() => setModalVisible(false)} /> */}
              </View>
            </View>
          </View>
        </Modal>

        {paymentIntent && <Text>Payment Intent Created</Text>}
        {error && <Text>Error: {error}</Text>}
      </View>
      {/* <View>
        <Button
          title="Create Payment Intent"
          onPress={handleCreatePaymentIntent}
        />
        {paymentIntent && (
          <Text>Payment Intent Created</Text>
        )}
        {error && <Text>Error: {error}</Text>}
      </View> */}
      {/* <View>
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            setCard(cardDetails);
          }}
          onFocus={focusedField => {
            console.log("focusField", focusedField);
          }}
        />
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
      rowGap: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#404040",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default PaymentScreen;