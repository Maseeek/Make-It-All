export default class Post {
  constructor(
    public Content: string,
    public Author: string,
    public CreatedAt: Date,
    public PostID?: string
  ) {
    this.PostID = PostID;
    this.Content = Content;
    this.Author = Author;
    this.CreatedAt = CreatedAt;
  }
}
