import express from "express";
import { isAuthorized, hasRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(isAuthorized);

// GET /api/todos/users
// Get all users for task assignment dropdown (managers/admins only)
router.get("/users", hasRoles("manager", "admin"), (req, res) => {
  const db = req.app.locals.db;

  db.all(
    "SELECT UserID, Email, Role FROM tblUser WHERE AccountStatus = 1 AND Role IN ('technical_specialist') ORDER BY Email ASC",
    [],
    (error, rows) => {
      if (error) {
        res.status(500).json({ msg: "Failed to retrieve users", error });
      } else {
        res.json(rows);
      }
    }
  );
});

// GET /api/todos/project-tasks
// Get project tasks (Managers see all their created tasks, users see tasks assigned to them)
router.get("/project-tasks", (req, res) => {
  const db = req.app.locals.db;
  const userId = req.user.userId;
  const role = req.user.accountType;

  let sql;
  if (role === "manager" || role === "admin") {
    // Managers/Admins see all tasks
    sql = "SELECT * FROM proj_tasks ORDER BY CreatedAt DESC";
  } else {
    // Users see tasks assigned to them
    sql = "SELECT * FROM proj_tasks WHERE UserID = ? ORDER BY CreatedAt DESC";
  }

  const params =
    role === "project_manager" || role === "manager" || role === "admin"
      ? []
      : [userId];

  db.all(sql, params, (error, rows) => {
    if (error) {
      res.status(500).json({ msg: "Failed to retrieve project tasks", error });
    } else {
      res.json(rows);
    }
  });
});

// POST /api/todos/project-tasks
// Create a new project task (Manager only)
router.post(
  "/project-tasks",
  hasRoles("project_manager", "admin"),
  (req, res) => {
    const db = req.app.locals.db;
    const { UserID, Title, Description, Priority, DueDate, Status } = req.body;

    const sql = `INSERT INTO proj_tasks (UserID, Title, Description, Status, Priority, DueDate) 
               VALUES (?, ?, ?, ?, ?, ?)`;

    const status = Status || "pending";

    db.run(
      sql,
      [UserID, Title, Description, status, Priority, DueDate],
      function (error) {
        if (error) {
          res.status(500).json({ msg: "Failed to create project task", error });
          console.error(error);
        } else {
          res.status(201).json({ TaskID: this.lastID });
        }
      }
    );
  }
);

// PUT /api/todos/project-tasks/:id
// Update a project task (status, time spent, etc.)
router.put("/project-tasks/:id", (req, res) => {
  const db = req.app.locals.db;
  const taskId = req.params.id;
  const { Status, TimeSpent, Description, Priority, DueDate, UserID } =
    req.body;

  // Build dynamic update query based on provided fields
  const updates = [];
  const params = [];

  if (Status !== undefined) {
    updates.push("Status = ?");
    params.push(Status);
  }
  if (TimeSpent !== undefined) {
    updates.push("TimeSpent = ?");
    params.push(TimeSpent);
  }
  if (Description !== undefined) {
    updates.push("Description = ?");
    params.push(Description);
  }
  if (Priority !== undefined) {
    updates.push("Priority = ?");
    params.push(Priority);
  }
  if (DueDate !== undefined) {
    updates.push("DueDate = ?");
    params.push(DueDate);
  }
  if (UserID !== undefined) {
    updates.push("UserID = ?");
    params.push(UserID);
  }

  updates.push("UpdatedAt = CURRENT_TIMESTAMP");
  params.push(taskId);

  const sql = `UPDATE proj_tasks SET ${updates.join(", ")} WHERE TaskID = ?`;

  db.run(sql, params, function (error) {
    if (error) {
      res.status(500).json({ msg: "Failed to update project task", error });
      console.error(error);
    } else {
      res.json({ success: true, changes: this.changes });
    }
  });
});

// DELETE /api/todos/project-tasks/:id
// Delete a project task (Manager only)
router.delete(
  "/project-tasks/:id",
  hasRoles("project_manager", "admin"),
  (req, res) => {
    const db = req.app.locals.db;
    const taskId = req.params.id;

    db.run(
      "DELETE FROM proj_tasks WHERE TaskID = ?",
      [taskId],
      function (error) {
        if (error) {
          res.status(500).json({ msg: "Failed to delete project task", error });
        } else {
          res.json({ deletedRows: this.changes });
        }
      }
    );
  }
);

// GET /api/todos
// Get all todos for the authenticated user (personal todos - keeping as placeholder)
router.get("/", (req, res) => {
  res.json({ message: "Get todos endpoint - to be implemented" });
});

// POST /api/todos
// Create a new todo item (personal - keeping as placeholder)
router.post("/", (req, res) => {
  res.json({ message: "Create todo endpoint - to be implemented" });
});

// PUT /api/todos/:id
// Update a todo item (personal - keeping as placeholder)
router.put("/:id", (req, res) => {
  res.json({ message: "Update todo endpoint - to be implemented" });
});

// DELETE /api/todos/:id
// Delete a todo item (personal - keeping as placeholder)
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete todo endpoint - to be implemented" });
});

export default router;
