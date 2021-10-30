import { serverHttp } from "./app";

serverHttp.listen(3333, () => {
  console.log("Server is run on port 3333");
});

