import { GitHubUser, GitHubRepo } from "@/types/github";

export async function getUser(userName: string){
    const response = await fetch(`https://api.github.com/users/${userName}`);

    if(!response.ok){
        throw new Error("User not found");
    }

    const data = await response.json();

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

export async function getRepos(userName: string, page: number, per_page:number = 5){
    const response = await fetch(`https://api.github.com/users/${userName}/repos?per_page=${per_page}&page=${page}`)

    if(!response.ok){
        throw new Error("Repos not found");
    }

    const data = await response.json()

    const repos: GitHubRepo[] = data.map((repo: any)=> ({
        name: repo.name,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        updated_at: repo.updated_at,
    }))    

    return repos;
}

export async function getAllRepos(userName: string){
    const response = await fetch(`https://api.github.com/users/${userName}/repos?per_page=${100}&page=${1}`)

    if(!response.ok){
        throw new Error("Repos not found");
    }

    const data = await response.json()

    const repos: GitHubRepo[] = data.map((repo: any)=> ({
        name: repo.name,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        updated_at: repo.updated_at,
    }))    

    return repos;
}