interface Message {
  id: string;
  text: string;
  user: string;
  added: Date;
}

const messages: Message[] = [
  {
    id: crypto.randomUUID(),
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: crypto.randomUUID(),
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

export default messages;
