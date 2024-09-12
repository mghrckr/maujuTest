import { SignIn, SignUp } from "./pages/auth";
import Profile from "./pages/Profile";
import Table from "./pages/Table";



export const routes = [
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ]
  },
  {
    title: "contain pages",
    layout: "contain",
    pages: [
      {
        name: "table",
        path: "/table",
        element: <Table />
      },
      {
        name: "profile",
        path: "/profile/:userId",
        element: <Profile />
      },
    ]
  },
];

export default routes;
