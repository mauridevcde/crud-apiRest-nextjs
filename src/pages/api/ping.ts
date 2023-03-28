import { connection } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

//eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const respuesta = await connection.query("SELECT now()");
  console.log(respuesta.rows);
};
