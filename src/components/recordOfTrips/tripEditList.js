import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getTrips, deleteTrip, editTrip, getSingleTrip } from "../../managers/RecordOfTripsManager"
import { getOccasions } from "../../managers/OccasionManager"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"
import { AiOutlinePlusSquare, AiFillSave } from "react-icons/ai";
import { TiCancel } from "react-icons/ti";
import { Table } from 'react-bootstrap';

export const TripEditList = (props) => {
    const [ trips, setTrips ] = useState([])
    const [occasions, setOccasions] = useState([])
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    })
    const [currentTrip, setCurrentTrip] = useState({
        date: "",
        name: "",
        number_found: 0,
        occasion: {},
        occasionId: 0
    })

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

    const changeTripState = (domEvent) => {
        const copy = {...currentTrip}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentTrip(copy)
    }

    useEffect(() => {
        getOccasions().then(res => setOccasions(res))
    }, 
    [])

    const onEdit = (id) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        getSingleTrip(id).then(res => {
            // get response from server then set value of key occasionId to pk int of occasion object
            res.occasionId = res.occasion.id
            setCurrentTrip(res)
        })
    }

    const onSave = (id, updatedtrip) => {
        editTrip(id, updatedtrip)
            .then(json => {
                // reset inEditMode and trip state values
                onCancel();

                // fetch the updated data
                getAllTrips();
            })
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setCurrentTrip(null);
    }

    return (
        <>
            <article className="tripsList--container">        
            <p className="trips--addbtn"><AiOutlinePlusSquare className="trips--addbtn"
            onClick={() => {
                navigate({ pathname: "/recordoftrips/new" })
            }}
            />Add a Trip</p>
            <Table className="trip--table" striped bordered hover>
            <caption><b>Record of Trips</b></caption>
            <thead>
                <tr className="trip-columns">
                <th>Date</th>
                <th>Name</th>
                <th>Occasion</th>
                <th>Number Found</th>
                {
                    inEditMode.status ? (
                        <>
                        <th>Save</th>
                        <th>Cancel</th>
                        </>
                    ) : (
                        <>
                        <th>Edit</th>
                        <th>Delete</th>
                        </>
                    )
                }
                </tr>
            </thead>
            <tbody>
                {trips.map(trip => (
                <tr className="trip-item" key={trip.id}>
                    <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === trip.id ? (
                                        <input className="editform--box" type="date" name="date" defaultValue={currentTrip?.date}
                                            onChange={changeTripState}
                                        />
                                    ) : (
                                        trip.date
                                    )
                                }
                    </td>
                    <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === trip.id ? (
                                        <input className="editform--box" type="text" name="name" defaultValue={currentTrip?.name}
                                            onChange={changeTripState}
                                        />
                                    ) : (
                                        trip.name
                                    )
                                }
                    </td>
                    <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === trip.id ? (
                                        <select name="occasion" required className="edit--occasionList" 
                    // set current value to occasionId int. 
                    value={currentTrip?.occasionId} onChange={(evt) => {const copy = {...currentTrip}
                    copy.occasionId = parseInt(evt.target.value)
                    setCurrentTrip(copy)}}
                    >{occasions.map(occasion => {
                        return <option
                            name="occasion"
                            value={occasion.id}
                            key={`occasion--${occasion.id}`}
                        >{occasion.emoji} {occasion.name}</option>
                    }
                    )
                }
                    </select>
                                    ) : (
                                        trip.occasion.emoji
                                    )
                                }
                    </td>
                    <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === trip.id ? (
                                        <input className="editform--num" type="number" min="0" max="24" name="number_found" value={currentTrip?.number_found}
                                            onChange={changeTripState}
                                        />
                                    ) : (
                                        trip.number_found
                                    )
                                }
                    </td>
                    {
                        inEditMode.status && inEditMode.rowKey === trip.id ? (
                            <>
                                <td>
                                <AiFillSave className="icon"
                                    onClick={evt => {
                                        // Prevent form from being submitted
                                        evt.preventDefault()
                    
                                        const trip = {
                                            date: currentTrip.date,
                                            name: currentTrip.name,
                                            number_found: currentTrip.number_found,
                                            occasion: currentTrip.occasionId
                                        }
                    
                                        onSave(inEditMode.rowKey, trip)
                                    }}
                                />
                                </td>
                                <td>
                                <TiCancel className="icon"
                                    onClick={() => onCancel()}
                                />
                                </td>
                            </>
                        ) : (
                            <>
                        <td>
                        <BsFillPencilFill
                            onClick={() => onEdit(trip.id)}/>
                        </td>
                        <td>
                        <BsFillTrashFill
                                onClick={() => {
                                    handleDelete(trip.id)
                                    }}/>
                        </td>
                        </>
                    )
                    }
                </tr>
                ))}
            </tbody>
            </Table>
            </article>
        </>
    )
}