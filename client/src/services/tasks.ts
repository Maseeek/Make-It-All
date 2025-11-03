import { getCurrentToken } from "./auth";

const BASE_URL = window.location.origin + "/api/todos";

export async function getProjectTasks(): Promise<any[]> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);

  const req = new Request(`${BASE_URL}/project-tasks`, {
    method: "GET",
    headers: reqHeaders,
  });

  const response = await fetch(req);

  if (!response.ok) {
    if (response.status === 401) {
      console.log("Unauthorized access - removing token");
      localStorage.removeItem("authToken");
      throw new Error("401");
    }
    throw new Error("Failed to fetch project tasks");
  }
  return await response.json();
}

// make new proj task
export async function createProjectTask(taskData: {
  UserID: number;
  Title: string;
  Description?: string;
  Priority?: string;
  DueDate?: string;
  Status?: string;
}): Promise<{ TaskID: number }> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);
  reqHeaders.append("Content-Type", "application/json");

  const req = new Request(`${BASE_URL}/project-tasks`, {
    method: "POST",
    headers: reqHeaders,
    body: JSON.stringify(taskData),
  });

  const response = await fetch(req);

  if (!response.ok) {
    if (response.status === 401) {
      console.log("Unauthorized access - removing token");
      localStorage.removeItem("authToken");
      throw new Error("401");
    }
    throw new Error("Failed to create project task");
  }
  return await response.json();
}

export async function updateProjectTask(
  taskId: number,
  updates: {
    Status?: string;
    TimeSpent?: number;
    Description?: string;
    Priority?: string;
    DueDate?: string;
    UserID?: number;
  }
): Promise<void> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);
  reqHeaders.append("Content-Type", "application/json");

  const req = new Request(`${BASE_URL}/project-tasks/${taskId}`, {
    method: "PUT",
    headers: reqHeaders,
    body: JSON.stringify(updates),
  });

  const response = await fetch(req);

  if (!response.ok) {
    if (response.status === 401) {
      console.log("Unauthorized access - removing token");
      localStorage.removeItem("authToken");
      throw new Error("401");
    }
    throw new Error("Failed to update project task");
  }
}

export async function getUsers(): Promise<any[]> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);

  const req = new Request(`${BASE_URL}/users`, {
    method: "GET",
    headers: reqHeaders,
  });

  const response = await fetch(req);

  if (!response.ok) {
    if (response.status === 401) {
      console.log("Unauthorized access - removing token");
      localStorage.removeItem("authToken");
      throw new Error("401");
    }
    throw new Error("Failed to fetch users");
  }
  return await response.json();
}

export async function deleteProjectTask(taskId: number): Promise<void> {
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${getCurrentToken()}`);

  const req = new Request(`${BASE_URL}/project-tasks/${taskId}`, {
    method: "DELETE",
    headers: reqHeaders,
  });

  const response = await fetch(req);

  if (!response.ok) {
    if (response.status === 401) {
      console.log("Unauthorized access - removing token");
      localStorage.removeItem("authToken");
      throw new Error("401");
    }
    throw new Error("Failed to delete project task");
  }
}
