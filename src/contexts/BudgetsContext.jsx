import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export const UNCLASSIFIED_BUDGET_ID = "Unclassified"

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", [])
  const [payments, setPayments] = useLocalStorage("payments", [])
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
    document.body.setAttribute('data-theme', theme)
  }

  function getBudgetPayments(budgetId) {
    return payments.filter(payment => payment.budgetId === budgetId)
  }

  function addPayment({ description, amount, budgetId }) {
    setPayments(prevPayments => {
      return [...prevPayments, { id: uuidV4(), description, amount, budgetId }]
    })
  }

  function addBudget({ name, max }) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidV4(), name, max }]
    })
  }

  function deleteBudget({ id }) {
    setPayments(prevPayments => {
      return prevPayments.map(payment => {
        if (payment.budgetId !== id) return payment
        return { ...payment, budgetId: UNCLASSIFIED_BUDGET_ID }
      })
    })

    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }

  function deletePayment({ id }) {
    setPayments(prevPayments => {
      return prevPayments.filter(payment => payment.id !== id)
    })
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        payments,
        getBudgetPayments,
        addPayment,
        addBudget,
        deleteBudget,
        deletePayment,
        theme,
        toggleTheme
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}