"use strict";

/**
 * Get unique error field name
 */
const uniqueMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }

  return output;
};

/**
 * Get the erroror message from error object
 */
exports.errorHandler = (error) => {
  let message = "";

  if (error.code) {
    switch (error.code) {
      //for the case of 11000 and 110001, we created this to display error message and
      // if not we handle other error in else and return the message
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    //for other we loop between them and display the error between them
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message)
        message = error.errorors[errorName].message;
    }
  }

  return message;
};
