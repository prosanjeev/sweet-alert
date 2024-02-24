import { useRef } from "react";
import { Input, Button, Flex } from "@chakra-ui/react";

const Search = ({ search, setSearch, searchHandler }) => {
  const inputRef = useRef(null);

  const handleSearch = () => {
    setSearch(inputRef.current.value);
    searchHandler();
    inputRef.current.value = ""; // Clear the input value
  };

  return (
    <Flex alignItems="center">
      <Input
        ref={inputRef}
        variant="filled"
        placeholder="Search city..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        mr={2}
        h="48px"
        fontSize="18px"
      />
      <Button colorScheme="teal" size="lg" onClick={handleSearch}>
        Search
      </Button>
    </Flex>
  );
};

export default Search;
