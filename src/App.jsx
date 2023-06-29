import { useState } from 'react'
import BudgetCard from './components/BudgetCard'
import NewBudgetModal from './components/NewBudgetModal'
import NewPaymentModal from './components/NewPaymentModal'
import { UNCLASSIFIED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext'
import UnclassifiedBudgetCard from './components/UnclassifiedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard'
import ViewPaymentsModal from './components/ViewPaymentsModal'
import HeaderFilterForm from './components/HeaderFilterForm'

export default function App() {
  const [showNewBudgetModal, setShowNewBudgetModal] = useState(false)
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false)
  const [viewPaymentsModalBudgetId, setViewPaymentsModalBudgetId] = useState()
  const [filterBudget, setFilterBudget] = useState('')
  const { budgets, getBudgetPayments } = useBudgets()

  const filteredBudgets = budgets.filter(budget => {
    return budget.name.includes(filterBudget)
  })

  return (
    <>
      <div>
        <HeaderFilterForm 
          onNewBudgetClick={() => setShowNewBudgetModal(true)} 
          onNewPaymentClick={() => setShowNewPaymentModal(true)}
          budget={filterBudget}
          setBudget={setFilterBudget}
        />
        <div className="card-container container">
          {filteredBudgets.map(budget => {
            const amount = getBudgetPayments(budget.id).reduce(
              (total, payment) => total + payment.amount,
              0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onNewPaymentClick={() => setShowNewPaymentModal(true)}
                onViewPaymentsClick={() => setViewPaymentsModalBudgetId(budget.id)}
              />
            )
          })}
          <UnclassifiedBudgetCard 
            onNewPaymentClick={() => setShowNewPaymentModal(true)} 
            onViewPaymentsClick={() => setViewPaymentsModalBudgetId(UNCLASSIFIED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </div>
      <NewBudgetModal 
        show={showNewBudgetModal} 
        handleClose={() => setShowNewBudgetModal(false)} 
      />
      <NewPaymentModal 
        show={showNewPaymentModal} 
        handleClose={() => setShowNewPaymentModal(false)} 
      />
      <ViewPaymentsModal 
        budgetId={viewPaymentsModalBudgetId}
        handleClose={() => setViewPaymentsModalBudgetId()} 
      />
    </>
  )
}
