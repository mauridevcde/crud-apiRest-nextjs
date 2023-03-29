import Layout from "@/components/layout";
import { Task } from "@/interfaces/task";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { width } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
interface props {
  tasks: Task[];
}

export default function Home({ tasks }: props) {
  {
    console.log(tasks);
  }
  const router = useRouter();
  return (
    <Layout>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gridGap: "10px",
          padding: "10px",
        }}
      >
        {tasks.length > 0 ? (
          tasks.map((task: any) => (
            <Card key={task.id}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {task.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {task.description}
                </Typography>
              </CardContent>
              <div
                style={{
                  display: "flex",
                  gap : "10px",
                  justifyContent: "end",
                  padding: "10px",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#2F70AF",
                    color: "white",
                  }}
                >
                  <Link href={`/tasks/edit/${task.id}`}>Edit</Link>
                </Button>
                <Button
                  style={{
                    backgroundColor: "#BC2041",
                    color: "white",
                  }}
                >
                  <Link href={`/tasks/delete/${task.id}`}>Delete</Link>
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <h1>No hay datos</h1>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
};
