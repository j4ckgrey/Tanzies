import { useEffect, useState, useRef } from 'react'
import React from "react"
import Die from './components/Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)
  const gameWonButtonRef = useRef(null)

  useEffect(() => {
    if (gameWon && gameWonButtonRef.current) {
      gameWonButtonRef.current.focus()
    }
  }, [gameWon])

  function newGame() {
    setDice(() => generateAllNewDice())
  }

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }))
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die =>
      die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    ))
  }

  function hold(id) {
    setDice(prevDice => prevDice.map(die => 
      die.id === id ? {...die, isHeld: !die.isHeld} : die
    ))
  }

  const diceElements = dice.map(dieObj => 
    <Die 
      hold={() => hold(dieObj.id)} 
      isHeld={dieObj.isHeld} 
      key={dieObj.id} 
      value ={dieObj.value} 
    />
  )
  
  return (
      <main>
        {gameWon && <Confetti />}
        <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until the dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>
          <button className="roll-dice" onClick={gameWon ? newGame : rollDice} ref={gameWonButtonRef}>
            {gameWon ? "New Game" : "Roll"}
          </button>
      </main>
  )
}
