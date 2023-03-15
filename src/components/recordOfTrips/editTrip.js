import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleTrip, editTrip } from "../../managers/RecordOfTripsManager"
import { getOccasions } from "../../managers/OccasionManager"

export const EditTripForm = () => {
    const navigate = useNavigate()
    const { tripId } = useParams()
    const [occasions, setOccasions] = useState([])


        const [currentTrip, setCurrentTrip] = useState({
        date: "",
        name: "",
        number_found: 0,
        occasion: {},
        occasionId: 0 // set new property to store pk integer from occasion object returned from database
    })

    useEffect(() => {
        getOccasions().then(res => setOccasions(res))
        getSingleTrip(tripId).then(res => {
            // get response from server then set value of key occasionId to pk int of game_type object
            res.occasionId = res.occasion.id
            setCurrentTrip(res)
        })
    }, 
    [tripId])

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
                <label className="label">Occassion:</label>
                    <select name="occasion" required className="form-control" 
                    // set current value to occasionId int. 
                    value={currentTrip.occasionId} onChange={(evt) => {const copy = {...currentTrip}
                    copy.occasionId = parseInt(evt.target.value)
                    setCurrentTrip(copy)}}
                    >{occasions.map(occasion => {
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
                        occasion: currentTrip.occasionId
                    }

                    // Send POST request to your API
                    editTrip(tripId, trip)
                        .then(() => navigate("/bayitems"))
                }}
                className="btn btn-primary">Save Changes</button>
        </form>
    )
}