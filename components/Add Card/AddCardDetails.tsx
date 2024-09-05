import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { FontAwesome, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { CardField } from "@stripe/stripe-react-native";
// import PaymentScreen from "../PaymentScreen";

export default function AddCardDetails() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showCvv, setShowCvv] = useState(false);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1); // 1 for card details, 2 for enter amount
  const [card, setCard] = useState(null);
  

  return (
    <View style={styles.container}>
      {/* Button to Open Modal */}
      <TouchableOpacity
        // style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text>Add Money</Text>
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            {step === 1 ? (
              <>
                <Text style={styles.modalTitle}>Enter Card Details</Text>
                {/* <SimpleLineIcons name="credit-card" size={74} color="black" /> */}

                <TextInput
                  style={styles.input}
                  placeholder="Card Number"
                  keyboardType="numeric"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Card Holder Name"
                  value={cardHolderName}
                  onChangeText={setCardHolderName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Expiry Date (MM/YY)"
                  keyboardType="numeric"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                />
                <View style={styles.cvvContainer}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="CVV"
                    secureTextEntry={!showCvv}
                    keyboardType="numeric"
                    value={cvv}
                    onChangeText={setCvv}
                  />
                  <TouchableOpacity onPress={() => setShowCvv(!showCvv)}>
                    <Ionicons
                      name={showCvv ? "eye-off" : "eye"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.button, styles.buttonNext]}
                  onPress={() => setStep(2)}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Enter Add Amount</Text>
                <TextInput
                  style={styles.input}
                  placeholder="$ 0.00"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />

                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => {
                    // Handle save logic here
                    setModalVisible(false);
                    setStep(1);
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  cvvContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonNext: {
    backgroundColor: "#4CAF50",
    padding: 10,
  },
  buttonSave: {
    backgroundColor: "#FF5722",
    padding: 10,
  },
});
