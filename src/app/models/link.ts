export class Link {
  private name: string;
  private url: string;
  private feedback: string;
  public activated: boolean;

  constructor(name: string, urlOrFeedback: string, useUrl: boolean) {
    this.name = name;

    if (useUrl) {
      this.url = urlOrFeedback;
    } else {
      this.feedback = urlOrFeedback;
    }
  }

  getName(): string {
    return this.name;
  }

  getUrl(): string {
    return this.url;
  }

  getFeedback(): string {
    return this.feedback;
  }
}
