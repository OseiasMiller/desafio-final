const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

const get = async (req, res) => {
  const { period } = req.query;
  const transactions = await TransactionModel.find({ yearMonth: period });
  res.send({ length: transactions.length, transactions: transactions });
};

const put = async (req, res) => {
  const { id } = req.params;
  console.log(req.params, req.body);
  try {
    const transaction = await TransactionModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(transaction);
  } catch (error) {
    res.status(500).send({
      status: "Error",
      msg: "Erro ao atualizar",
      error: error,
    });
  }
};

const del = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await TransactionModel.findByIdAndDelete(id);
    res.send({ status: "Sucesso", msg: "Deletado com sucesso" });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      msg: "Erro ao deletar",
      error: error,
    });
  }
};

const getMonths = async (req, res) => {
  const months = await TransactionModel.distinct("yearMonth");
  res.send(months);
};

module.exports = { get, put, del, getMonths };
