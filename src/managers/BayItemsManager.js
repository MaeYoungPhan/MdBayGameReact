export const getBayItems = () => {
    return fetch("http://localhost:8000/bayitems", {
        headers: {
        Authorization: `Token ${localStorage.getItem("gamer_token")}`
        }
    })
        .then(res => res.json())
    }

export const getSingleBayItem = (id) => {
    return fetch(`http://localhost:8000/bayitems/${id}`, 
    {
        headers: {
        "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        }
    }).then((res) => res.json())
    }

export const findItem = (itemId) => {
    return fetch(`http://localhost:8000/bayitems/${itemId}/find`, {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("gamer_token")}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(itemId)
    })
        .then(res => res.json())
    
}

export const resetItem = (itemId) => {
    return fetch(`http://localhost:8000/bayitems/${itemId}/reset`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gamer_token")}`,
        }
    })
}