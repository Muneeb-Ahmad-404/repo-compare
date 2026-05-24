import { getAllRepos } from "./github";
import { GitHubStats } from "@/types/github";

export async function getStats(userName: string, followers: number){
    const repos = await getAllRepos(userName);

    const totalStars = repos.reduce((sum, repo) => {
        return sum + repo.stargazers_count;
    }, 0);

    const topRepo = repos.reduce((best, repo) => {
        return repo.stargazers_count > best.stargazers_count
            ? repo
            : best;
    });

    const freq: Record<string, number> = {};

    repos.forEach((repo) => {
        if (!repo.language) return;

        freq[repo.language] =
            (freq[repo.language] || 0) + 1;
    });

    let dominantLanguage = "None";
    let max = 0;

    for (const lang in freq) {
        if (freq[lang] > max) {
            max = freq[lang];
            dominantLanguage = lang;
        }
    }

    const activity_score =
        totalStars * 3 +
        followers * 2 +
        repos.length;

    return {
        total_stars: totalStars,
        top_repo: topRepo.name,
        top_repo_stars: topRepo.stargazers_count,
        top_language: dominantLanguage,
        activity_score,
    };
}