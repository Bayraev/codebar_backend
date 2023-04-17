// const questionModel = require('../models/questionsModel');

// module.exports.questionsController = {
//   getAllQuestions: async (_, res) => {
//     try {
//       const questions = await questionModel.find();
//       res.status(200).json(questions);
//     } catch (error) {
//       res.status(400).json({ error: error });
//     }
//   },

//   createQuestion: async (req, res) => {
//     try {
//       const { card, category, see, tags, image } = req.body;

//       const question = await questionModel.create({
//         card,
//         category,
//         see,
//         tags,
//         image,
//       });
//       console.log('post works');
//       res.status(200).json(question);
//     } catch (error) {
//       res.status(400).json({ error: error });
//       console.log(error);
//     }
//   },

//   deleteQuestion: async (req, res) => {
//     try {
//       const question = await questionModel.findByIdAndDelete(req.params.id);
//       res.status(200).json(question);
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   },

//   // updQuestion https://youtu.be/afzkeKxEakg?t=769
//   updateQuestion: async (req, res) => {
//     try {
//       const question = await questionModel.findByIdAndUpdate(
//         req.params.id,
//         // its body:
//         {
//           category: req.body.category,
//         },
//         // эт штука перенную обновляет после отправки запроса изменения к модели:
//         { new: true },
//       );

//       res.status(200).json(question);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },
// };
