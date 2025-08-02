import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    minRepos: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username) return;

    setLoading(true);
    setError(false);
    setResults([]);

    try {
      const data = await fetchUserData(formData);
      setResults(data.items);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-2">Advanced GitHub User Search</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="minRepos"
          value={formData.minRepos}
          onChange={handleChange}
          placeholder="Minimum Repositories"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && (
        <p className="text-center text-red-500 mt-4">Looks like we cant find the user</p>
      )}

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow"
            >
              <img
                src={user.avatar_url}
                alt="avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.login}</h3>
                <a
                  href={user.html_url}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;