import {
  Box,
  Flex,
  IconButton,
  Spinner,
  Text,
  Card as ChakraCard,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FaGithubSquare } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { AiFillTwitterSquare } from "react-icons/ai";

import { User } from "../types/user";

export const Card = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*, user_skill(skills(id, name))")
        .eq("user_id", id)
        .single();

      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(false);

      if (!error) {
        const userData = new User(
          data.id,
          data.created_at,
          data.user_id,
          data.name,
          data.description,
          data.github_id,
          data.qiita_id,
          data.x_id,
          data.user_skill
        );

        // 非同期の中で state 更新 → OK
        setUser(userData);
        // console.log(userData);
      } else {
        console.log("Error: ", error.message);
      }
    })();
  }, [id]);

  const handleBackToLogin = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt="16">
        <Spinner
          size="xl"
          color="teal.500"
          animationDuration="0.7s"
          borderWidth="4px"
        />
        <Text textStyle="lg" mt="4">
          Loading...
        </Text>
      </Box>
    );
  }

  if (notFound) {
    return (
      <Box textAlign="center" mt="16">
        <Heading size="2xl">ユーザーが見つかりません</Heading>
        <Text mt="4">ID を確認してください</Text>
      </Box>
    );
  }

  return (
    <>
      <ChakraCard.Root w="320px" mx="auto" mt="16" mb="8">
        <ChakraCard.Body p="4">
          <Heading size="3xl">{user?.name}</Heading>
          <Box>
            <Heading as="h3" size="2xl" mt="4">
              自己紹介
            </Heading>
            <Box
              dangerouslySetInnerHTML={{ __html: user?.description || "" }}
            />
          </Box>
          <Box>
            <Heading as="h3" size="2xl" mt="4">
              好きな技術
            </Heading>
            {user?.user_skill?.map((us) => (
              <Text key={us.skills.id}>{us.skills.name}</Text>
            ))}
          </Box>
          <Flex justify="space-between" mt="4">
            <Box>
              <ChakraLink
                href={`https://github.com/${user?.github_id}`}
                target="_brank"
              >
                <IconButton aria-label="GitHub">
                  <FaGithubSquare />
                </IconButton>
              </ChakraLink>
            </Box>
            <Box>
              <ChakraLink
                href={`https://qiita.com/${user?.qiita_id}`}
                target="_brank"
              >
                <IconButton aria-label="Qiita">
                  <CiCreditCard1 />
                </IconButton>
              </ChakraLink>
            </Box>
            <Box>
              <ChakraLink href={`https://x.com/${user?.x_id}`} target="_brank">
                <IconButton aria-label="X">
                  <AiFillTwitterSquare />
                </IconButton>
              </ChakraLink>
            </Box>
          </Flex>
        </ChakraCard.Body>
      </ChakraCard.Root>

      <Box textAlign="center">
        <Button
          w="320px"
          bg="teal"
          _hover={{ opacity: 0.7 }}
          onClick={handleBackToLogin}
        >
          戻る
        </Button>
      </Box>
    </>
  );
};
