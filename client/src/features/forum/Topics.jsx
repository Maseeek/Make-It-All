import React, { useEffect, useState } from "react";
import { getTopics, addTopic, removeTopic } from "../../services/forum";
import Topic from "../../../../types/Topic";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";

// Simple hooks-based forum topic list component
export default function TopicList() {
  const nav = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const t = await getTopics();
        if (mounted) setTopics(t || []);
      } catch (err) {
        // if the error type is 401, navigate to login
        if (err?.message === "401") {
          nav("/login");
          return;
        }

        if (mounted) setError(err?.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function newTopic() {
    const Title = prompt("Enter topic Title:");
    const Description = prompt("Enter topic Description:");
    if (!Title || !Description) return;
    try {
      const topic = new Topic(Title, Description);
      await addTopic(topic);
      // refresh list after add
      const t = await getTopics();
      setTopics(t || []);
    } catch (err) {
      setError(err?.message || String(err));
    }
  }

  function goToTopic(id) {
    nav("/forum/" + id);
  }

  async function remove(id) {
    const sure = confirm("Are you sure you want to delete this topic?");
    if (!sure) return;
    try {
      await removeTopic(id);
      setTopics((prev) => prev.filter((x) => x.TopicID !== id));
    } catch (err) {
      setError(err?.message || String(err));
    }
  }

  if (loading) return <div>Loading topics…</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h2>Forum Topics</h2>
      <div className="topiclist">
        {topics.map((topic, i) => (
          <div
            key={topic.TopicID || i}
            className="topicitem"
            onClick={() => goToTopic(topic.TopicID)}
          >
            <div>{topic.Title}</div>
            <div
              className="cross"
              onClick={(e) => {
                e.stopPropagation();
                remove(topic.TopicID);
              }}
            >
              ✕
            </div>
          </div>
        ))}
        <div className="topicitem new" onClick={newTopic}>
          <div>
            <span className="bigplus">+</span>
            &nbsp;&nbsp;Create new topic
          </div>
        </div>
      </div>
    </div>
  );
}
