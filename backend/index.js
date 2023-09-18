const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/auth");
const passportSetup = require("./passport");

app.use(cookieSession(
    { 
        name: "session",
        keys: ["hopago"],
        maxAge: 24 * 60 * 60 * 100
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use("/auth", authRouter);

app.listen(8000, () => {
    console.log("Server is running on 8000...");
});