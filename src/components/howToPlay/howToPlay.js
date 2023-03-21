import { Link } from "react-router-dom"
import olBlueLogo from "./images/olBlueLogo.png"
import "./howToPlay.css"


export const HowToPlay = () => {

				return <>
					<section className="welcome--container">
					<div className="coverPage">
					<div className="logo"><img className="olBlue" src={olBlueLogo}/></div>
					<h2 className="md--title">The Maryland</h2>
                    <h1 className="bay--title">Bay Game</h1>
					<p className="tagline">The Official Chesapeake Bay Activity App for Fun From the Bridge to the Beach</p>
					<p className="governor">Governor Wes Moore</p>
                    <h5 className="credit">Adapted from the original 1997 Maryland Bay Game by Maegan Phan.</h5>
                    </div>
					<div className="howToPlay">
					<h2 className="playHeader">How To Play the Maryland Bay Game:</h2>
                    <h4 className="playNote">Note: The game is designed to be played in the car as you ride to Ocean City via Rt. 50</h4>
					<p className="playRules">1. Start looking <b>NOW</b> for rivers and streams that you cross on the way to Ocean City. All have been marked with a sign. One activity challenges you to find all these rivers and streams.</p>
                    <p className="playRules">2. On the <Link className="link" to="/bayitems">Scavenger Hunt</Link> page, there are 24 Bay related things that you are challenged to find on your trip. When you spot an object, click the "Found it!" button. Try to find all of the Bay related items.</p>
                    <p className="playRules">3. When the trip is over, you can click the plus sign on the Scavenger Hunt Page to <Link className="link" to="/recordoftrips/new">Add a New Trip</Link>. You can record the date, name the trip, occasion, and how many bay related items you found. When a new trip is added, it will appear under your Record of Trips on the Scavenger Hunt Page!</p>
                    <p className="playRules">4. You can reset all Scavenger Hunt items by clicking the "reset" button so you can play again on your next road trip.</p>
                    </div>
					</section>
				</>

}