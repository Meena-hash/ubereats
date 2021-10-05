const express = require("express");
const db = require("./config/db");

db.authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Not connected"));

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/user/profile", require("./routes/api/userprofile"));
app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/restaurants", require("./routes/api/restaurants"));
app.use("/api/restaurant/auth", require("./routes/api/restaurant_auth"));
app.use("/api/restaurant/profile", require("./routes/api/restaurantprofile"));

app.use("/api/image", require("./routes/api/storage"));

app.use("/api/dashboard", require("./routes/api/restaurantdashboard"));
app.use("/api/favourites", require("./routes/api/favourites"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
