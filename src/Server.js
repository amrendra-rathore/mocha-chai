const express = require('express');
// import notFound from './libs/routes/notFoundRoute';
// import errorHandler from './libs/routes/errorHandler';
// import router from './router';
const Express = require('express-serve-static-core');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
// import {nodemailer} from "nodemailer";
const nodemailer = require('nodemailer');

// const router = import('./router');

dotenv.config();

const UserSchema = require("./model/user");


module.exports = class Server {
  app = Express;

  config = process.env.PORT;

  constructor(config) {
    this.config = config;
    this.app = express();
    // console.log(config);
  }

  initBodyParser() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    console.log(process.env.NODE_ENV);
    console.log(process.env.DB_URL);
    // this.app.use((session)({
    //   secret: "node js mongodb",
    //   resave: false,
    //   saveUninitialized: false
    // }));
    // const url = 'mongodb+srv://wolfraptor:covid19@usercluster.du1yrzd.mongodb.net/User';
    // const url = 'mongodb://localhost:27017/TestDB';

    // console.log("config val", this.config);
    mongoose.connect(process.env.DB_URL, () => {
      console.log("COnnection estalished");
    });
    mongoose.connection.on('open', function (ref) {
      //trying to get collection names
      mongoose.connection.db.listCollections().toArray(function (err, names) {
        // console.log(names); // [{ name: 'dbname.myCollection' }]
        // console.log("collection list---", Object.keys(mongoose.connection.collections))
        module.exports.Collection = names;
      });
    })
  }


  bootstrap() {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  }

  async setupRoutes() {

    // const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c27e15afe92386",
        pass: "f17aaee06c7def"
      }
    });

    this.app.use('/api', require('./router'));

    //Auth Routes
    // this.app.get("/login", (req, res) => {
    //   res.send("Login");
    // })
    this.app.post("/register", (req, res) => {
      // console.log("SignUp API");
      // UserSchema.find({
      //   email: req.body.email
      // }, function (err, result) {
      //   const regex = /^([A-Za-z0-9_\-\.])+\@(successive.tech)$/;
      //   const userDetails = new UserSchema(req.body)
      //   if (regex.test(req.body.email)) {
      //     if (result.length == 0) {
      //       userDetails.save((err) => {
      //         if (!err) {
      //           console.log("No Error");
      //         }
      //         else {
      //           // console.log('Error during record insertion');
      //           res.json({ status: 200 });
      //         }
      //       })
      //       res.json({ status: 200, message: "User created successfully" });
      //     }
      //     else {
      //       return res.json({ status: 409, message: "User already exists" });
      //       console.log(res);
      //     }
      //   } else {
      //     return res.json({ status: 404, message: "Invalid Email Address" });
      //   }
      // });
    });
    this.app.post("/login", (req, res) => {
      res.send("Login");
      // const query = req.body;
      // console.log("req body", query);
      // UserSchema.find({
      //   email: req.body.email
      // }, function (err, result) {
      //   if (err) res.send({ status: 500, message: "Server Error" });
      //   if (result.length != 0) {
      //     // console.log("res", result[0].password, req.body.password, typeof result.password, typeof req.body.password);
      //     if ((result[0]?.password == req.body.password) && (result[0]?.email == req.body.email)) {
      //       res.json({ status: 200, message: "Authentication successful" })
      //     }
      //     else {
      //       res.json({ status: 500, message: "Authentication Fail" })
      //       // console.log(result);
      //     }
      //   } else {
      //     res.json({ status: 500, message: 'Error, Invalid Credentials' })
      //   }
      // })
    });

    this.app.post("/forgotPassword", (req, res) => {
      // UserSchema.findOneAndUpdate({
      //   email: req.body.email
      // }, { $set: { password: req.body.password } }, { new: true }, function (err, result) {
      //   if (err) {
      //     res.send(err);
      //     console.log("error:", err);
      //     console.log("res: ", result);
      //   }
      //   else {
      //     // res.send(result);
      //     // console.log("res: " , result);
      //     if (result) {
      //       return res.json({ status: 200, message: "User password has been updated successfully" });
      //     } else {
      //       return res.json({ status: 404, message: "User not found, Please enter correct email address" });
      //     }
      //   }
      // });
    });

    this.app.post("/resendVerificationEmail", (req, res) => {
      // console.log("Resend Verification Email API");
      // const mailOptions = {
      //   from: "Admin@successive.tech", // sender address
      //   to: req.body.email, // list of receivers
      //   subject: "Account Verification Email ✔", // Subject line
      //   text: "Verification Email", // plain text body
      //   html: "<b>Please click on the link to verify your account : </b>" // html body
      // };
      // //Resend  Verification Email API
      // UserSchema.find({
      //   email: req.body.email
      // }, function (err, result) {
      //   if (result.length != 0) {
      //     transport.sendMail(mailOptions, function (error, info) {
      //       if (error) {
      //         console.log(error);
      //         return res.json({ status: 409, message: "Email not sent!, Error Sending Email" })
      //       } else {
      //         console.log('Email sent: ' + info.response);
      //         // console.log('result:', result);
      //         return res.json({ status: 200, message: "Email Sent" });

      //       }
      //     });
      //   } else {
      //     console.log("User not found");
      //     return res.json({ status: 409, message: "Invalid Credentials" })
      //   }
      // });
    })
    this.app.post("/accountVerification", (req, res) => {
      console.log("Account Verification API");
      //Account Verification API
    });

    this.app.use('/error', (req, res) => {
      throw new Error();
    });

    // this.app.use(notFound);
    // this.app.use(errorHandler);
  }

  run() {
    this.app.listen(this.config.port, () => {
      console.log("Mongo service is now running...");
      console.log('This App is Listening on port', (this.config.port));
    });
  }
}
