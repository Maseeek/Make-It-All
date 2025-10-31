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
//'CREATE TABLE Post (
//    PostID INT PRIMARY KEY AUTOINCREMENT,
//    topicId INT NOT NULL,
//    content TEXT NOT NULL,
//    authorId INT NOT NULL,
//    isEdited BOOLEAN DEFAULT FALSE,
//    canBeShared BOOLEAN DEFAULT TRUE,
//    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
//);'

export default {};