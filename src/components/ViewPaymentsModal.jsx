import { useBudgets, UNCLASSIFIED_BUDGET_ID } from '../contexts/BudgetsContext'
import { currencyFormatter } from '../utilities'

export default function NewBudgetModal({ budgetId, handleClose }) {
  const { getBudgetPayments, budgets, deleteBudget, deletePayment } = useBudgets()

  const payments = getBudgetPayments(budgetId)
  const budget =
  UNCLASSIFIED_BUDGET_ID === budgetId
    ? { name: 'Unclassified', id: UNCLASSIFIED_BUDGET_ID }
    : budgets.find(b => b.id === budgetId)

  return (
    <div className={`modal ${budgetId != null ? '' : 'hidden'}`}>
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h2>Payments - {budget?.name}</h2>
          </div>
          <button className="outline-primary" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal-body">
          {payments.map(payment => (
            <div className="payment-item" key={payment.id}>
              <h3>{payment.description}</h3>
              <div>
                <p>{currencyFormatter.format(payment.amount)}</p>
                <button className='outline-danger' onClick={() => deletePayment(payment)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        {budgetId !== UNCLASSIFIED_BUDGET_ID && (
          <button 
            onClick={() => {
              deleteBudget(budget)
              handleClose()
            }}
            className='outline-danger'
          >
            Delete
          </button>
        )}
      </div>
    </div>  
  )
}
