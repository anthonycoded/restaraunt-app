import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import yelp from "../api/yelp";

const ResultDetailScreen = ({ navigation, route }) => {
  const [result, setResult] = useState(null);
  const [reviews, setReviews] = useState(null);
  const { id } = route.params;

  ///YELP API SEARCH ONE RESTARAUT BY ID
  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    let data = response.data;
    setResult(data);
  };

  const getReviews = async (id) => {
    const response = await yelp.get(`/${id}/reviews`);
    let data = response.data;
    setReviews(data.reviews);
  };

  useEffect(() => {
    getResult(id);
    getReviews(id);
  }, []);

  if (!result) {
    return null;
  }

  if (!reviews) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: result.image_url }} style={styles.image}></Image>
      <View style={styles.heading}>
        <Text style={styles.title}>{result.name}</Text>
        <Text>{result.location.display_address}</Text>
        <Text>
          {result.rating} Stars, {result.review_count} Reviews
        </Text>
      </View>

      <ScrollView>
        <FlatList
          horizontal
          data={result.photos}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => {
            return <Image style={styles.photos} source={{ uri: item }}></Image>;
          }}
        ></FlatList>
        <View style={styles.reviewContainer}>
          <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 10 }}>
            Reviews
          </Text>
          {reviews.map((item, i) => (
            <View style={styles.review} key={i}>
              <Text style={styles.rating}>{item.rating} Star Rating</Text>
              <Text style={styles.review}>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  image: {
    height: 180,
    width: "100%",
  },
  photos: {
    height: 200,
    width: 200,
    marginBottom: 10,
  },
  rating: {
    fontWeight: "400",
    fontSize: 20,
  },
  reviewContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  review: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ResultDetailScreen;
