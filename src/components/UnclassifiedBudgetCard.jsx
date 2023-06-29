import BudgetCard from "./BudgetCard";
import { useBudgets, UNCLASSIFIED_BUDGET_ID } from "../contexts/BudgetsContext";

export default function UnclassifiedBudgetCard(props) {
  const { getBudgetPayments } = useBudgets()
  const amount = getBudgetPayments(UNCLASSIFIED_BUDGET_ID).reduce(
    (total, payment) => total + payment.amount,
    0
  )
  if (amount === 0) return null

  return <BudgetCard amount={amount} name='Unclassified' total {...props}  />
}
