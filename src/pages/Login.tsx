import {
  Alert,
  Box,
  Button,
  Card,
  Field,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleClick = () => {
    if (!userId) return setError("IDを入力してください");
    navigate(`/cards/${userId}`);
  };

  return (
    <Box w="320px" mx="auto">
      <Heading as="h1" mb="6" mt="16" textAlign="center" size="3xl">
        デジタル名刺アプリ
      </Heading>

      {error && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>エラー</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      <Card.Root maxW="sm" mb="4">
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>ID</Field.Label>
              <Input value={userId} onChange={onChangeUserId} />
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Button
            w="full"
            bg="teal"
            _hover={{ opacity: 0.7 }}
            onClick={handleClick}
          >
            名刺をみる
          </Button>
        </Card.Footer>
      </Card.Root>
      <Box textAlign="center" _hover={{ opacity: 0.7 }}>
        <Link to="/cards/register">新規登録はこちら</Link>
      </Box>
    </Box>
  );
};
