const app = require("./src/app");

const PORT = process.env.DEV_PORT;

app.listen(PORT, () => {
  console.log("Server running with PORT: ", PORT);
});
