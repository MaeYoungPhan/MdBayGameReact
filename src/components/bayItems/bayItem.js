import { useEffect, useState } from "react"
import { findItem, resetItem } from "../../managers/BayItemsManager"
import "./bayItems.css"


export const BayItem = ({ bayItem, getAllBayItems }) => {    

    const handleFind = (id) => {
        findItem(id).then(() => {
            {getAllBayItems()}
            }) 
    }

    const handleReset = (id) => {
        resetItem(id).then(() => {
            {getAllBayItems()}
            }) 
    }

    return <>
        {
        bayItem.found ?
        <div>
            <section className="bayItem" key={`bayItem--${bayItem.id}`}>
                <img className="bayItem--photo"src={bayItem.found_img} alt={`Image of ${bayItem.name}`}/>
                <h5>{bayItem.name}</h5>
                <button onClick={ () => { handleReset(bayItem.id) } }>reset</button>
            </section>
        </div>
        :
        <div>
            <section className="bayItem" key={`bayItem--${bayItem.id}`}>
                <img className="bayItem--photo"src={bayItem.default_img} alt={`Image of ${bayItem.name}`}/>
                <h5>{bayItem.name}</h5>
                <button onClick={ () => { handleFind(bayItem.id) } }>Found it!</button>
            </section>
        </div>
        }
        </>
}