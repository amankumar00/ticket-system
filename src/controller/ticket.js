// create update delete

const shortid = require("shortid");
const Ticket = require("../model/ticket.js");
const User = require("../model/user");

// create Ticket method
const createTicket = async (req, res) => {
  let ticket = new Ticket();
  ticket.ticketId = shortid.generate();
  ticket.name = req.body.name;
  ticket.details = req.body.details;

  await ticket.save((error, data) => {
    if (error) {
      return res.status(400).json({
        message: "Something Went Wrong",
      });
    }
    if (data) {
      return res.status(201).json({
        message: "Ticket Created Succesfully",
      });
    }
  });
};

const assignTicketTo = async (req, res) => {
  try {
    let ticketFound = await Ticket.findOne({ ticketId: req.params.ticketId });
    if (!ticketFound) {
      return res.status(404).json({ message: "Ticket Doesnt exist" });
    }
    req.ticket = ticketFound.id;
    let userFound = await User.findOne({ uid: req.body.assignTo });
    if (!userFound) {
      return res.status(404).json({ message: "User Doesnt exist" });
    }
    req.user = userFound.uid;
    await Ticket.findOneAndUpdate(
      { ticketId: req.params.ticketId },
      { status: "In-Progress" }
    );
    await User.findOneAndUpdate(
      { uid: req.user },
      {"$push":{ assignedTicket: req.ticket }},
      { new: true}      
    );
    return res.status(201).json({ message: "Ticket Assigned" });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const setToDone = async (req, res) => {
  try {
    await Ticket.findOneAndUpdate(
      { ticketiId: req.params.ticketId },
      { status: "Done" }
    );
    return res.status(201).json({ message: "Ticket updated" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
const deleteTicket = async (req, res) => {
  try {
    await Ticket.findOneAndDelete({ ticketiId: req.params.ticketId });
    return res.status(201).json({ message: "Ticket Deleted" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createTicket,
  setToDone,
  deleteTicket,
  assignTicketTo,
};
