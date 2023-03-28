import { Grid, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { Formik, Form } from "formik";

interface NewTaskFormValue {
  title: string;
  description: string;
}

const initialValues: NewTaskFormValue = {
  title: "",
  description: "",
};

export default function NewTask() {
  return (
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
                New Task
              </Typography>

              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, actions) => {
                    console.log({ values, actions });
                  }}
                >
                  {({ values, handleChange }) => (
                    <Form>
                      <TextField
                        style={{ marginBottom: "20px" }}
                        fullWidth
                        label="Title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />

                      <Button 
                        style={{ marginTop: "20px", width: "100%" }}
                      type="submit">Create</Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
}
