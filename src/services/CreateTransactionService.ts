import TransactionsRepository from "../repositories/TransactionsRepository";
import Transaction from "../models/Transaction";

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== "income" && type !== "outcome") {
      throw Error("invalid transaction type");
    }
    const balance = this.transactionsRepository.getBalance();
    if (type === "outcome" && value > balance.total) {
      throw Error("Outcome value is greatter then total avaliable.");
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
