// Forum Topic model
// Represents forum topics created by users

// TODO: Implement database schema
// Topic should have:
// - title
// - description
// - createdBy (userId)
// - isLocked (boolean)
// - isPinned (boolean)
// - createdAt, updatedAt

//DDL: 
// CREATE TABLE IF NOT EXISTS tblTopic (
//     TopicID INT PRIMARY KEY AUTO_INCREMENT,
//     Title VARCHAR(191) NOT NULL,
//     Description TEXT,
//     CreatedBy INT NOT NULL,
//     IsLocked BOOLEAN DEFAULT FALSE,
//     IsPinned BOOLEAN DEFAULT FALSE,
//     CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UpdatedAt DATETIME DEFAULT NULL
// );