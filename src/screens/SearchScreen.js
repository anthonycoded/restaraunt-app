import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import yelp from "../api/yelp";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  /////FILTER RESUTS BY PRICE
  const filterResults = (price) => {
    //price === "$" || "$$$"
    return results.filter((result) => {
      return result.price === price;
    });
  };

  ////sEARCH YELP API
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

  /////INITIAL YELP SEARCH ON PAGE LOAD
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
      <ResultsList
        results={filterResults("$")}
        title="Cost Effective"
      ></ResultsList>
      <ResultsList
        results={filterResults("$$")}
        title="Bit Pricier"
      ></ResultsList>
      <ResultsList
        results={filterResults("$$$")}
        title="Big Spender"
      ></ResultsList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 4,
  },
});

export default SearchScreen;
