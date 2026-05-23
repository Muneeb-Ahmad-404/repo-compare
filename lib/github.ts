import { GitHubUser, GitHubRepo } from "@/types/github";

export async function getUser(userName: string){
    const response = await fetch(`https://api.github.com/users/${userName}`);

    if(!response.ok){
        throw new Error("User not found");
    }

    const data = await response.json()

    const user: GitHubUser = {
        login: data.login,
        avatar_url: data.avatar_url,
        followers: data.followers,
        following: data.following,
        public_repos: data.public_repos,
        updated_at: data.updated_at,
    };

    return user;
}

export async function getRepos(userName: string){

}