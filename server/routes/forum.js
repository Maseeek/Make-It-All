import express from "express";
import * as db from "../db/sqlite/database_scripts.js";

import { isAuthorized, hasRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(isAuthorized);
router.use((req, res, next) => {
  // for all deletes, need admin
  if (req.method === "DELETE") {
    return hasRoles("admin")(req, res, next);
  }
  next();
});

// for all posts, need tech specialist
router.use((req, res, next) => {
  if (req.method === "POST") {
    return hasRoles("technical_specialist", "manager", "admin")(req, res, next);
  }
  next();
});

// GET /api/forum/topics
// Get all forum topics
router.get("/topics", (req, res) => {
  const db = req.app.locals.db;
  db.all("SELECT * FROM tblTopic", [], (error, rows) => {
    if (error) {
      res.status(500).json({ msg: "Failed to retrieve topics", error });
    } else {
      res.json(rows);
    }
  });
});
// GET /api/forum/topics/:id
// Get a specific topic by ID
router.get("/topics/:id", (req, res) => {
  const db = req.app.locals.db;
  let topicId = req.params.id;

  db.get(
    "SELECT * FROM tblTopic WHERE TopicID = ?",
    [topicId],
    (error, row) => {
      if (error) {
        res.status(500).json({ msg: "Failed to retrieve topic", error });
      } else {
        res.json(row);
      }
    }
  );
});

// DELETE /api/forum/topics/:id
// Delete a topic by ID
router.delete("/topics/:id", (req, res) => {
  const db = req.app.locals.db;
  let topicId = req.params.id;

  db.run("DELETE FROM tblTopic WHERE TopicID = ?", [topicId], function (error) {
    if (error) {
      res.status(500).json({ msg: "Failed to delete topic", error });
    } else {
      res.json({ deletedRows: this.changes });
    }
  });
});

// POST /api/forum/topics
// Create a new topic
router.post("/topics", (req, res) => {
  const db = req.app.locals.db;
  const { Title, Description } = req.body;
  console.log("Request body:", req);
  console.log(`Creating topic: ${Title} - ${Description}`);
  db.run(
    "INSERT INTO tblTopic (Title, Description, CreatedBy) VALUES (?, ?, ?)",
    [Title, Description, req.user.userId],
    (error) => {
      if (error) {
        res.status(500).json({ msg: "Failed to create topic", error });
        console.error(error);
      } else {
        res.status(201).json({ status: 201 });
      }
    }
  );
});

// GET /api/forum/topics/:id/posts
// Get all posts for a topic
router.get("/topics/:id/posts", (req, res) => {
  const db = req.app.locals.db;
  let topicId = req.params.id;

  db.all(
    "SELECT * FROM tblPost WHERE TopicID = ?",
    [topicId],
    (error, rows) => {
      if (error) {
        res.status(500).json({ msg: "Failed to retrieve posts", error });
      } else {
        res.json(rows);
      }
    }
  );
});

// POST /api/forum/topics/:id/posts
// Create a new post under a topic
router.post("/topics/:id/posts", (req, res) => {
  const db = req.app.locals.db;
  const { Content } = req.body;
  const topicId = req.params.id;

  db.run(
    "INSERT INTO tblPost (Content, TopicID, AuthorID) VALUES (?, ?, ?)",
    [Content, topicId, req.user.userId],
    (error) => {
      if (error) {
        res.status(500).json({ msg: "Failed to create post", error });
        console.error(error);
      } else {
        res.status(201).json({ status: 201 });
      }
    }
  );
});

// DELETE /api/forum/posts/:id
// Delete a post by ID
router.delete("/posts/:id", (req, res) => {
  const db = req.app.locals.db;
  let postId = req.params.id;

  db.run("DELETE FROM tblPost WHERE PostID = ?", [postId], function (error) {
    if (error) {
      res.status(500).json({ msg: "Failed to delete post", error });
    } else {
      res.json({ deletedRows: this.changes });
    }
  });
});
export default router;
