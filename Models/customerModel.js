const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");



const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A customer must have a name"],
      trim: true,
      maxlength: [
        40,
        "A customer name must have less or equal than 40 characters.",
      ],
      minlength: [
        2,
        "A customer name must have less or equal than 40 characters.",
      ],
    },
    surname: {
      type: String,
      required: [true, "A customer must have a name"],
      trim: true,
      maxlength: [
        40,
        "A customer name must have less or equal than 40 characters.",
      ],
      minlength: [
        2,
        "A customer name must have less or equal than 40 characters.",
      ],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return validator.isMobilePhone(v, "tr-TR")
        },
        message: props => `${props.value} is not a valid phone number for Turkey!`
      },
      required: [true, "User phone number required"],
    },
    address: {
      type: String,
      required: [true, "Please provide an adress"],
    },
    job: {
      type: String,
      required: [true, "Please provide your job"],
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer must be created by a seller"]
    },
  },
);

customerSchema.pre(/^find/, function (next) {
  //this points to the current query
  this.find({ active: { $ne: false } });
  next();
});


const Customer = mongoose.model("Customer", customerSchema);


module.exports = Customer;
