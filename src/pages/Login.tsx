import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FormEvent, SyntheticEvent, useState } from "react";
import useField from "../hooks/useField";
import usePageTitle from "../hooks/usePageTitle";
import { signIn, signUp } from "../utils/firebase";

const Login = () => {
  usePageTitle("Login");

  const [value, setValue] = useState("signIn");

  const [email, usernameProps] = useField("email", true);
  const [password, passwordProps] = useField("password", true);

  const [submitError, setSubmitError] = useState<string>();

  const handleChange = (_event: SyntheticEvent, newValue: string) =>
    setValue(newValue);

  return (
    <>
      <Paper
        component="form"
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          try {
            value === "register"
              ? await signUp(email, password)
              : await signIn(email, password);
          } catch (err) {
            setSubmitError(
              (err as { message?: string })?.message ?? "Unknown error occurred"
            );
          }
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 4,
          gap: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab value="signIn" label="Sign In" wrapped />
          <Tab value="register" label="Register" />
        </Tabs>

        <Typography variant="h4" component="h2" textAlign="center" mb={3}>
          Sign in
        </Typography>
        <TextField label="Email" {...usernameProps} type="email" />
        <TextField label="Password" {...passwordProps} type="password" />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            alignSelf: "flex-end",
            mt: 2,
          }}
        >
          {submitError && (
            <Typography
              variant="caption"
              textAlign="right"
              sx={{ color: "error.main" }}
            >
              {submitError}
            </Typography>
          )}

          <Button type="submit" variant="outlined">
            {value === "register" ? "Register" : "Sign In"}
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default Login;
