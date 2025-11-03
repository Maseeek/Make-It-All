import React, { useEffect, useState } from "react";
import {
  getTopics,
  getPosts,
  getTopic,
  addTopic,
  addPost,
  removeTopic,
  removePost,
} from "../../services/forum";
import Topic from "../../../../types/Topic";
import Post from "../../../../types/Post";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// Forum post list component
// Displays posts under a specific topic
export default function PostList() {
  const nav = useNavigate();
  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicData = await getTopic(id);
        setTopic(topicData);
        const postsData = await getPosts(id);
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:");
        console.error(error);
        // if the error type is 401, navigate to login
        if (error?.message === "401") {
          nav("/login");
          return;
        }

        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  function submitNewPost() {
    const value = document.querySelector(".post.new textarea").value;
    if (!value || value.trim() === "") return;
    console.log("New post content:", value);
    addPost(id, new Post(value));
    // refresh posts after add
    getPosts(id).then((postsData) => setPosts(postsData));
    // reset field
    document.querySelector(".post.new textarea").value = "";
  }
  async function remove(id) {
    const sure = confirm("Are you sure you want to delete this post?");
    if (!sure) return;
    try {
      await removePost(id);
      setPosts((prev) => prev.filter((x) => x.PostID !== id));
    } catch (err) {
      console.error("Error deleting post:");
      console.error(err);
      setError(err?.message || String(err));
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div>
      {/* <h2>Posts</h2> */}
      {/* <p>Posts for the selected topic ({id}) will appear here</p> */}
      <button onClick={() => nav(-1)}>Go Back</button>

      <div className="posts">
        <div className="post firstpost">
          <div className="inner">
            <h3>{topic?.Title}</h3>
            <p>{topic?.Description}</p>
          </div>
        </div>
        {posts.map((post) => (
          <div key={post.PostID} className="post">
            <div className="inner">
              <p>{post.Content}</p>
            </div>
            <div
              className="cross"
              onClick={(e) => {
                e.stopPropagation();
                remove(post.PostID);
              }}
            >
              ✕
            </div>
          </div>
        ))}
        {/* template forum textarea for new posts */}
        <div className="post new">
          <div className="inner">
            <textarea placeholder="Write a new post..." />
            <button onClick={() => submitNewPost()}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
