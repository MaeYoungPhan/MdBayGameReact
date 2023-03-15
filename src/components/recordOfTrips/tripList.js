import { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { getTrips, editTrip, deleteTrip } from "../../managers/RecordOfTripsManager"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"
import { AiOutlinePlusSquare } from "react-icons/ai";

export const TripList = (props) => {
    const [ trips, setTrips ] = useState([])

    const navigate = useNavigate()

    const getAllTrips = () => {
        getTrips().then(data => setTrips(data))
    }

    useEffect(() => {
        getAllTrips()
    }, [])

    const handleDelete = (id) => {
        deleteTrip(id).then(() => {
            {getAllTrips()}
            }) 
    }

    return (
        <>
            <p>Add a Trip <AiOutlinePlusSquare className="trips--addbtn"
            onClick={() => {
                navigate({ pathname: "/recordoftrips/new" })
            }}
            /></p>
            <h3>Record of Trips</h3>
            <article className="tripsList--container">
                {
                    trips.map(trip => {
                        return <section key={`trip--${trip.id}`} className="trip">
                            <p className="trip--date">{trip.date}</p>
                            <p className="trip--name">{trip.name}</p>
                            <p className="trip--occasion">{trip.occasion.emoji}</p>
                            <p className="trip--number">{trip.number_found}</p>
                            <BsFillPencilFill
                            onClick={() => {
                                navigate({ pathname: `/recordoftrips/edit/${trip.id}` })
                                }}/>
                            <BsFillTrashFill
                            onClick={() => {
                                handleDelete(trip.id)
                                }}/>
                        </section>
                    })
                }
            </article>
        </>
    )
}