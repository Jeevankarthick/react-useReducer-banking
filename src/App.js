import { useReducer } from "react";
import "./styles.css";

const INITIAL_ACC_BAL = 500;
const DEPOSIT_150 = 150;
const WITHDRAW_50 = 50;
const LOAN_5000 = 5000;

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  isHavingLoan: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: INITIAL_ACC_BAL, isActive: true };

    case "deposit":
      return { ...state, balance: state.balance + DEPOSIT_150 };

    case "withdraw":
      if (state.balance < WITHDRAW_50) return state;
      return { ...state, balance: state.balance - WITHDRAW_50 };

    case "loan":
      if (state.isHavingLoan) return state;
      return {
        ...state,
        balance: state.balance + LOAN_5000,
        loan: LOAN_5000,
        isHavingLoan: true,
      };

    case "payLoan":
      if (!state.isHavingLoan) return state;
      return {
        ...state,
        balance: state.balance - LOAN_5000,
        loan: 0,
        isHavingLoan: false,
      };

    case "closeAccount":
      if (state.balance === 0 && state.isHavingLoan === false) {
        return initialState;
      } else {
        return state;
      }

    default:
      throw new Error("unknown ACTION");
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer - Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit" })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw" })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "loan" })} disabled={!isActive}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
