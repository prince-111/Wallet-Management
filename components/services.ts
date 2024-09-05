    import axios from "axios";
    import base64 from "react-native-base64";

    const STRIPE_API_BASE_URL = "https://api.stripe.com/v1";
    const STRIPE_SECRET_KEY =
      "sk_test_51PuvoaSJjJ8If3sLatmfnPCc3491hltdaMBZIf1ZbSZ8Uxo4bLUrz3wjokQiR9WQzNsoFFPqKvkDrajZzmgftV7Q00dIiN0YxV";

      const STRIPE_API_URL = 'https://api.stripe.com/v1/payment_intents';
    //  const STRIPE_SECRET_KEY = 'sk_test_51PuvoaSJjJ8If3sLatmfnPCc3491hltdaMBZIf1ZbSZ8UXo4bLUrz3wjokQiR9WQzNsoFFPqKvkDrajZzmgftV7Q00dIiN0YxV';


    export const getPaymentIntents = async () => {
      try {
        const response = await fetch(`${STRIPE_API_BASE_URL}/payment_intents`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Payment Intents:", data);
        return data;
      } catch (error) {
        console.error("Error fetching payment intents:", error);
        throw error;
      }
    };

    export const createPaymentIntent = async (amount, currency, customerId) => {
      try {
        const response = await fetch(STRIPE_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            amount: amount.toString(),
            currency: currency,
            "automatic_payment_methods[enabled]": "true",
            customer: customerId,
          }).toString(),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Payment Intent created:", data);
        return data;
      } catch (error) {
        console.error("Error creating payment intent:", error);
        throw error;
      }
    };



    // export const createPaymentIntent = async (amount, currency, customerId) => {
    //     try {
    //       const authHeader = "Basic " + base64.encode(STRIPE_SECRET_KEY + ":");

    //       const response = await fetch(STRIPE_API_BASE_URL, {
    //         method: "POST",
    //         headers: {
    //           Authorization: authHeader,
    //           "Content-Type": "application/x-www-form-urlencoded",
    //         },
    //         body: new URLSearchParams({
    //           amount: amount.toString(),
    //           currency: currency,
    //           "automatic_payment_methods[enabled]": "true",
    //           customer: customerId,
    //         }).toString(),
    //       });

    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }

    //       const data = await response.json();
    //       console.log("Payment Intent created:", data);
    //       return data;
    //     } catch (error) {
    //       console.error("Error creating payment intent:", error);
    //       throw error;
    //     }
    // };
  
// export const getPaymentIntents = async () => {
//   try {
//     const response = await axios.get(`${STRIPE_API_BASE_URL}/payment_intents`, {
//       headers: {
//         Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
//       },
//     });

//     // Log the response data for debugging
//     console.log("Payment Intents:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching payment intents:", error);
//     throw error;
//   }
// };