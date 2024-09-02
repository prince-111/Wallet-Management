// /app/details.js
import FilterPayment from "@/components/Filter/Filter";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

interface TransactionItemProps {
  name: string;
  date: string;
  amount: string;
  positive?: boolean;
}

export default function History() {
    
    const router = useRouter();

  return (
    <View style={styles.historyContainer}>
        <View><FilterPayment/></View>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>September 2024</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>800</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TransactionItem
          name="Billal"
          date="1 Sept 2024 at 4:20 PM"
          positive={false}
          amount="-$300"
        />
        <TransactionItem
          name="Self"
          date="1 Sept 2024 at 2:42 PM"
          amount="+$500"
          positive
        />
        <TransactionItem
          name="Billal"
          date="1 Sept 2024 at 2:42 PM"
          amount="+$500"
          positive
        />
        <TransactionItem
          name="Bhati"
          date="1 Sept 2024 at 2:42 PM"
          amount="+$500"
          positive
        />
      </ScrollView>
    </View>
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
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
    fontSize: 14,
    color: "#4caf50",
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4caf50",
  },
  withdrawButton: {
    backgroundColor: "#ffcccb",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  withdrawText: {
    fontSize: 14,
    color: "#e57373",
  },
  withdrawAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e57373",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  quickActionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#bdbdbd",
    // marginHorizontal: 5,
  },
  historyContainer: {
    flex: 1,
    margin:0,
    paddingTop: 10,
    // paddingLeft: 15,
    // paddingRight: 15,
    backgroundColor:"white"
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    paddingLeft: 6,
    paddingRight: 10,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: "normal",
    padding: 6,
    // backgroundColor: "#f5f5f5",
  },
  seeAllText: {
    color: "#2196f3",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
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
    color:"black"
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  positiveAmount: {
    color: "#4caf50",
  },
  negativeAmount: {
    color: "#e57373",
  },
});