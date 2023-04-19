const snippetsModel = require('../models/snippetModel');

module.exports.snippetsController = {
  getAllSnippets: async (_, res) => {
    try {
      const snippets = await snippetsModel.find();
      res.status(200).json(snippets);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  createSnippet: async (req, res) => {
    try {
      // REQUEST from front
      const { snippet, title, description } = req.body;

      // Creating new model for DB
      const snippetModel = await snippetsModel.create({
        // assigning these keys with information from request
        snippet,
        title,
        description,
      });

      res.status(200).json(snippetModel);
    } catch (error) {
      res.status(400).json({ error: error });
      console.log(error);
    }
  },

  deleteSnippet: async (req, res) => {
    try {
      const snippet = await snippetsModel.findByIdAndDelete(req.params.id);
      res.status(200).json(snippet);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // updQuestion https://youtu.be/afzkeKxEakg?t=769
  updateQuestion: async (req, res) => {
    try {
      const snippet = await snippetsModel.findByIdAndUpdate(
        req.params.id,
        // its body:
        {
          snippet: req.body.snippet,
          title: req.body.title,
          description: req.body.description,
        },
        // эт штука перенную обновляет после отправки запроса изменения к модели:
        { new: true },
      );

      res.status(200).json(snippet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
