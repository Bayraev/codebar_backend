const messageModel = require('../models/messageModel');

module.exports.contactsController = {
  getAllMessages: async (_, res) => {
    try {
      const messages = await messageModel.find();
      res.status(200).json(messages);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
  getMessagesByContactEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const messagesByEmail = await messageModel.find({ email });
      res.status(200).json(messagesByEmail);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
  createMessagesAndContact: async (req, res) => {
    try {
      const { from, name, email, title, text } = req.body;

      const newMessageModel = await messageModel.create({
        from,
        name,
        email,
        title,
        text,
      });

      res.status(200).json(newMessageModel);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};
