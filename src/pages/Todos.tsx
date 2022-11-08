import {
  Paper,
  Button,
  IconButton,
  List,
  ListSubheader,
  ListItemText,
  ListItem,
} from "@mui/material";
import { deleteDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import AddTodo from "../components/AddTodo";
import usePageTitle from "../hooks/usePageTitle";
import {
  signOut,
  Todo,
  todosCollection,
  todosDocument,
} from "../utils/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import useLoggedInUser from "../hooks/useLoggedInUser";

type TodoWithId = Todo & { id: string };

const Todos = () => {
  usePageTitle("Todos");

  const user = useLoggedInUser();
  const [todos, setTodos] = useState<TodoWithId[]>([]);

  useEffect(() => {
    // Call onSnapshot() to listen to changes
    const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
      // Access .docs property of snapshot
      setTodos(
        snapshot.docs
          .filter((doc) => doc.data().by === user?.email)
          .map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    // Don't forget to unsubscribe from listening to changes
    return () => {
      unsubscribe();
    };
  }, [user?.email]);

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(todosDocument(id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 4,
          gap: 2,
        }}
      >
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Todos
            </ListSubheader>
          }
        >
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <ListItemText primary={todo.text} />
              <IconButton onClick={() => deleteTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <AddTodo>
          {(open) => (
            <Button onClick={open} variant="contained">
              Add todo
            </Button>
          )}
        </AddTodo>
        <Button type="submit" variant="outlined" onClick={() => signOut()}>
          Sign out
        </Button>
      </Paper>
    </>
  );
};

export default Todos;
