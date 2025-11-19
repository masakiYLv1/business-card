import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const Card = () => {
  const { id } = useParams();
  return (
    <>
      <Box>
        <Box>Card</Box>
        <Box>user-id: {id}</Box>
      </Box>
    </>
  );
};
