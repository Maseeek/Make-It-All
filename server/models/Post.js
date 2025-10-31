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

export default {};

class Post {
    constructor(topicId, content, authorId, isEdited=false, canBeShared=false, createdAt, updatedAt) {
        this.topicId = topicId;
        this.content = content;
        this.authorId = authorId;
        this.isEdited = isEdited;
        this.canBeShared = canBeShared;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}