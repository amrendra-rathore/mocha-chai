// import UserSchema from "../../model/user";
const UserSchema = require("../../model/user");
const nodemailer = require('nodemailer');

module.exports = class Controller {

    async login(req, res) {
        try {
            const user = await UserSchema.find({ email: req.body.email });
            if (!user) {
                throw new Error("User not found!");
            }
            if (user) {
                if ((user[0]?.password == req.body.password) && (user[0]?.email == req.body.email)) {
                    res.json({ status: 200, message: "Authentication successful" })
                }
                else {
                    res.json({ status: 500, message: "Authentication Fail" })
                }
            } else {
                res.json({ status: 500, message: 'Error, Invalid Credentials' })
            }
        } catch (error) {
            console.log("Something went wrong: Service: login -> ", error.statusCode);
            throw new Error(error);
        }
    }

    signup(req, res) {
        UserSchema.find({
            email: req.body.email
        }, function (err, result) {
            const regex = /^([A-Za-z0-9_\-\.])+\@(successive.tech)$/;
            const userDetails = new UserSchema(req.body)
            if (regex.test(req.body.email)) {
                if (result.length == 0) {
                    userDetails.save((err) => {
                        if (!err) {
                            console.log("No Error");
                        }
                        else {
                            // console.log('Error during record insertion');
                            res.json({ status: 200 });
                        }
                    })
                    res.json({ status: 200, message: "User created successfully" });
                }
                else {
                    return res.json({ status: 409, message: "User already exists" });
                }
            } else {
                return res.json({ status: 404, message: "Invalid Email Address" });
            }
        });
    }

    forgotPassword(req, res) {
        UserSchema.findOneAndUpdate({
            email: req.body.email
        }, { $set: { password: req.body.password } }, { new: true }, function (err, result) {
            if (err) {
                res.send(err);
                console.log("error:", err);
                console.log("res: ", result);
            }
            else {
                if (result) {
                    return res.json({ status: 200, message: "User password has been updated successfully" });
                } else {
                    return res.json({ status: 404, message: "User not found, Please enter correct email address" });
                }
            }
        });
    }
    resendVerificationEmail(req, res) {
        console.log("Resend Verification Email API");
        const mailOptions = {
          from: "Admin@successive.tech", // sender address
          to: req.body.email, // list of receivers
          subject: "Account Verification Email ✔", // Subject line
          text: "Verification Email", // plain text body
          html: "<b>Please click on the link to verify your account : </b>" // html body
        };
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c27e15afe92386",
              pass: "f17aaee06c7def"
            }
          });
    
        //Resend  Verification Email API
        UserSchema.find({
          email: req.body.email
        }, function (err, result) {
          if (result.length != 0) {
            transport.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                return res.json({ status: 409, message: "Email not sent!, Error Sending Email" })
              } else {
                console.log('Email sent: ' + info.response);
                // console.log('result:', result);
                return res.json({ status: 200, message: "Email Sent" });
  
              }
            });
          } else {
            console.log("User not found");
            return res.json({ status: 409, message: "Invalid Credentials" })
          }
        });
    }
}