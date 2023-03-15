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
        <form className="tripForm">
            <h2 className="tripForm__title">Register New Trip</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentTrip.date}
                        onChange={changeTripState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentTrip.name}
                        onChange={changeTripState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_found">Number of Scavenger Hunt Items Found: </label>
                    <input type="text" name="number_found" required autoFocus className="form-control"
                        defaultValue={currentTrip.number_found}
                        onChange={(evt) => {const copy = {...currentTrip}
                        copy.number_found = parseInt(evt.target.value)
                        setCurrentTrip(copy)}}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="occasion">Occasion:</label>
                    <select required autoFocus className="occasionList" value={currentTrip.occasion} onChange={(evt) => {const copy = {...currentTrip}
                    copy.occasion = parseInt(evt.target.value)
                    setCurrentTrip(copy)}}
                    ><option name="occasion" className="gameType">Select Occasion</option>
                        {occasions.map(occasion => {
                                return <option
                                    name="occasion"
                                    className="form-control"
                                    value={occasion.id}
                                    key={`occasion--${occasion.id}`}
                                >{occasion.emoji} {occasion.name}</option>
                            }
                            )
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const trip = {
                        date: currentTrip.date,
                        name: currentTrip.name,
                        number_found: currentTrip.number_found,
                        occasion: parseInt(currentTrip.occasion)
                    }

                    // Send POST request to your API
                    addNewTrip(trip)
                        .then(() => navigate("/bayitems"))
                }}
                className="btn btn-primary">Create Trip</button>
        </form>
    )
}