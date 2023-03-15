import { useEffect, useState } from "react"
import { BayItem } from "./BayItem"
import "./bayItems.css" 
import { getBayItems } from "../../managers/BayItemsManager"


export const BayItemsList = () => {
    const [bayItems, setBayItems] = useState([])

    useEffect(
        () => {
            getBayItems()
            .then( (bayItemsArray) => {
                setBayItems(bayItemsArray)
            }) 
        },
        []
    )

    return <>
        
        <div className="bayItems-page--container">

        <article className="bayItems">
            {
                bayItems.map(
                    (bayItem) => <BayItem bayItem={bayItem} />)
            }
        </article>
        </div>
    </>

}