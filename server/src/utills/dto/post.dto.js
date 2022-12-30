export class PostDTO {
  constructor(post) {
    this.id = post.guid;
    this.title = post.title;
    this.creator = post.creator;
    this.contentSnippet = post.contentSnippet?.split('Read more...')[0]?.replace("\n","");
    this.link = post.link;
    this.pubDate = post.pubDate;
    this.image = post.content?.split(`"`)[1];
  }
}
