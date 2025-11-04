export default class Topic {
  Title: string;
  TopicID?: string;
  Description?: string;

  constructor(title: string, description?: string) {
    this.Title = title;
    this.Description = description;
  }

  createPost() {}

  sharePost() {}
}
