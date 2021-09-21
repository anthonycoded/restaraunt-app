import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const ResultDetails = ({ result }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: result.image_url }} style={styles.image}></Image>
      <Text style={styles.name}>{result.name}</Text>
      <Text>
        {result.rating} Stars, {result.review_count} Reviews
      </Text>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 5,
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ResultDetails;
