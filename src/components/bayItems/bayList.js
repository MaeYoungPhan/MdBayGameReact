import { useEffect, useState } from "react"
import { TripList } from "../recordOfTrips/tripList"
import "./bayItems.css" 
import { getBayItems, findItem, resetItem } from "../../managers/BayItemsManager"
import { Row, Col, Image, Button } from 'react-bootstrap';


export const BayItemsList = () => {
    const [bayItems, setBayItems] = useState([])

    const getAllBayItems = () => {
        getBayItems().then(data => setBayItems(data))
    }

    useEffect(() => {
        getAllBayItems()
    }, [])

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
        <section className="bayItems-page--header">
        <TripList/>
        <div>
            <h1>Can you find these Chesapeake Bay Related Things?</h1>
            <h4>When you spot on on your trip, click 'Found it!'</h4>
        </div>
        </section>
        
        <div className="bayItems-page--container">

        <article className="grid-container--bayItems">
            {
                bayItems.map(
                    (bayItem) => {
                    return <>
                    {
                    bayItem.found ?
                    <div>
                        <section className="grid--bayItem" key={`bayItem--${bayItem.id}`}>
                            <img className="bayItem--photo"src={bayItem.found_img} alt={`Image of ${bayItem.name}`}/>
                            <h3 className="bayItem--name">{bayItem.name}</h3>
                            <button onClick={ () => { handleReset(bayItem.id) } }>reset</button>
                        </section>
                    </div>
                    :
                    <div>
                        <section className="grid--bayItem" key={`bayItem--${bayItem.id}`}>
                            <img className="bayItem--photo"src={bayItem.default_img} alt={`Image of ${bayItem.name}`}/>
                            <h3 className="bayItem--name">{bayItem.name}</h3>
                            <button onClick={ () => { handleFind(bayItem.id) } }>Found it!</button>
                        </section>
                    </div> } </>
                    }
                    )
            }
        </article>
        </div>
    </>

}