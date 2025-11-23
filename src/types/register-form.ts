export type RegisterForm = {
  id: number;
  created_at: string;
  user_id: string;
  name: string;
  description: string;
  github_id: string | null;
  qiita_id: string | null;
  x_id: string | null;
  skill_id: number;
};
