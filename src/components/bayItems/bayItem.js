import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./bayitems.css"


export const BayItem = ({ bayItem }) => {    

    return <>
        <div>
            <section className="bayItem" key={`bayItem--${bayItem.id}`}>
                <img className="bayItem--photo"src={bayItem.defaultimg} alt={`Image of ${bayItem.name}`}/>
                <div className="bayItem--name"><h5>{bayItem.name}</h5></div>
            </section>
        </div>
        </>
}