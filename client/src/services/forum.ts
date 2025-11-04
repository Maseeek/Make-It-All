import Post from "../../../types/Post";
import Topic from "../../../types/Topic";
import { getCurrentToken } from "./auth";

const BASE_URL = window.location.origin + "/api/forum";

export async function getTopics(): Promise<Topic[]> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);

  const req = new Request(`${BASE_URL}/topics`, {
    method: "GET",
    headers: reqHeaders,
  });

  const response = await fetch(req);

  if (!response.ok) {
    // if 401 throw specific error
    if (response.status === 401) {
      console.log("Unauthorized access - removing token");
      // delete local token
      localStorage.removeItem("authToken");
      throw new Error("401");
    }
    throw new Error("Failed to fetch topics");
  }
  return ((await response.json()) as any[]).map((x) => {
    let topic = new Topic("");
    Object.assign(topic, x);
    return topic;
  });
}
export async function getTopic(id: string): Promise<Topic | null> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);

  const req = new Request(`${BASE_URL}/topics/${id}`, {
    method: "GET",
    headers: reqHeaders,
  });
  const response = await fetch(req);
  if (!response.ok) {
    // if 401 throw specific error
    if (response.status === 401) {
      console.log("Unauthorized access - removing token");
      // delete local token
      localStorage.removeItem("authToken");
      throw new Error("401");
    }

    throw new Error("Failed to fetch topic");
  }
  const data = await response.json();
  let topic = new Topic("");
  Object.assign(topic, data);
  return topic;
}

export async function addTopic(topic: Topic): Promise<void | string> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);
  reqHeaders.append("Content-Type", "application/json");
  let list = await getTopics();
  if (list.find((x) => x.TopicID === topic.TopicID)) {
    return "Topic with this ID already exists.";
  }
  const req = new Request(`${BASE_URL}/topics`, {
    method: "POST",
    headers: reqHeaders,
    body: JSON.stringify(topic),
  });
  const response = await fetch(req);
  if (!response.ok) {
    throw new Error("Failed to add topic");
  }
}

export async function removeTopic(id: string): Promise<void> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);

  const req = new Request(`${BASE_URL}/topics/${id}`, {
    method: "DELETE",
    headers: reqHeaders,
  });
  const response = await fetch(req);
  if (!response.ok) {
    throw new Error("Failed to remove topic");
  }
}

export async function getPosts(topicId: string): Promise<any[]> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);

  const req = new Request(`${BASE_URL}/topics/${topicId}/posts`, {
    method: "GET",
    headers: reqHeaders,
  });
  const response = await fetch(req);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return await response.json();
}

export async function addPost(topicId: string, post: Post): Promise<void> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);

  const req = new Request(`${BASE_URL}/topics/${topicId}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...reqHeaders,
    },
    body: JSON.stringify(post),
  });
  const response = await fetch(req);
  if (!response.ok) {
    throw new Error("Failed to add post");
  }
}

export async function removePost(postId: string): Promise<void> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);

  const req = new Request(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: reqHeaders,
  });
  const response = await fetch(req);
  if (!response.ok) {
    throw new Error("Failed to remove post");
  }
}
