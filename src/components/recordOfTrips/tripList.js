import { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { getTrips, editTrip, deleteTrip } from "../../managers/RecordOfTripsManager"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"
import { AiOutlinePlusSquare } from "react-icons/ai";
import { Table, Button } from 'react-bootstrap';

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
            <article className="tripsList--container">        
            <p className="trips--addbtn"><AiOutlinePlusSquare className="trips--addbtn"
            onClick={() => {
                navigate({ pathname: "/recordoftrips/new" })
            }}
            />Add a Trip</p>
            {/* <h3 className="trip--header">Record of Trips</h3>
                {
                    trips.map(trip => {
                        return <section key={`trip--${trip.id}`} className="trip-item">
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
                } */}
            <Table striped bordered hover>
            <caption>Record of Trips</caption>
  <thead>
    <tr className="trip-columns">
      <th>Date</th>
      <th>Name</th>
      <th>Occasion</th>
      <th>Number Found</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {trips.map(trip => (
      <tr className="trip-item" key={trip.id}>
        <td>{trip.date}</td>
        <td>{trip.name}</td>
        <td>{trip.occasion.emoji}</td>
        <td>{trip.number_found}</td>
        <td>
        <BsFillPencilFill
                            onClick={() => {
                                navigate({ pathname: `/recordoftrips/edit/${trip.id}` })
                                }}/>
        </td>
        <td>
        <BsFillTrashFill
                            onClick={() => {
                                handleDelete(trip.id)
                                }}/>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
            </article>
        </>
    )
}