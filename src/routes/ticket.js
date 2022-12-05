const express = require('express');
const { createTicket, setToDone, deleteTicket, assignTicketTo } = require('../controller/ticket');
const router = express.Router();

router.post('/newTicket', createTicket );
router.patch('/setToDone/:ticketId', setToDone);
router.delete('/deleteTicket/:ticketId', deleteTicket)
router.post('/assignTicketTo/:ticketId',assignTicketTo)
module.exports = router;