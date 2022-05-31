const db = require('../models/qAnda');

module.exports = {
  getQuestions: (req, res) => {
    let { product_id, count } = req.query;

    if (!count) {
      count = 4;
    }

    db.getQuestions(product_id, count, (err, result) => {
      if (err) {
        res.send('error');
      } else {
        res.send(result);
      }
    });
  },
  addQuestion: (req, res) => {
    const {
      product_id, body, name, email,
    } = req.body;

    db.addQuestion(product_id, body, name, email, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  },
  getAnswers: (req, res) => {
    let { question_id } = req.params;
    let { count } = req.query;

    if (!count) {
      count = 4;
    }
    db.getAnswers(question_id, count, (err, results) => {
      if (err) {
        res.send('error');
      } else {
        res.send(results);
      }
    });
  },
  addAnswer: (req, res) => {
    const { question_id } = req.params;
    const {
      body, date_written, name, email, photos,
    } = req.body;
    let dt = new Date();
    dt = dt.getTime();

    if (!date_written) {
      let dt = new Date();
      dt = dt.getTime();
      date_written = dt;
    }
    if (!Array.isArray(photos)) {
      photos = [];
    }
    db.addAnswer(question_id, body, date_written, name, email, photos, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  },
  updateQuestionHelpful: (req, res) => {
    const { question_id } = req.params;
    if (!question_id) {
      res.send('error');
    }
    db.addQuestionHelpful(question_id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  },
  updateAnswerHelpful: (req, res) => {
    const { answer_id } = req.params;
    if (!answer_id) {
      res.send('error');
    }
    db.addAnswerHelpful(answer_id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  },
  reportQuestion: (req, res) => {
    const { question_id } = req.params;
    if (!question_id) {
      res.send('error');
    }
    db.reportQuestion(question_id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  },
  reportAnswer: (req, res) => {
    const { answer_id } = req.params;
    if (!answer_id) {
      res.send('error');
    }
    db.reportAnswer(answer_id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  },
};
