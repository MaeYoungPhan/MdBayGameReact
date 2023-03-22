import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { HowToPlay } from "../components/howToPlay/howToPlay"
import { BayItemsList } from "../components/bayItems/bayList"
import { TripForm } from "../components/recordOfTrips/addTrip"
import { RiversList } from "../components/riversAndStreams/riversAndStreams"


// responsible for routing users to specific views depending on URL paths
export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        {/* creating path for login & register */}
        {/* passing setToken prop from Rare.js to Login & Register  */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/">
        <Route path="/howtoplay" element={<HowToPlay setToken={setToken} />} />
        <Route path="/bayitems" element={<BayItemsList setToken={setToken} />} />
        <Route path="/riversandstreams" element={<RiversList setToken={setToken} />} />
        <Route path="/recordoftrips">
        <Route path="/recordoftrips/new" element={<TripForm token={token} />} />
        </Route>
        </Route>
      </Routes>
    </>
  )
}