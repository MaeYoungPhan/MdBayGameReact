export const getTrips = () => {
    return fetch("http://localhost:8000/recordoftrips", {
        headers: {
        Authorization: `Token ${localStorage.getItem("gamer_token")}`
        }
    })
        .then(res => res.json())
    }

export const getSingleTrip = (id) => {
    return fetch(`http://localhost:8000/recordoftrips/${id}`, 
    {
        headers: {
        "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        }
    }).then((res) => res.json())
    }

export const addNewTrip = (trip) => {
    return fetch("http://localhost:8000/recordoftrips", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("gamer_token")}`
    
        },
        body: JSON.stringify(trip),
    })
    }

export const editTrip = (id, tripBody) => {
    return fetch(`http://localhost:8000/recordoftrips/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        },
        body: JSON.stringify(tripBody),
    });
    };

export const deleteTrip = (id) => {
    return fetch(`http://localhost:8000/recordoftrips/${id}`, {
        method: "DELETE",
        headers: {
        "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        },
    })
    }
