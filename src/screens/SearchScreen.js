import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import yelp from "../api/yelp";
import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (searchQuery) => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 25,
          location: "tampa",
          term: searchQuery,
        },
      });
      let data = response.data;

      console.log(data.businesses);
      setResults(data.businesses);
    } catch (error) {
      setErrorMsg("Something went wrong. Try again later");
    }
  };

  useEffect(() => {
    submit("tampa");
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        query={query}
        onTermChange={setQuery}
        onSubmit={() => submit(query)}
      ></SearchBar>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      <Text>{results.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default SearchScreen;
