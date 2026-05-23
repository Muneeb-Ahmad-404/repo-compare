"use client"

import { getUser } from '../lib/github'
import { GitHubUser } from '@/types/github';
import { useState } from 'react'

export default function Home() {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [profile1, setProfile1] = useState<GitHubUser>(null);
  const [profile2, setProfile2] = useState<GitHubUser>(null);
  const [error, setError] = useState('');

  async function handleCompare(){
    if (user1 == "" || user2 == ""){
      setError("Enter both user names")
      return;
    }
    try{
      setProfile1(await getUser(user1));
    }
    catch(err){
      setError(`Error - (left field): ${err.message}`);
      return;
    }

    try{
      setProfile2(await getUser(user2));
    }
    catch(err){
      setError(`Error - (right field): ${err.message}`);
      return;
    }
    setError("");
  }
  
  return (
    <> 
      <h1 className='text-center text-3xl mt-10'>
        Compare Github Profiles
      </h1>

      <div className='flex flex-col gap-4 items-center mt-10'>
        <div className="flex gap-10">
          <input
            value={user1}
            onChange={(e) => setUser1(e.target.value)}
            placeholder="User 1"
            className='border-1 rounded-xl p-2'
          />

          <input
            value={user2}
            onChange={(e) => setUser2(e.target.value)}
            placeholder="User 2"
            className='border-1 rounded-xl p-2'
          />
        </div>
        
        <p className='text-red-800 text-lg'>{error}</p>

        <button className='bg-green-900 text-white p-3 rounded-xl' onClick={handleCompare}>
          Compare
        </button>
      </div>  

       { profile1 && profile2 &&
        <div className="flex gap-10 justify-center mt-10">
          <div className="border rounded-xl p-5 w-72 shadow-md flex flex-col items-center gap-3">
            <img src={profile1.avatar_url} className="h-24 w-24 rounded-full" />
            <h2 className="text-lg font-semibold">{profile1.login}</h2>

            <div className="text-sm text-gray-700 flex flex-col gap-1">
              <p>Followers: {profile1.followers}</p>
              <p>Following: {profile1.following}</p>
              <p>Repos: {profile1.public_repos}</p>
              <p>Updated: {profile1.updated_at}</p>
            </div>
          </div>

          <div className="border rounded-xl p-5 w-72 shadow-md flex flex-col items-center gap-3">
            <img src={profile2.avatar_url} className="h-24 w-24 rounded-full" />
            <h2 className="text-lg font-semibold">{profile2.login}</h2>

            <div className="text-sm text-gray-700 flex flex-col gap-1">
              <p>Followers: {profile2.followers}</p>
              <p>Following: {profile2.following}</p>
              <p>Repos: {profile2.public_repos}</p>
              <p>Updated: {profile2.updated_at}</p>
            </div>
          </div>
        </div>
      }
    </>
  );
}

