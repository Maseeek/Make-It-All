import express from "express";
import * as db from "../db/sqlite/database_scripts.js";

const router = express.Router();

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

// POST /api/forum/topics
// Create a new topic
router.post("/topics", (req, res) => {
  const db = req.app.locals.db;
  const { title, description } = req.body;
  db.run(
    // TODO: fix created by
    "INSERT INTO tblTopic (Title, Description, CreatedBy) VALUES (?, ?, 1)",
    [title, description],
    (error) => {
      if (error) {
        res.status(500).json({ msg: "Failed to create topic", error });
        console.error(error);
      } else {
        res.status(201).json({ status: 200 });
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
  const { content } = req.body;
  const topicId = req.params.id;

  db.run(
    "INSERT INTO tblPost (Content, TopicID, AuthorID) VALUES (?, ?, ?)",
    // TODO: fix author ID
    [content, topicId, 1],
    (error) => {
      if (error) {
        res.status(500).json({ msg: "Failed to create post", error });
      } else {
        res.status(201).json({ status: 200 });
      }
    }
  );
});

export default router;
