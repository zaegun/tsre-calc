import { useState, useEffect } from 'react';
import '../stylesheets/calc.css';
import HistorySnippet from './HistorySnippet';

type historyProps = {history: string}

function Calc (props : historyProps) {
    const [phase, setPhase] = useState(1)
    let [firstVal, setFirstVal] = useState('0')
    let [secondVal, setSecondVal] = useState('0')
    let [answer, setAnswer] = useState('')
    const [mod, setMod] = useState('')
    const [equation, setEquation] = useState('')

    const display = () => {
        switch(phase){
            case 1:
                return firstVal
            case 2: 
                return secondVal
            case 3:
                return answer
        }
    }

    const userInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let button: HTMLButtonElement = e.currentTarget;

        if(phase === 1) {
            let input = firstVal + button.value
            input = input.replace(/^0+/, '')
            setFirstVal(input)
        }
        else if(phase === 2) {
            let input = secondVal + button.value
            input = input.replace(/^0+/, '')
            setSecondVal(input)
        }
    }

    const setCalcMod = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(phase === 1) {
            e.preventDefault();
            let button: HTMLButtonElement = e.currentTarget;
            button.className += " active"
            setMod(button.value)
            shiftPhase()
        }
    }

    const shiftPhase = () => {
        setPhase(phase === 3 ? 1 : phase + 1)
    }

    const modCheck = () => {
        if(phase === 2){
            if(mod === '+'){ addCompute() }
            else if(mod === '-'){ subCompute() }
            else if(mod === '*'){ multiCompute() }
            else{ divCompute() }
        }
    }

    const addCompute = () => {
        let first : number = convert(firstVal)
        let second : number = convert(secondVal)
        let answer : number = first + second
        setAnswer(String(answer))
        shiftPhase()
    }

    const subCompute = () => {
        let first : number = convert(firstVal)
        let second : number = convert(secondVal)
        let answer : number = first - second
        setAnswer(String(answer))
        shiftPhase() 
    }

    const multiCompute = () => {
        let first : number = convert(firstVal)
        let second : number = convert(secondVal)
        let answer : number = first * second
        setAnswer(String(answer))
        shiftPhase()
    }

    const divCompute = () => {
        let first : number = convert(firstVal)
        let second : number = convert(secondVal)
        let answer : number = first / second
        setAnswer(String(answer))
        shiftPhase()
    }

    const convert = (s: string) => {
        return Number(s)
    }

    const setPercentage = () => {
        if(phase == 1) {
            let val = Number(firstVal) / 100
            setFirstVal(String(val))
        }
        else if(phase == 2) {
            let val = Number(secondVal) / 100
            setSecondVal(String(val))
        }
    }

    const plusMinus = () => {
        if(phase == 1) {
            let val = Number(firstVal) * (-1)
            setFirstVal(String(val))
        }
        else if(phase == 2) {
            let val = Number(secondVal) * (-1)
            setSecondVal(String(val))
        }
    }

    const fullReset = () => {
        setPhase(1)
        setFirstVal('0')        
        setSecondVal('0')
        setMod('')
        setEquation('')
    }

    return (
    <div className="calc-contain">
        <div className="history-container grid-extend">
            <div className="history-title"><h1>{props.history}</h1></div>
            <HistorySnippet />
        </div>
        <div className="grid-container">
            <button className="grid-text">{display()}</button>
            <button className="grid-item grid-button grid-ac grid-mod" onClick={fullReset}>AC</button>
            <button className="grid-item grid-button grid-rev grid-mod" onClick={plusMinus}>&#177;</button>
            <button className="grid-item grid-button grid-per grid-mod" onClick={setPercentage}>%</button>
            <button className="grid-item grid-button grid-div grid-op" value='/' onClick={setCalcMod}>&#247;</button>

            <button className="grid-item grid-button grid-n7 grid-num" value='7' onClick={userInput}>7</button>
            <button className="grid-item grid-button grid-n8 grid-num" value='8' onClick={userInput}>8</button>
            <button className="grid-item grid-button grid-n9 grid-num" value='9' onClick={userInput}>9</button>
            <button className="grid-item grid-button grid-multi grid-op" value='*' onClick={setCalcMod}>&#215;</button>

            <button className="grid-item grid-button grid-n4 grid-num" value='4' onClick={userInput}>4</button>
            <button className="grid-item grid-button grid-n5 grid-num" value='5' onClick={userInput}>5</button>
            <button className="grid-item grid-button grid-n6 grid-num" value='6' onClick={userInput}>6</button>
            <button className="grid-item grid-button grid-sub grid-op" value='-' onClick={setCalcMod}>−</button>

            <button className="grid-item grid-button grid-n1 grid-num" value='1' onClick={userInput}>1</button>
            <button className="grid-item grid-button grid-n2 grid-num" value='2' onClick={userInput}>2</button>
            <button className="grid-item grid-button grid-n3 grid-num" value='3' onClick={userInput}>3</button>
            <button className="grid-item grid-button grid-add grid-op" value='+' onClick={setCalcMod}>+</button>
            
            <button className="grid-item grid-zero grid-n0 grid-num" value='0' onClick={userInput}>0</button>
            <button className="grid-item grid-button grid-dot grid-num" value='.' onClick={userInput}>.</button>
            <button className="grid-item grid-button grid-submit grid-op" onClick={modCheck}>=</button>
        </div>
    </div>
    );
}

export default Calc