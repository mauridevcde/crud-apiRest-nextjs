import { connection } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

//eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const { id } = query;
        const querys = "SELECT * FROM tasks WHERE id = $1";
        const values = [id];
        const response = await connection.query(querys, values);
        if (response.rowCount === 0) {
          return res.status(404).json({ error: "Task not found" });
        }
        return res.status(200).json(response.rows[0]);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    case "PUT":
      try {
        const { title, description } = body;
        const { id } = query;
        const querys =
          "UPDATE tasks set title = $1 , description = $2 WHERE id = $3 RETURNING *";
        const values = [title, description, id];
        const response = await connection.query(querys, values);

        if (response.rowCount === 0) {
          return res.status(404).json({ error: "Task not found" });
        }
        return res.status(200).json(response.rows[0]);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    case "DELETE":
      try {
        const { id } = query;
        const querys = "DELETE FROM tasks WHERE id = $1 RETURNING *";
        const values = [id];
        const response = await connection.query(querys, values);
        if (response.rowCount === 0) {
          return res.status(404).json({ error: "Task not found" });
        }
        return res.status(200).json(response.rows[0]);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};
