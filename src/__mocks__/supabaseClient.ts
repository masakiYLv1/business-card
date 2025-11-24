const userData = {
  id: 1,
  created_at: "2025-11-20",
  user_id: "test_id",
  name: "テスト太郎",
  description: "テスト太郎の自己紹介文です",
  github_id: "github-testid",
  qiita_id: "qiita-testid",
  x_id: "x-testid",
  user_skill: [
    {
      skills: { id: 1, name: "React" },
    },
    {
      skills: { id: 2, name: "TypeScript" },
    },
    {
      skills: { id: 3, name: "Github" },
    },
  ],
};

export const supabase = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn().mockResolvedValue({
          data: userData,
          error: null,
        }),
      })),
    })),
  })),
};
