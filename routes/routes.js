const express = require("express");
const transactionService = require("../services/transactionService");
const transactionRouter = express.Router();

const hasPeriod = (req, res, next) => {
  try {
    if (req.query.period == undefined) {
      return res.send({
        error:
          "É necessario informar o parametro period, cujo formato deve ser YYYY-MM",
      });
    }
  } catch (erro) {}
  next();
};

transactionRouter.get("/", hasPeriod, transactionService.get);
transactionRouter.put("/:id", transactionService.put);
transactionRouter.delete("/:id", transactionService.del);
transactionRouter.get("/months", transactionService.getMonths);

module.exports = transactionRouter;
