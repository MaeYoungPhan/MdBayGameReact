import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { addNewTrip } from "../../managers/RecordOfTripsManager"
import { getOccasions } from "../../managers/OccasionManager"

export const TripForm = () => {
    const navigate = useNavigate()
    const [occasions, setOccasions] = useState([])

    const [currentTrip, setCurrentTrip] = useState({
        date: "",
        name: "",
        occasion: 0,
        number_found: 0
    })

    useEffect(() => {
        getOccasions().then(data => setOccasions(data))
    }, [])

    const changeTripState = (domEvent) => {
        const copy = {...currentTrip}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentTrip(copy)
    }

    return (
        <section className="tripform--container">
        <form className="trip--form">
            <h2 className="tripform--title">Record a New Trip</h2>

                <div className="trip--field">
                    <label className="label" htmlFor="date">Date: </label>
                    <div className="control">
                    <input type="date" name="date" required autoFocus className="form--box"
                        value={currentTrip.date}
                        onChange={changeTripState}
                    />
                    </div>
                </div>


                <div className="trip--field">
                    <label className="label" htmlFor="name">Name: </label>
                    <div className="control">
                    <input type="text" name="name" required autoFocus className="form--box"
                        value={currentTrip.name}
                        onChange={changeTripState}
                    />
                    </div>
                </div>

                <div className="trip--field">
                    <label className="label" htmlFor="number_found">Number of Scavenger Hunt Items Found: </label>
                    <div className="control">
                    <input type="number" name="number_found" required autoFocus className="form--box" min="0" max="24"
                        defaultValue={currentTrip.number_found} 
                        onChange={(evt) => {const copy = {...currentTrip}
                        copy.number_found = parseInt(evt.target.value)
                        setCurrentTrip(copy)}}
                    />
                    </div>
                </div>

                <div className="trip--field">
                <div className="control">
                <label className="label" htmlFor="occasion">Occasion:</label>
                </div>
                    <select required autoFocus className="occasionList" value={currentTrip.occasion} onChange={(evt) => {const copy = {...currentTrip}
                    copy.occasion = parseInt(evt.target.value)
                    setCurrentTrip(copy)}}
                    ><option name="occasion" className="gameType">Select Occasion</option>
                        {occasions.map(occasion => {
                                return <option
                                    name="occasion"
                                    className="form--box"
                                    value={occasion.id}
                                    key={`occasion--${occasion.id}`}
                                >{occasion.emoji} {occasion.name}</option>
                            }
                            )
                        }
                    </select>
                </div>
                <div className="control">
            <button className="button create-trip" type="submit"
                onClick={evt => {

                    evt.preventDefault()

                    const trip = {
                        date: currentTrip.date,
                        name: currentTrip.name,
                        number_found: currentTrip.number_found,
                        occasion: parseInt(currentTrip.occasion)
                    }

                    addNewTrip(trip)
                        .then(() => navigate("/bayitems"))
                }}
                >Create Trip</button>
                </div>
        </form>
    </section>
    )
}