// Todo model
// Represents todo items that employees can create
// Can be individual or project-based for task allocation

// TODO: Implement database schema
// Todo should have:
// - title
// - description
// - status (pending, in-progress, completed)
// - assignedTo (userId)
// - projectId (optional, for project todos)
// - priority
// - dueDate
// - createdBy (userId)
// - createdAt, updatedAt

//DDL (change if erroneous):
//'CREATE TABLE Todo (
//    TodoID INT PRIMARY KEY AUTOINCREMENT,
//    title VARCHAR(255) NOT NULL,
//    description TEXT,
//    status VARCHAR(255) DEFAULT 'pending',
//    assignedTo INT NOT NULL,
//    projectId INT,
//    priority VARCHAR(255),
//    dueDate DATETIME,
//    createdBy INT NOT NULL,
//    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
//);'
export default {};