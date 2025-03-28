import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const API_BASE_URL = "https://my-json-server.typicode.com/ranjithraj-001/727822tuec149";

function SocialMediaAnalytics() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));

    fetch(`${API_BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));

    fetch(`${API_BASE_URL}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, []);

  const postData = posts.map((post) => ({
    name: `Post ${post.id}`,
    comments: comments.filter((c) => c.postId === post.id).length,
  }));

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Social Media Analytics</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Users</h2>
          <p>{users.length}</p>
        </div>
        <div className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Posts</h2>
          <p>{posts.length}</p>
        </div>
        <div className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Comments</h2>
          <p>{comments.length}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Post Engagement</h2>
        <BarChart width={600} height={300} data={postData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="comments" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default SocialMediaAnalytics;
