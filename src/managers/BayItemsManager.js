export const getBayItems = () => {
    return fetch("http://localhost:8000/bayitems"), {
        headers: {
        Authorization: `Token ${localStorage.getItem("gamer_token")}`,
        },
    }
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