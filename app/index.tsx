import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AddMoney from "@/components/Add Money/AddMoney";
import AddCardDetails from "@/components/Add Card/AddCardDetails";
import { useRouter } from "expo-router";
import Test from "@/components/test";
import PaymentScreen from "@/components/PaymentScreen";
import History from "./History";
import { CardField } from "@stripe/stripe-react-native";

interface TransactionItemProps {
  name: string;
  date: string;
  amount: string;
  positive?: boolean;
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const handlePayPress = async () => {
    // Example client secret from backend (you need to implement this on your server)
    const clientSecret = "sk_test_51PuvoaSJjJ8If3sLatmfnPCc3491hltdaMBZIf1ZbSZ8Uxo4bLUrz3wjokQiR9WQzNsoFFPqKvkDrajZzmgftV7Q00dIiN0YxV";

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
      {/* <Test /> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>K</Text>
          </View>
          <View style={styles.welcomeText}>
            <Text style={styles.greeting}>Hi, Kumar</Text>
            <Text style={styles.subGreeting}>Good Morning</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceContainer}>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>
              <Ionicons name="wallet" size={16} color="green" /> Balance
            </Text>
            <Text style={styles.balanceAmount}>$ 20,000</Text>
          </View>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.monthText}>In Month</Text>
            <Text style={styles.withdrawText}>
              <Fontisto name="wallet" size={14} color="red" /> Withdraw
            </Text>
            <Text style={styles.withdrawAmount}>$ 10,000</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionContainer}>
          <View>
            <PaymentScreen />
          </View>
          <View>
            <Pressable style={styles.button}>
              <Text style={styles.text}>Add Card</Text>
            </Pressable>
            {/* <Button title="Add Card"></Button> */}
          </View>
        </View>


        <View style={styles.DivContainer}></View>

        <View style={styles.Divider}></View>
        <View style={styles.Divider}></View>
        <View style={styles.Divider}></View>

        {/* <View style={styles.actionContainer}> */}
        {/* <TouchableOpacity style={styles.actionButton}> */}
        {/* <AddCardDetails /> */}
        {/* <AddMoney/> */}
        {/* <Text style={styles.actionText}>Add Money</Text> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity
            onPress={() => router.push("/")}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>Add Card</Text>
          </TouchableOpacity> */}
        {/* </View> */}

        <View style={styles.quickActions}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <View key={index} style={styles.quickActionDot} />
          ))}
        </View>

        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>History</Text>
            <TouchableOpacity>
              <Text
                onPress={() => router.push("/History")}
                style={styles.seeAllText}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <History />
            {/* <TransactionItem
                name="Billal"
                date="1 Sept 2024 14:42"
                positive={false}
                amount="-$300"
              />
              <TransactionItem
                name="Billal"
                date="1 Sept 2024 14:42"
                amount="+$500"
                positive
              /> */}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  name,
  date,
  amount,
  positive,
}) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionIcon}>
      <Text style={styles.transactionInitial}>{name[0]}</Text>
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionName}>{name}</Text>
      <Text style={styles.transactionDate}>{date}</Text>
    </View>
    <Text
      style={[
        styles.transactionAmount,
        positive ? styles.positiveAmount : styles.negativeAmount,
      ]}
    >
      {amount}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 60,
  },
  DivContainer: {
    height: 50,
    width: 380,
    borderColor: "black",
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
    marginBottom: 8,
  },
  Divider: {
    height: 15,
    width: 380,
    borderColor: "black",
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#A0A0A0",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: "bold",
  },
  welcomeText: {
    marginLeft: 10,
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subGreeting: {
    fontSize: 14,
    color: "#666",
  },
  notificationIcon: {
    padding: 5,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  balanceBox: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  balanceLabel: {
    fontSize: 18,
    color: "#4caf50",
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4caf50",
  },
  withdrawButton: {
    backgroundColor: "#ffcccb",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  withdrawText: {
    fontSize: 18,
    color: "#e57373",
  },
  monthText: {
    fontSize: 8,
    color: "black",
  },
  withdrawAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e57373",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    color: "#333",
  },
  quickActions: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  quickActionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#bdbdbd",
    marginHorizontal: 5,
  },
  historyContainer: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#2196f3",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  transactionInitial: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 15,
  },
  positiveAmount: {
    color: "#4caf50",
  },
  negativeAmount: {
    color: "#e57373",
  },
});
