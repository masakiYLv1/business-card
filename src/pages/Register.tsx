import {
  Box,
  Button,
  createListCollection,
  Field,
  FieldErrorText,
  FieldLabel,
  Fieldset,
  FieldsetContent,
  Heading,
  Input,
  Portal,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { supabase } from "../supabaseClient";
import { type RegisterForm } from "../types/register-form";
import { useNavigate } from "react-router-dom";

type SkillItem = {
  label: string;
  value: string;
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const [skillList, setSkillList] = useState<SkillItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: skills, error } = await supabase.from("skills").select("*");

      const items =
        skills?.map((skill) => ({
          label: skill.name,
          value: String(skill.id),
        })) ?? [];

      if (error) return console.log("Error: ", error.message);

      setSkillList(items);
    };
    fetchUserData();
  }, []);

  const userData = createListCollection({
    items: skillList,
  });

  const handleCreateUser = async ({
    user_id,
    name,
    description,
    github_id,
    qiita_id,
    x_id,
    skill_id,
  }: RegisterForm) => {
    const { error: usersError } = await supabase.from("users").insert([
      {
        user_id: user_id,
        name: name,
        description: description,
        github_id: github_id,
        qiita_id: qiita_id,
        x_id: x_id,
      },
    ]);

    if (usersError) {
      return toaster.create({
        description: usersError.message,
        type: "error",
        closable: true,
      });
    }

    const { error: usersSkillError } = await supabase
      .from("user_skill")
      .insert([{ user_id: user_id, skill_id: Number(skill_id) }]);

    if (usersSkillError)
      return toaster.create({
        description: usersSkillError.message,
        type: "error",
        closable: true,
      });

    navigate("/");
  };

  return (
    <Box w="320px" mx="auto" my="16">
      <Heading as="h2" textAlign="center" mb="6" size="3xl">
        新規名刺登録
      </Heading>

      <Fieldset.Root p="4" bg="#fff">
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <FieldsetContent mb="4">
            <Field.Root invalid={!!errors.user_id}>
              <FieldLabel>好きな英単語 *</FieldLabel>
              <Input
                {...register("user_id", {
                  required: {
                    value: true,
                    message: "ID入力が必須の項目です",
                  },
                })}
              />
              <Field.ErrorText>{errors.user_id?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.name}>
              <FieldLabel>お名前 *</FieldLabel>
              <Input
                {...register("name", {
                  required: {
                    value: true,
                    message: "お名前入力が必須の項目です",
                  },
                })}
              />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.description}>
              <FieldLabel>自己紹介 *</FieldLabel>
              <Textarea
                minH="150px"
                placeholder="<h1>HTMLタグも使えます</h1>"
                {...register("description", {
                  required: {
                    value: true,
                    message: "自己紹介入力が必須の項目です",
                  },
                })}
              />
              <FieldErrorText>{errors.description?.message}</FieldErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.skill_id}>
              <Select.Root collection={userData}>
                <Select.HiddenSelect
                  {...register("skill_id", {
                    required: {
                      value: true,
                      message: "選択が必須の項目です",
                    },
                  })}
                />
                <Select.Label>好きな技術 *</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="選択してください" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner pointerEvents="none">
                    <Select.Content>
                      {userData.items.map((data) => (
                        <Select.Item item={data} key={data.value}>
                          {data.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Field.ErrorText>{errors.skill_id?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <FieldLabel>GitHub ID</FieldLabel>
              <Input {...register("github_id")} />
            </Field.Root>

            <Field.Root>
              <FieldLabel>Qiita ID</FieldLabel>
              <Input {...register("qiita_id")} />
            </Field.Root>

            <Field.Root>
              <FieldLabel>X ID</FieldLabel>
              <Input {...register("x_id")} />
            </Field.Root>
          </FieldsetContent>

          <Text mb="4">*は必須項目です</Text>

          <Button
            type="submit"
            bg="blue.500"
            w="full"
            _hover={{ opacity: 0.7 }}
          >
            登録
          </Button>
        </form>
      </Fieldset.Root>
    </Box>
  );
};
