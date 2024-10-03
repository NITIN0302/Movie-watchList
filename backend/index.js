const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://nitin_0302:N1t1nsr1%40@cluster0.4phglbu.mongodb.net/mydatabase",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  additionalInfo: {
    type: [
      {
        Title: String,
        Year: String,
        imdbID: String,
        Type: String,
        Poster: String,
      },
    ],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(200).json({
        message: "User logged in successfully",
        user,
      });
    } else {
      user = new User({ name, email });
      await user.save();
      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    }
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(400).send(error);
  }
});

app.put("/addinfo", async (req, res) => {
  const { email, movies } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        $push: {
          additionalInfo: { $each: movies || [] },
        },
      },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({
        message: "User additional info updated successfully",
        updatedUser,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

app.get("/user/additionalInfo", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne(
      { email: email },
      { additionalInfo: 1, _id: 0 }
    );

    if (user) {
      res.status(200).json({
        message: "Additional info fetched successfully",
        additionalInfo: user.additionalInfo,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

app.delete("/removeMovie", async (req, res) => {
  const { email, imdbID } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $pull: { additionalInfo: { imdbID: imdbID } } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({
        message: "Movie removed successfully!",
        updatedUser,
      });
    } else {
      res.status(404).json({
        message: "User not found or movie not in watchlist.",
      });
    }
  } catch (error) {
    console.error("Error in removeMovie API:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

//deployment code

const staticAssetsPath = path.join(__dirname, "frontend/dist/assets");
const statichtmlpath = path.join(__dirname, "frontend/dist/index.html");
app.use("/assets", express.static(staticAssetsPath));
app.get("*", (req, res) => {
  res.sendFile(statichtmlpath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});