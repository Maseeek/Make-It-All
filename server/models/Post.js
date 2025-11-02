// Forum Post model
// Represents posts under forum topics
// Posts can be shared (DM functionality to be clarified)

// TODO: Implement database schema
// Post should have:
// - topicId (reference to Topic)
// - content
// - authorId (userId)
// - isEdited (boolean)
// - canBeShared (boolean)
// - createdAt, updatedAt

//DDL: 
// CREATE TABLE IF NOT EXISTS tblPost (
//     PostID INT PRIMARY KEY AUTO_INCREMENT,
//     TopicID INT NOT NULL,
//     Content TEXT NOT NULL,
//     AuthorID INT NOT NULL,
//     IsEdited BOOLEAN DEFAULT FALSE,
//     CanBeShared BOOLEAN DEFAULT TRUE,
//     CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UpdatedAt DATETIME DEFAULT NULL
// );

export default {};