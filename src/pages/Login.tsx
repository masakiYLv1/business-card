import {
  Box,
  Button,
  Card,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleClick = () => {
    if (!userId) return;
    navigate(`/cards/${userId}`);
  };

  return (
    <Box mx="auto">
      <Heading as="h1" mb="5">
        デジタル名刺アプリ
      </Heading>
      <Card.Root maxW="sm">
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>ID</Field.Label>
              <Input value={userId} onChange={onChangeUserId} />
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Button w="full" variant="ghost" onClick={handleClick}>
            名刺をみる
          </Button>
        </Card.Footer>
      </Card.Root>
      <Text>新規登録はこちら</Text>
    </Box>
  );
};
