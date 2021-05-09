const express = require("express");
const noteRoutes = require("./Routes/apiRoutes/noteRoutes");
const htmlRoutes = require("./Routes/htmlRoutes/htmlRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.use("/api", noteRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`Port: ${PORT} currently in use`);
});
