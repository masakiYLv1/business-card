export type Skill = {
  id: number;
  name: string;
};

export type UserSkill = {
  skills: Skill;
};

export class User {
  id: number;
  created_at: string;
  user_id: string;
  name: string;
  description: string;
  github_id: string | null;
  qiita_id: string | null;
  x_id: string | null;
  user_skill: UserSkill[];

  constructor(
    id: number,
    created_at: string,
    user_id: string,
    name: string,
    description: string,
    github_id: string | null,
    qiita_id: string | null,
    x_id: string | null,
    user_skill: UserSkill[]
  ) {
    this.id = id;
    this.created_at = created_at;
    this.user_id = user_id;
    this.name = name;
    this.description = description;
    this.github_id = github_id;
    this.qiita_id = qiita_id;
    this.x_id = x_id;
    this.user_skill = user_skill;
  }
}
