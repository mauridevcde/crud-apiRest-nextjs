import { connection } from "@/utils/database";
import { NextApiResponse, NextApiRequest } from "next";

//eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const response = await connection.query("SELECT * FROM tasks");
        return res.status(200).json(response.rows);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    case "POST":
      try {
        const { title, description } = body;
        if (!title || !description) {
          return res.status(400).json({ error: "Bad request" });
        }
        const query =
          "INSERT INTO tasks (title, description ) VALUES ($1, $2) RETURNING *";
        const values = [title, description];
        const response = await connection.query(query, values);

        return res.status(200).json(response.rows[0]);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};
