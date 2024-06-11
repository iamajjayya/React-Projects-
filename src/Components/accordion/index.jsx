import { useState } from "react";
import data from "../data";
import './styles.css'


const Accordion = () => {
    const [selected,setSelected] = useState(null);
    const [enableMultiselection,setEnableMultiselection] = useState(false);
    const [multiple , setMultiple] =useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId == selected ? null : getCurrentId)

    }

    function  handleMultiSelection(getCurrentId) {
        let cpyMultiple =  [...multiple];
        const findIndexofCurrentId = cpyMultiple.indexOf(getCurrentId);
        console.log(findIndexofCurrentId);
        if(findIndexofCurrentId === -1) cpyMultiple.push(getCurrentId);
        else cpyMultiple.splice(findIndexofCurrentId,1);
        setMultiple(cpyMultiple);     
    }
    console.log(selected,multiple);
  return (
    <>
    <div className="wrapper">
    <button onClick={ () => setEnableMultiselection(!enableMultiselection)}> Enable Multi selection </button>
    <div className="accordian">
    {
        data && data.length > 0 ? 
        data.map(dataItem  => <div className="item" key={dataItem.id}>
            <div onClick={ enableMultiselection 
            ? () => handleMultiSelection(dataItem.id)
             : () => handleSingleSelection(dataItem.id)} className="title" > 
            <h3>{dataItem.question}</h3>
            <span>+</span>
            </div>
            <div>
            {
                enableMultiselection ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                )
                : selected === dataItem.id && (
                    <div className="content"> {dataItem.answer}</div>
                )
            }
            </div>
        </div>)
        : <div>No data found</div>
    }

    </div>

    </div>
    </>
  )
}

export default Accordion