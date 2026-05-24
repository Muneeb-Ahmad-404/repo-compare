"use client"

import { getStats } from '@/lib/analytics';
import { getUser, getRepos } from '../lib/github'
import { GitHubRepo, GitHubStats, GitHubUser } from '@/types/github';
import { useState } from 'react'

export default function Home() {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [profile1, setProfile1] = useState<GitHubUser>(null);
  const [profile2, setProfile2] = useState<GitHubUser>(null);
  const [error, setError] = useState('');
  
  const [repos1, setRepos1] = useState<GitHubRepo[] | null>(null);
  const [repos2, setRepos2] = useState<GitHubRepo[] | null>(null);

  const [page1 , setPage1] = useState(0);
  const [page2, setPage2] = useState(0);

  const [stats1, setStats1] = useState<GitHubStats | null>(null);
  const [stats2, setStats2] = useState<GitHubStats | null>(null);

  async function handleCompare(){
    setPage1(0)
    setPage2(0)
    setRepos1(null)
    setRepos2(null)
    setProfile1(null)
    setProfile2(null)
    setStats1(null)
    setStats2(null)

    if (user1 == "" || user2 == ""){
      setError("Enter both user names")
      return;
    }
    
    let fetchedProfile1: GitHubUser;
    let fetchedProfile2: GitHubUser;

    try {
      fetchedProfile1 = await getUser(user1);
      setProfile1(fetchedProfile1);
    }
    catch(err){
      setError(`Error - (left field): ${err.message}`);
      return;
    }

    try {
      fetchedProfile2 = await getUser(user2);
      setProfile2(fetchedProfile2);
    }
    catch(err){
      setError(`Error - (right field): ${err.message}`);
      return;
    }
    
    setStats1(
      await getStats(
        fetchedProfile1.login,
        fetchedProfile1.followers
      )
    );

    setStats2(
      await getStats(
        fetchedProfile2.login,
        fetchedProfile2.followers
      )
    );
    
    setError("");
  }

  async function handleRepos(userName: string, left = 0, prev = false){
    if(left){
      try{
        const nextPage = prev ? page1 - 1 : page1 + 1;

        if(nextPage < 1) return;

        setPage1(nextPage);

        const data = await getRepos(userName, nextPage);

        setRepos1(data);

        return;
      }
      catch(err){
        alert(err.message)
      }
    }

    try{
      const nextPage = prev ? page2 - 1 : page2 + 1;

      if(nextPage < 1) return;

      setPage2(nextPage);

      const data = await getRepos(userName, nextPage);

      setRepos2(data);

      return;
    }
    catch(err){
      alert(err.message)
    }
  }
  
  return (
    <> 
      <h1 className='text-center text-3xl mt-10 font-semibold'>
        Compare Github Profiles
      </h1>

      <div className='flex flex-col gap-4 items-center mt-10'>
        <div className="flex gap-10">
          <input
            value={user1}
            onChange={(e) => setUser1(e.target.value)}
            placeholder="User 1"
            className='border rounded-xl p-2 outline-none focus:ring-2 focus:ring-green-700'
          />

          <input
            value={user2}
            onChange={(e) => setUser2(e.target.value)}
            placeholder="User 2"
            className='border rounded-xl p-2 outline-none focus:ring-2 focus:ring-green-700'
          />
        </div>
        
        <p className='text-red-800 text-lg'>{error}</p>

        <button
          className='bg-green-900 hover:bg-green-800 transition text-white p-3 rounded-xl'
          onClick={handleCompare}
        >
          Compare
        </button>
      </div>  

      { profile1 && profile2 &&
        <div className="flex gap-10 justify-center mt-10">
          <div className="border rounded-xl p-5 w-80 shadow-md flex flex-col items-center gap-3 bg-white">
            <img
              src={profile1.avatar_url}
              className="h-24 w-24 rounded-full border"
            />

            <h2 className="text-lg font-semibold">
              {profile1.login}
            </h2>

            <div className="text-sm text-gray-700 flex flex-col gap-1 w-full">
              <p>Followers: {profile1.followers}</p>
              <p>Following: {profile1.following}</p>
              <p>Repos: {profile1.public_repos}</p>
              <p>
                Updated: {new Date(profile1.updated_at).toLocaleDateString()}
              </p>

              {stats1 && (
                <div className='mt-3 border-t pt-3 flex flex-col gap-1'>
                  <p>Total Stars: {stats1.total_stars}</p>
                  <p>Top Repo: {stats1.top_repo}</p>
                  <p>Top Repo Stars: {stats1.top_repo_stars}</p>
                  <p>Top Language: {stats1.top_language}</p>
                  <p>Activity Score: {stats1.activity_score}</p>
                </div>
              )}
            </div>

            <button
              className='rounded-xl p-2 bg-green-800 hover:bg-green-700 transition text-white w-full mt-2'
              onClick={() => handleRepos(profile1.login, 1)}
            >
              Fetch Repos
            </button>
          </div>

          <div className="border rounded-xl p-5 w-80 shadow-md flex flex-col items-center gap-3 bg-white">
            <img
              src={profile2.avatar_url}
              className="h-24 w-24 rounded-full border"
            />

            <h2 className="text-lg font-semibold">
              {profile2.login}
            </h2>

            <div className="text-sm text-gray-700 flex flex-col gap-1 w-full">
              <p>Followers: {profile2.followers}</p>
              <p>Following: {profile2.following}</p>
              <p>Repos: {profile2.public_repos}</p>
              <p>
                Updated: {new Date(profile2.updated_at).toLocaleDateString()}
              </p>

              {stats2 && (
                <div className='mt-3 border-t pt-3 flex flex-col gap-1'>
                  <p>Total Stars: {stats2.total_stars}</p>
                  <p>Top Repo: {stats2.top_repo}</p>
                  <p>Top Repo Stars: {stats2.top_repo_stars}</p>
                  <p>Top Language: {stats2.top_language}</p>
                  <p>Activity Score: {stats2.activity_score}</p>
                </div>
              )}
            </div>

            <button
              className='rounded-xl p-2 bg-green-800 hover:bg-green-700 transition text-white w-full mt-2'
              onClick={() => handleRepos(profile2.login)}
            >
              Fetch Repos
            </button>
          </div>
        </div>
      }

      <div className="flex gap-10 justify-center mt-10 mb-10">

        {repos1 && 
          <div className="w-[400px] border rounded-xl p-5 shadow-md flex flex-col items-center bg-white">
            <h2 className="text-xl font-semibold mb-4">
              Repositories
            </h2>

            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto w-full">
              {repos1.map((repo) => (
                <div
                  key={repo.name}
                  className="border rounded-lg p-3 bg-gray-50"
                >
                  <p>
                    <span className="font-semibold">Name:</span> {repo.name}
                  </p>

                  <p>
                    <span className="font-semibold">Stars:</span> {repo.stargazers_count}
                  </p>

                  <p>
                    <span className="font-semibold">Language:</span> {repo.language || "N/A"}
                  </p>

                  <p className="text-sm text-gray-600">
                    Updated: {new Date(repo.updated_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            <div className='flex gap-4 mt-8'>
              <button
                disabled={page1 <= 1}
                className='rounded-xl p-2 px-6 bg-gray-700 disabled:bg-gray-400 text-white'
                onClick={() => handleRepos(profile1.login, 1, true)}
              >
                Prev
              </button>

              <button
                disabled={repos1.length < 5}
                className='rounded-xl p-2 px-6 bg-green-800 disabled:bg-green-400 text-white'
                onClick={() => handleRepos(profile1.login, 1)}
              >
                Next
              </button>
            </div>
          </div>
        }

        {repos2 &&
          <div className="w-[400px] border rounded-xl p-5 shadow-md flex flex-col items-center bg-white">
            <h2 className="text-xl font-semibold mb-4">
              Repositories
            </h2>

            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto w-full">
              {repos2.map((repo) => (
                <div
                  key={repo.name}
                  className="border rounded-lg p-3 bg-gray-50"
                >
                  <p>
                    <span className="font-semibold">Name:</span> {repo.name}
                  </p>

                  <p>
                    <span className="font-semibold">Stars:</span> {repo.stargazers_count}
                  </p>

                  <p>
                    <span className="font-semibold">Language:</span> {repo.language || "N/A"}
                  </p>

                  <p className="text-sm text-gray-600">
                    Updated: {new Date(repo.updated_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            <div className='flex gap-4 mt-8'>
              <button
                disabled={page2 <= 1}
                className='rounded-xl p-2 px-6 bg-gray-700 disabled:bg-gray-400 text-white'
                onClick={() => handleRepos(profile2.login, 0, true)}
              >
                Prev
              </button>

              <button
                disabled={repos2.length < 5}
                className='rounded-xl p-2 px-6 bg-green-800 disabled:bg-green-400 text-white'
                onClick={() => handleRepos(profile2.login)}
              >
                Next
              </button>
            </div>
          </div>
        }
      </div>
    </>
  );
}