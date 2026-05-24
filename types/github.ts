export interface GitHubUser {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  updated_at: string;
}

export interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export interface GitHubStats {
  total_stars: number;
  top_repo: string;
  top_repo_stars: number;
  top_language: string;
  activity_score: number;
}