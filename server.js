const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const contactRoute = require("./routes/contactRoute");
const multer = require("multer");
const path = require("path");
const errorHandler = require("./middleware/error");
const jwt = require("jsonwebtoken");

const app = express();

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

app.use(express.static(path.join(__dirname, "./client/build")));

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log("connected to mongodb cloud! :)");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = file.originalname;
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

app.post("/api/upload", upload.single("file"), (req, res) => {
  return res.status(200).json("File has been uploaded");
});

app.get("/images", (req, res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("imagesPage", { items: items });
    }
  });
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/contact", contactRoute);

app.use(errorHandler);

app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Please register Log in using a valid email to submit posts",
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app listening on port ${port}!`));
