// src/GitHubUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import GitHubCalendar from "react-github-calendar";

const Github = () => {
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const repoResponse = await axios.get(
        `https://api.github.com/users/${username}/repos?sort=created&per_page=10`
      );
      setUserDetails(userResponse.data);
      setRepositories(repoResponse.data);
    } catch (err) {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserDetails();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
          >
            <div className="mb-4">
              <input
                type="text"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter GitHub username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
            >
              Fetch User
            </button>
          </form>

          {loading && <p className="mt-4 text-blue-500">Loading...</p>}

          {error && <p className="mt-4 text-red-500">{error}</p>}

          {userDetails && (
            <div className="mt-6 w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center">
                <img
                  src={userDetails.avatar_url}
                  alt={userDetails.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">
                  {userDetails.name}
                </h2>
                <p className="text-gray-700">@{userDetails.login}</p>
                <p className="mt-2 text-gray-600">{userDetails.bio}</p>
                <p className="mt-2 text-gray-600">
                  Location: {userDetails.location || "Not available"}
                </p>
                <p className="mt-2 text-gray-600">
                  Public Repos: {userDetails.public_repos}
                </p>
                <p className="mt-2 text-gray-600">
                  Followers: {userDetails.followers}
                </p>
                <p className="mt-2 text-gray-600">
                  Following: {userDetails.following}
                </p>
                <a
                  href={userDetails.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                >
                  View Profile
                </a>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Contributions</h2>
                <GitHubCalendar
                  username={username}
                  blockMargin={4}
                  blockSize={14}
                  fontSize={14}
                  fullYear={false}
                  theme={{
                    light: ["#f0f0f0", "#c9c9c9"], // Exactly 2 colors for light theme
                    dark: [
                      "#0b7285",
                      "#0e7c86",
                      "#14919b",
                      "#14a1b8",
                      "#18c4e1",
                    ], // Exactly 5 colors for dark theme
                  }}
                />
              </div>
            </div>
          )}

          {repositories.length > 0 && (
            <div className="mt-8 w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Recent Repositories
              </h2>
              <ul className="divide-y divide-gray-300">
                {repositories.map((repo) => (
                  <li key={repo.id} className="py-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {repo.name}
                    </a>
                    <p className="mt-2 text-gray-600">{repo.description}</p>
                    <div className="flex justify-between mt-2 text-gray-600">
                      <p>Stars: {repo.stargazers_count}</p>
                      <p>Forks: {repo.forks_count}</p>
                      <p>
                        Created at:{" "}
                        {new Date(repo.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Github;
