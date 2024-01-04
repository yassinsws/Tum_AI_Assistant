export enum Sender {
  LLM = 'assistant',
  USER = 'user',
}

export class ChatbotMessage {
  native: string;
  role: Sender;
  nativelanguageKey?: string;
  english?: string;

  constructor(message: string, sender: Sender) {
    this.native = message;
    this.role = sender;
  }
}

export class FaqModel {
  question: string;
  link: string;
  constructor(question: string, link: string) {
    this.question = question;
    this.link = link;
  }
}

export class UploadedFile {
  contactPerson: string;
  sourceUrl: string;
  formData: FormData;
  constructor(contactPerson: string, sourceUrl: string, formData: FormData) {
    this.contactPerson = contactPerson;
    this.sourceUrl = sourceUrl;
    this.formData = formData;
  }
}
