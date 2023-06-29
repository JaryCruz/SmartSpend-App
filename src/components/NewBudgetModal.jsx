import { useRef } from "react"
import { useBudgets } from '../contexts/BudgetsContext'

export default function NewBudgetModal({ show, handleClose }) {
  const nameRef = useRef()
  const maxRef = useRef()
  const { addBudget } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    })
    nameRef.current.value = ''
    maxRef.current.value = ''
    handleClose()
  }

  return (
    <div className={`modal ${show ? '' : 'hidden'}`}>
      <form onSubmit={handleSubmit} className="modal-content">
        <div className="modal-header">
          <h2>New Budget</h2>
          <button className="outline-primary" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <label>
          Name
          <input type="text" required ref={nameRef} />
        </label>
        <label>
          Maximum Spending
          <input type="number" min={0} step={0.01} required ref={maxRef} />
        </label>
        <button className="btn-primary" type="submit">
          Create
        </button>
      </form>
    </div>  
  )
}
