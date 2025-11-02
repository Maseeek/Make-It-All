import Topic from "../../../types/Topic";

const BASE_URL = window.location.origin + "/api/forum";

export async function getTopics(): Promise<Topic[]> {
  const response = await fetch(`${BASE_URL}/topics`);
  if (!response.ok) {
    throw new Error("Failed to fetch topics");
  }
  return ((await response.json()) as any[]).map((x) => {
    let topic = new Topic("");
    Object.assign(topic, x);
    return topic;
  });
}

// TODO: should be req, for now just use localstorage
export async function addTopic(topic: Topic): Promise<void | string> {
  let list = await getTopics();
  if (list.find((x) => x.TopicID === topic.TopicID)) {
    return "Topic with this ID already exists.";
  }
  const response = await fetch(`${BASE_URL}/topics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(topic),
  });
  if (!response.ok) {
    throw new Error("Failed to add topic");
  }
}

export async function removeTopic(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/topics/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove topic");
  }
}
