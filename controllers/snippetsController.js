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

  getSnippetsById: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const snippets = await snippetsModel.find({ ownerId: id });

      res.status(200).json(snippets);
    } catch (error) {
      console.log('user get snippets err');
      res.json({ error });
    }
  },

  createSnippet: async (req, res) => {
    try {
      // REQUEST from front
      const { snippet, title, description, ownerId, uniqId, tags } = req.body;

      console.log('Tryna3: ', snippet, title, description, ownerId, uniqId, tags);
      // Creating new model for DB
      const snippetModel = await snippetsModel.create({
        // assigning these keys with information from request
        ownerId,
        uniqId,
        title,
        snippet,
        description,
        tags,
      });

      res.status(200).json(snippetModel);
    } catch (error) {
      res.status(400).json({ error: error });
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
