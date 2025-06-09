import { app } from "./app.js";
import { initateTask } from "./utils/initalizationTask.js";

const port = 4000;

initateTask()
  .then(() => {
    app.listen(port, () => console.log(`Running on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
