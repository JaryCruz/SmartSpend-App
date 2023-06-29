import { currencyFormatter } from "../utilities"

export default function BudgetCard({
  name,
  amount,
  max,
  total,
  hideButtons,
  onNewPaymentClick,
  onViewPaymentsClick
}) {
  const classNames = []
  if (amount > max) {
    classNames.push("bg-max")
  } else if (total) {
    classNames.push("bg-total")
  }

  const progressWidth = amount / max * 100
  
  return (
    <div className={`card-budget ${classNames.join(' ')}`}>
      <div className="card-title">
        <h2>{name}</h2>
        <div className="card-details">
          {currencyFormatter.format(amount)}
          {max && (
            <span>
              / {currencyFormatter.format(max)}
            </span>
          )}
        </div>
      </div>
      {max && (
        <div className="progress-bar">
          <div 
            className={`progress ${getProgressBarClass(amount, max)}`}
            style={{ width: `${progressWidth}%` }}
          >
          </div>
        </div>
      )}
      {!hideButtons && (
        <div className="card-buttons">
          <button className="outline-primary" onClick={onNewPaymentClick}>
            New Payment
          </button>
          <button className="btn-primary" onClick={onViewPaymentsClick}>
            View Payments
          </button>
        </div>
      )}
    </div>
  )
}

function getProgressBarClass(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) return "normal"
  if (ratio < 0.75) return "warning"
  return "danger"
}