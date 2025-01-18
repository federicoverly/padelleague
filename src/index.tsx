import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UploadMatchContainer } from "./components/UploadMatchContainer/UploadMatchContainer";
import { PlayersContainer } from "./components/PlayersContainer/PlayersContainer";
import { MatchesContainer } from "./components/MatchesContainer/MatchesContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/upload-match",
    element: <UploadMatchContainer />,
  },
  {
    path: "players",
    element: <PlayersContainer />,
  },
  {
    path: "matches",
    element: <MatchesContainer />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
