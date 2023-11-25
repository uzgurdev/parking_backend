import { Express } from "express";

export default (app: Express) => {
  const PORT = 3030;

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};
