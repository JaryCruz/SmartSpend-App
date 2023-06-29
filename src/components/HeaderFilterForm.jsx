import { useBudgets } from "../contexts/BudgetsContext"

export default function HeaderFilterForm({ budget, setBudget, onNewBudgetClick, onNewPaymentClick }) {
  const { theme, toggleTheme } = useBudgets()

  return (
    <header>
      <div className="header-appearance container">
        <h1>SmartSpend</h1>
        <button onClick={toggleTheme} className="btn-primary">
          <i className={`fa-regular ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
        </button>
      </div>
      <hr />
      <div className='header-actions container'>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder='Search for a budget...' 
            value={budget} 
            onChange={e => setBudget(e.target.value)} 
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div>
          <button 
            className='btn-primary' 
            onClick={onNewBudgetClick} 
          >
            New Budget
          </button>
          <button 
            className='outline-primary' 
            onClick={onNewPaymentClick} 
          >
            New Payment
          </button>
        </div>
      </div> 
    </header>
  )
}
