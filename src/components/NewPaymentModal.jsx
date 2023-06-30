import { useRef, useEffect } from "react"
import { useBudgets, UNCLASSIFIED_BUDGET_ID } from '../contexts/BudgetsContext'

export default function NewPaymentModal({ show, handleClose }) {
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const { addPayment, budgets } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()
    addPayment({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    })
    descriptionRef.current.value = ''
    amountRef.current.value = ''
    budgetIdRef.current.value = ''
    handleClose()
  }

  useEffect(() => {
    if (show && descriptionRef.current) {
      descriptionRef.current.focus()
    }
  }, [show])

  return (
    <div className={`modal ${show ? '' : 'hidden'}`}>
      <form onSubmit={handleSubmit} className="modal-content">
        <div className="modal-header">
          <h2>New Payment</h2>
          <button className="outline-primary" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <label>
          Description
          <input type="text" required ref={descriptionRef} />
        </label>
        <label>
          Amount
          <input type="number" min={0} step={0.01} required ref={amountRef} />
        </label>
        <label>
          Budget
          <select ref={budgetIdRef} required>
            <option value={UNCLASSIFIED_BUDGET_ID}>Unclassified</option>
            {budgets.map(budget => (
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
          </select>
        </label>
        <button className="btn-primary" type="submit">
          Add
        </button>
      </form>
    </div>  
  )
}
