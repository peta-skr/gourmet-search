import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading, Select, Button, Flex, Box, Text } from "@chakra-ui/react";

const SearchInput = ({ data, setData, setAvailable }) => {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState("34.67");
  const [longitude, setLongitude] = useState("135.52");
  // const [range, setRange] = useState(0);

  const URL = `http://localhost:5000`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        console.log(success);
        setLatitude(success.coords.latitude);
        setLongitude(success.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const search = async (e) => {
    e.preventDefault();
    const range = e.target.range.value;
    const result = await axios.get(URL, {
      params: {
        lat: latitude,
        lng: longitude,
        range: range,
        page: 1,
      },
    });
    console.log(result.data.results);
    setData(result.data.results.shop);
    setAvailable(result.data.results.results_available);
    navigate(`/result?lat=${latitude}&lng=${longitude}&range=${range}&page=1`);
  };

  return (
    <Box w="100vw" h="100vh" p="10">
      <Flex alignItems="center" h="100%" flexDirection="column">
        <Heading mb="5">Gourmet Search</Heading>
        <form onSubmit={(e) => search(e)}>
          <Flex w="500px">
            <Select name="range" id="">
              <option value="1">300m</option>
              <option value="2">500m</option>
              <option value="3">1000m</option>
              <option value="4">2000m</option>
              <option value="5">3000m</option>
            </Select>
            <Button colorScheme="teal" type="submit">
              Search
            </Button>
          </Flex>
        </form>
        <Text>
          このサイトはホットペッパーapiを使用して現在地点からの半径を指定してその半径以内にあるお店を表示するサイトです
        </Text>
      </Flex>
    </Box>
  );
};

export default SearchInput;
