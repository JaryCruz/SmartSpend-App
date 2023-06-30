import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { payments, budgets } = useBudgets()
  const amount = payments.reduce((total, payment) => total + payment.amount, 0)
  const max = budgets.reduce((total, budget) => total + budget.max, 0)
  if (max === 0) return null

  return <BudgetCard amount={amount} hideButtons max={max} name='Total' />
}
