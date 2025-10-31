const DummyDDLScript = () => {
    return `
    CREATE TABLE IF NOT EXISTS tblUser (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Email VARCHAR(255) UNIQUE NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Role VARCHAR(20) NOT NULL,
        AccountStatus BOOLEAN,
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tblPost (
        PostID INTEGER PRIMARY KEY AUTOINCREMENT,
        TopicId INTEGER NOT NULL,
        Content TEXT NOT NULL,
        AuthorId INTEGER NOT NULL,
        IsEdited BOOLEAN DEFAULT FALSE,
        CanBeShared BOOLEAN DEFAULT TRUE,
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tblTopic (
        TopicID INTEGER PRIMARY KEY AUTOINCREMENT,
        Title VARCHAR(255) NOT NULL,
        Description TEXT,
        CreatedBy INTEGER NOT NULL,
        IsLocked BOOLEAN DEFAULT FALSE,
        IsPinned BOOLEAN DEFAULT FALSE,
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE tblTodo (
        TodoID INTEGER PRIMARY KEY AUTOINCREMENT,
        Title VARCHAR(255) NOT NULL,
        Description TEXT,
        Status VARCHAR(255) DEFAULT 'pending',
        AssignedTo INTEGER NOT NULL,
        ProjectId INTEGER,
        Priority VARCHAR(255),
        DueDate DATETIME,
        CreatedBy INT NOT NULL,
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );`
};

const DropTablesScript = () => {
    return `
    DROP TABLE IF EXISTS tblUser;
    DROP TABLE IF EXISTS tblPost;
    DROP TABLE IF EXISTS tblTopic;
    DROP TABLE IF EXISTS tblTodo;`
}

export { DummyDDLScript, DropTablesScript };
