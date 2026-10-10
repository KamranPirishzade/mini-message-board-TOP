import pool from "./pool.ts";

interface Message {
  id: number;
  username: string;
  message: string;
  added: Date;
}

async function getAllMessages(): Promise<Message[]> {
  const { rows } = await pool.query<Message>(
    "SELECT * FROM messages ORDER BY added DESC;",
  );
  return rows;
}

async function addMessage(username: string, message: string): Promise<Message> {
  const { rows } = await pool.query<Message>(
    "INSERT INTO messages(username, message) VALUES ($1 , $2) RETURNING *",
    [username, message],
  );
  return rows[0];
}

async function getMessageById(id: number): Promise<Message | undefined> {
  const { rows } = await pool.query<Message>(
    "SELECT * FROM messages WHERE id=$1",
    [id],
  );
  return rows[0];
}

export default {
  getAllMessages,
  addMessage,
  getMessageById,
};
