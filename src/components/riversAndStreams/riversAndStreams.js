import { useEffect, useState } from "react"
import illustration from "./images/RiversAndStreams.png"
import deMap from "./images/De-Map.png"
import { Map } from "./Map"
import "./riversAndStreams.css" 
import { getRiverStream } from "../../managers/RiversStreamsManager"


export const RiversList = () => {
    const [rivers, setRivers] = useState([])

    const getAllWater = () => {
        getRiverStream().then(data => setRivers(data))
    }

    useEffect(() => {
        getAllWater()
    }, [])

    return <>
        <section className="water">
        <section className="rivers-page--header">
            <h1 className="rivers--title">Rivers and Streams</h1>
            <h4 className="rivers--subtitle">When you travel on Rt. 50 to Ocean City, you pass over all these rivers and streams that flow to the Chesapeake Bay. All have been marked with a sign. Check off the ones you find and locate where you are on the map on this page.</h4>
            <div className="picture"><img className="rivers--illustration" src={illustration}/></div>
        
        
        <article className="rivers-page--container">

            <div className="river--list">
                <label htmlFor="content" className="label">Name of River or Stream: </label>
                {
                    rivers.map(river => {

                        return <div key={`water--${river.id}`}>
                            <input type="checkbox" name={river.name}/>
                            <label htmlFor={river.name}>{river.id}. {river.name}</label>
                            </div>
                    })
                }</div>
            <div className="miles--list">
                <label htmlFor="content" className="label">To reach the Bay from this location a <br></br>fish would have to swim: </label>
                {
                    rivers.map(river => {

                        return <div key={`water--${river.id}`}>
                            <label htmlFor="miles">{river.miles_to_bay} miles</label>
                            </div>
                    })
            }</div>
        </article>
        </section>
        {/* <section className="map--container"><img className="map" src={deMap}/></section> */}
        <section className="leaflet-container"><Map/></section>
        </section>
    </>

}
