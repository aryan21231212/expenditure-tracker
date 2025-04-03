import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import axios from "axios"

const App = () => {
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [balance, setBalance] = useState("0")
  const [response, setResponse] = useState([]);

  // sending data
  const defaultSubmit = async (e) => {
    e.preventDefault()
    let response = await axios.post("http://localhost:3000/expenditure",
      {
        price,
        title,
        date,
        desc
      }
    );
    expen()
  }

  // receiving data
  const expen = async () => {
    let response = await axios.get("http://localhost:3000/get")
    setResponse(response.data)
  }

  useEffect(() => {
    expen()
  }, [])

  useEffect(() => {
    let newBalance = response.reduce((acc, curr) => {
      return acc + parseFloat(curr.price);
    }, 0);
    setBalance(newBalance.toFixed(2));
  }, [response]);

  return (
    <Container>
      <div className="main">
        <header>
          <h1>Financial Tracker</h1>
          <div className="balance-container">
            <p className="balance-label">Current Balance</p>
            <h2 className="currentBalance">${balance}</h2>
          </div>
        </header>
        
        <form method='post' onSubmit={(e) => { defaultSubmit(e) }}>
          <div className="form-container">
            <h3>Add New Transaction</h3>
            <div className='form-row'>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input 
                  id="amount"
                  onChange={(e) => { setPrice(e.target.value) }} 
                  type="text" 
                  placeholder='Enter amount (use + for income)' 
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                  id="title"
                  onChange={(e) => { setTitle(e.target.value) }} 
                  type="text" 
                  placeholder='Transaction title' 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input 
                  id="date"
                  onChange={(e) => { setDate(e.target.value) }} 
                  type="date" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input 
                  id="desc"
                  onChange={(e) => { setDesc(e.target.value) }} 
                  type="text" 
                  placeholder='Brief description' 
                />
              </div>
            </div>
            <button type='submit'>Add Transaction</button>
          </div>
        </form>
        
        <div className="transactions-container">
          <h3>Recent Transactions</h3>
          {response.length === 0 ? (
            <div className="no-transactions">No transactions recorded yet</div>
          ) : (
            response.map((ele, index) =>
              <div className="expenditure" key={index}>
                <div className="transaction-details">
                  <div className='title'>{ele.title}</div>
                  <div className='desc'>{ele.desc}</div>
                </div>
                <div className="transaction-metrics">
                  <div className={ele.price[0] === '+' ? 'price income' : 'price expense'}>
                    {ele.price}
                  </div>
                  <div className='date'>{ele.date}</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Container>
  )
}

export default App

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  font-family: 'Georgia', serif;

  .main {
    width: 800px;
    margin-top: 3rem;
    padding-bottom: 3rem;
  }

  header {
    margin-bottom: 2rem;
    text-align: center;
    
    h1 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-weight: 700;
    }
  }

  .balance-container {
    background-color: #2c3e50;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .balance-label {
    color: #ecf0f1;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .currentBalance {
    font-size: 2.5rem;
    color: #ecf0f1;
    margin: 0;
  }

  .form-container {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }

  .form-container h3 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-weight: 600;
    font-size: 1.3rem;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.75rem;
  }

  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 500;
  }

  input {
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #2c3e50;
    background-color: white;
    transition: border-color 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: #7f8c8d;
    box-shadow: 0 0 0 2px rgba(127, 140, 141, 0.2);
  }

  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 4px;
    margin-top: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  button:hover {
    background-color: #34495e;
  }

  .transactions-container {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .transactions-container h3 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-weight: 600;
    font-size: 1.3rem;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.75rem;
  }

  .no-transactions {
    text-align: center;
    padding: 2rem;
    color: #7f8c8d;
    font-style: italic;
  }

  .expenditure {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid #ecf0f1;
  }

  .transaction-details {
    flex: 1;
  }

  .title {
    font-size: 1.1rem;
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .desc {
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .transaction-metrics {
    text-align: right;
    min-width: 120px;
  }

  .price {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .income {
    color: #27ae60;
  }

  .expense {
    color: #c0392b;
  }

  .date {
    color: #7f8c8d;
    font-size: 0.85rem;
  }

  @media (max-width: 840px) {
    .main {
      width: 90%;
      margin: 2rem auto;
    }
  }

  @media (max-width: 640px) {
    .form-row {
      flex-direction: column;
      gap: 0.75rem;
    }
  }
`