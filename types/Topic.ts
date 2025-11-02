export default class Topic {
  Title: string;
  TopicID: string;

  constructor(title: string) {
    this.Title = title;
    this.TopicID = title.replaceAll(/\W/g, "_");
  }

  createPost() {}

  sharePost() {}
}
