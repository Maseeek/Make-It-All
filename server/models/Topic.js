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
//'CREATE TABLE Topic (
//    TopicID INT PRIMARY KEY AUTOINCREMENT,
//    title VARCHAR(255) NOT NULL,
//    description TEXT,
//    createdBy INT NOT NULL,
//    isLocked BOOLEAN DEFAULT FALSE,
//    isPinned BOOLEAN DEFAULT FALSE,
//    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
//);'

class Topic {
    constructor(title, description, createdBy, isLocked=false, isPinned=false, createdAt, updatedAt) {
        this.title = title;
        this.description = description;
        this.createdBy = createdBy;
        this.isLocked = isLocked;
        this.isPinned = isPinned;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default {};
