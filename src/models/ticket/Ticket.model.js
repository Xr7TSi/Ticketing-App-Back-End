const { TicketSchema } = require("./Ticket.schema");

const insertTicket = (newTicketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(newTicketObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.save / " + error));
    } catch (error) {
      console.log("Error at insertTicket / " + error);
    }
  });
};

const getAllTickets = () => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find()
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.find / " + error));
    } catch (error) {
      console.log("Error at getAllOpenTickets / " + error);
    }
  });
};

const getTicketsByUserId = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ clientId })
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.find / " + error));
    } catch (error) {
      console.log("Error at getTickets / " + error);
    }
  });
};

const getTicketById = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOne({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.find / " + error));
    } catch (error) {
      console.log("Error at getTicketById / " + error);
    }
  });
};

const addClientMessage = (_id, message, sender, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id, clientId },
        {
          status: "Pending operator response",
          $push: {
            conversations: { message, sender },
          },
        },
        { new: true }
      )

        .then((data) => resolve(data))
        .catch((error) =>
          reject("Error at TicketSchema.findOneAndUpdate / " + error)
        );
    } catch (error) {
      console.log("Error at addClientMessage / " + error);
    }
  });
};

const updateStatusClosed = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id, clientId },
        {
          status: "Closed",
        },
        { new: true }
      )

        .then((data) => resolve(data))
        .catch((error) =>
          reject("Error at TicketSchema.findOneAndUpdate / " + error)
        );
    } catch (error) {
      console.log("Error at updateStatusClosed / " + error);
    }
  });
};

const deleteTicket = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndDelete({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) =>
          reject("Error at TicketSchema.findOneAndDelete / " + error)
        );
    } catch (error) {
      console.log("Error at deleteTicket / " + error);
    }
  });
};

module.exports = {
  insertTicket,
  getAllTickets,
  getTicketsByUserId,
  getTicketById,
  addClientMessage,
  updateStatusClosed,
  deleteTicket,
};
