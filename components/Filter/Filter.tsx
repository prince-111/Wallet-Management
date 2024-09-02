import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function FilterPayment() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Filter Icon Button */}
        <TouchableOpacity style={styles.button}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>

        {/* Date Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Date</Text>
        </TouchableOpacity>

        {/* Receive Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Receive</Text>
        </TouchableOpacity>

        {/* Send Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // Background color of the screen
  },
  scrollContainer: {
    paddingHorizontal: 10, // Adds padding to the left and right sides of the scroll view
    marginBottom: 10, // Adds padding to the top and bottom sides of the scroll view
  },
  button: {
    flexDirection: "row", // Ensures icons and text are in a row
    alignItems: "center", // Center the content vertically
    justifyContent: "center", // Center the content horizontally
    paddingHorizontal: 15, // Horizontal padding inside the button
    marginHorizontal: 5, // Margin between buttons
    borderWidth: 1, // Border width
    borderColor: "black", // Border color
    backgroundColor: "white", // Background color of the button
    borderRadius: 20, // Rounded corners
    height: 40, // Set fixed height for the button
  },
  buttonText: {
    fontSize: 16, // Text size
    color: "black", // Text color
  },
});