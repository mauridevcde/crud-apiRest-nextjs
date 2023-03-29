import React from "react";
import { useRouter } from "next/router";
const DelTasks = () => {
  return <div></div>;
};

export default DelTasks;

export async function getServerSideProps({ params }: any) {
  //delete task
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `http://localhost:3000/api/tasks/${params.id}`,
    requestOptions
  );
  //status http
  if (response.status !== 200) {
    console.log("Error");
    return;
  }
  const data = await response.json();
  console.log(data);
  //redirect to home with server side
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
