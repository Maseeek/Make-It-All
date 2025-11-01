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
// CREATE TABLE IF NOT EXISTS tblTodo (
//     TodoID INT PRIMARY KEY AUTO_INCREMENT,
//     Title VARCHAR(191) NOT NULL,
//     Description TEXT,
//     Status VARCHAR(191) DEFAULT 'pending',
//     AssignedTo INT NOT NULL,
//     ProjectID INT,
//     Priority VARCHAR(20),
//     DueDate DATETIME,
//     CreatedBy INT NOT NULL,
//     CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UpdatedAt DATETIME DEFAULT NULL
// );`
export default {};