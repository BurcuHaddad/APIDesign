const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const dotenv = require("dotenv");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const Customer = require("../models/customerModel");
const client = require("../utils/message");

exports.sendMail = catchAsync(async (req, res, next) => {
  const { to, subject, body } = req.body;
  const seller = req.user;

  try {
    await sendEmail({
      email: to,
      subject: subject,
      message: body,
      seller: seller,
    });

    res.status(200).json({
      status: "success",
      message: "Email sent successfully",
    });
  } catch (err) {
    return next(new AppError("Failed to send email", 500));
  }
});

exports.sendBulkEmail = catchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const customers = await Customer.find({ seller: currentUser._id });

  try {
    for (const customer of customers) {
      const message = `Dear ${customer.name},\n\n${req.body.message}\n\nBest regards,\n${currentUser.name}`;

      await sendEmail({
        seller: currentUser,
        email: customer.email,
        subject: req.body.subject,
        message: message,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Bulk email sent successfully",
    });
  } catch (err) {
    return next(new AppError("Failed to send bulk email", 500));
  }
});

exports.sendSelectedBulkEmail = catchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const { customerIds } = req.body;
  const customers = await Customer.find({
    _id: { $in: customerIds },
    seller: currentUser._id,
  });

  try {
    for (const customer of customers) {
      const message = `Dear ${customer.name},\n\n${req.body.message}\n\nBest regards,\n${currentUser.name}`;

      await sendEmail({
        seller: currentUser,
        email: customer.email,
        subject: req.body.subject,
        message: message,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Bulk email sent successfully",
    });
  } catch (err) {
    return next(new AppError("Failed to send bulk email", 500));
  }
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { message, to } = req.body;
  const from = "whatsapp:+14155238886";

  try {
    const result = await client.messages.create({
      body: message,
      from,
      to: `whatsapp:${to}`,
    });
    res.json({ message: "Message sent successfully" });
  } catch (err) {
    return next(new AppError("Failed to send message", 500));
  }
});

exports.sendSMS = catchAsync(async (req, res, next) => {
  const { message, to } = req.body;
  const from = "+15677042523";

  try {
    const result = await client.messages.create({
      body: message,
      from,
      to: `${to}`,
    });
    res.json({ message: "Message sent successfully" });
  } catch (err) {
    console.log(err);
    return next(new AppError("Failed to send message", 500));
  }
});

exports.sendBulkMessage = catchAsync(async (req, res, next) => {
  const { message } = req.body;
  const from = "whatsapp:+14155238886";

  const currentUser = req.user;
  const customers = await Customer.find({ seller: currentUser._id });

  try {
    const results = await Promise.all(
      customers.map((customer) => {
        return client.messages.create({
          body: message,
          from,
          to: `whatsapp:${customer.phone}`,
        });
      })
    );
    res.json({ message: "Messages sent successfully" });
  } catch (err) {
    return next(new AppError("Failed to send messages", 500));
  }
});

exports.sendSelectedBulkMessage = catchAsync(async (req, res, next) => {
  const { message } = req.body;
  const { customerIds } = req.body;
  const from = "whatsapp:+14155238886";

  const currentUser = req.user;
  const customers = await Customer.find({
    _id: { $in: customerIds },
    seller: currentUser._id,
  });

  try {
    const results = await Promise.all(
      customers.map((customer) => {
        return client.messages.create({
          body: message,
          from,
          to: `whatsapp:${customer.phone}`,
        });
      })
    );
    res.json({ message: "Messages sent successfully" });
  } catch (err) {
    return next(new AppError("Failed to send messages", 500));
  }
});
