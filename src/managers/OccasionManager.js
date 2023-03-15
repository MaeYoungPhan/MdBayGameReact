export const getOccasions = () => {
    return fetch("http://localhost:8000/occasions", {
      headers: {
        Authorization: `Token ${localStorage.getItem("gamer_token")}`
      }
    })
        .then(res => res.json())
  }