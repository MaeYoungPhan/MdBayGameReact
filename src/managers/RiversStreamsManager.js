export const getRiverStream = () => {
    return fetch("http://localhost:8000/riverandstreams", {
        headers: {
        Authorization: `Token ${localStorage.getItem("gamer_token")}`,
        }
    })
        .then(res => res.json())
    }