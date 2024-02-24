import { useEffect, useState } from "react";
import { Box, Card, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Search from "./Search";

const WeatherCard = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  console.log(weatherData);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
      );

      const data = await response.json();
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const searchHandler = () => {
    fetchWeatherData(search);
  };

  useEffect(() => {
    fetchWeatherData("bengaluru");
  }, []);

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <Box p="5">
      <Search setSearch={setSearch} searchHandler={searchHandler} />
      <Stack
        w={{ base: "85vw", lg: "lg" }}
        borderWidth="1px"
        borderRadius="25"
        overflow="hidden"
        p="5"
        mt={5}
        bg="#00E1A8"
        align="center"
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          weatherData && (
            <>
              <Text fontSize="30px" fontWeight="700">
                {" "}
                {weatherData.name}, {weatherData?.sys?.country}
              </Text>
              <Text fontSize="18px" fontWeight="400">
                {" "}
                {getCurrentDate()}
              </Text>
              <Image
                boxSize="90px"
                objectFit="cover"
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt="weather icon"
              />
              <Text fontSize={{ lg: "70px", base: "60px" }} fontWeight="700">
                {Math.round(weatherData.main.temp - 273.15)}
                <Text as="sup" fontWeight="400" fontSize={{ lg: "38px", base: "33px" }} >
                  °C
                </Text>
              </Text>

              <Text fontSize="18px" fontWeight="400">
                {" "}
                {weatherData.weather[0].description}
              </Text>
              <Flex gap={{ md: "135", base: "85px" }} mt={{base:'55px', lg:'55px'}} mb={5}>
                <Stack align="center" fontSize="16px" fontWeight="500">
                  <Text> {weatherData.wind.speed}</Text>
                  <Text>Wind Speed </Text>
                </Stack>
                <Stack align="center" fontSize="16px" fontWeight="500">
                  <Text> {weatherData.main.humidity}%</Text>
                  <Text>Humidity </Text>
                </Stack>
              </Flex>
            </>
          )
        )}
      </Stack>
      
    </Box>
  );
};

export default WeatherCard;
