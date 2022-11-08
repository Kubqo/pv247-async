import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { addDoc } from "firebase/firestore";

import useField from "../hooks/useField";
import { todosCollection } from "../utils/firebase";
import useLoggedInUser from "../hooks/useLoggedInUser";

type Props = {
  children: (open: () => void) => ReactNode;
};

const AddTodo = ({ children }: Props) => {
  const user = useLoggedInUser();

  // Open state
  const [open, setOpen] = useState(false);

  // Fields
  const [text, textProps] = useField("text");

  const [submitError, setSubmitError] = useState<string>();

  // Close and reset handler
  const closeDialog = () => {
    setOpen(false);
    textProps.onChange({ target: { value: "" } } as never);
    setSubmitError(undefined);
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!user?.email) {
      setSubmitError("You are not signed in");
      return;
    }

    try {
      // TODO: Update to setDoc with user.email as id
      await addDoc(todosCollection, {
        by: user.email,
        text,
      });
      closeDialog();
    } catch (err) {
      setSubmitError(
        (err as { message?: string })?.message ?? "Unknown error occurred"
      );
    }
  };

  return (
    <>
      {children(() => setOpen(true))}
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Add a todo</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 500,
          }}
        >
          <TextField label="Text" fullWidth {...textProps} />
        </DialogContent>
        <DialogActions>
          {submitError && (
            <Typography
              variant="subtitle2"
              align="left"
              color="error"
              paragraph
            >
              {submitError}
            </Typography>
          )}
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTodo;
