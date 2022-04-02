import React from "react";

import { IoContextInterface } from "./types";

const IoContext = React.createContext<IoContextInterface>({
  socket: null,
  createConnection: () => undefined,
  error: undefined,
  status: "disconnected",
});

export default IoContext;
