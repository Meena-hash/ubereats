const express = require("express");
const db = require("./config/db");
const connectDb = require("./config/db-mongo");
const passport = require("passport");

const app = express();

app.use(express.json({ extended: false }));
app.use(passport.initialize());

app.get("/", (req, res) => res.send("API running"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user/profile", require("./routes/api/userprofile"));
app.use("/api/user/address", require("./routes/api/deliveryaddress"));
app.use("/api/user/orders", require("./routes/api/userorders"));

app.use("/api/restaurants", require("./routes/api/restaurants"));
app.use("/api/restaurant/auth", require("./routes/api/restaurant_auth"));
app.use("/api/restaurant/profile", require("./routes/api/restaurantprofile"));
app.use("/api/restaurant/dish", require("./routes/api/restaurantdish"));
app.use("/api/restaurant/orders", require("./routes/api/restaurantorder"));
// app.use("/test", require("./routes/api/kafka-test"));
app.use("/api/image", require("./routes/api/storage"));

app.use("/api/dashboard", require("./routes/api/restaurantdashboard"));
app.use("/api/favourites", require("./routes/api/favourites"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
