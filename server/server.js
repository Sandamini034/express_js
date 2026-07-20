import "dotenv/config";
import app from "./app.js";
import "./config/migrate.js";

app.listen(process.env.PORT_SERVER, () => {
  console.log("Server is running on port 3000");
});
