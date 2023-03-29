import Layout from "@/components/layout";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";

interface NewTaskFormValue {
  id: string;
  title: string;
  description: string;
}

const isRequired = "Este campo es obligatorio";
const schema = yup.object({
  title: yup.string().required(isRequired),
  description: yup.string().required(isRequired),
});

export default function EditTask({ task }: { task: any }) {
  const router = useRouter();
  console.log(task);
  const initialValues: NewTaskFormValue = {
    id: task.id,
    title: task.title,
    description: task.description,
  };
  const handleSubmitNewTask = async (values: NewTaskFormValue) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      `http://localhost:3000/api/tasks/${values.id}`,
      requestOptions
    );

    //status http

    if (response.status !== 200) {
      console.log("Error");
      return;
    }

    const data = await response.json();
    console.log(data);

    //redirect to home
    router.push("/");
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Card
              style={{
                width: "600px",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography variant="h5" component="div">
                  Edit Task
                </Typography>

                <div
                  style={{
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                      handleSubmitNewTask(values);
                    }}
                  >
                    {({ values, handleChange, errors }) => (
                      <Form>
                        <TextField
                          style={{ marginBottom: "20px" }}
                          fullWidth
                          label="Title"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          helperText={errors.title}
                        />

                        <TextField
                          fullWidth
                          label="Description"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          helperText={errors.description}
                        />

                        <Button
                          style={{ marginTop: "20px", width: "100%" }}
                          type="submit"
                        >
                          Edit
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ params }: any) {
  console.log(params.id);

  const res = await fetch(`http://localhost:3000/api/tasks/${params.id}`);
  const data = await res.json();

  return {
    props: {
      task: data,
    },
  };
}
