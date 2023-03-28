import { Task } from "@/interfaces/task";

interface props {
  tasks: Task[];
}

export default function Home({ tasks }: props) {
  {
    console.log(tasks);
  }

  return (
    <>
      {tasks.length > 0 ? (
        <h1 style={{ color: "red" }}>Hay datos</h1>
      ) : (
        <h1>No hay datos</h1>
      )}
    </>
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
