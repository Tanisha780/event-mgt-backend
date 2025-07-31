const express = require("express");
const app = express();
const eventRoutes = require("./routers/eventRoutes");
const createTables = require("./init");

app.use(express.json());
app.use("/events", eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  createTables();
});
