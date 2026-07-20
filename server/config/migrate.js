import db from "./db.js";

const createTables = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(25),
  password VARCHAR(255),
  email VARCHAR(255)
);
`;

db.query(createTables, (err) => {
  if (err) {
    console.error("Error creating tables:", err);
  } else {
    console.log("Database & tables ready");
  }
});

export default createTables;
