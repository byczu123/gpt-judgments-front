import Navbar from "../component/Navbar";
import "../style/main_page.css"

function RatePage() {

  return (
    <div className="default">
        <Navbar/>
        <div className="box">
            <div className="rating">
                <input type="radio" name="star" id="10"/><label htmlFor="10">10</label>
                <input type="radio" name="star" id="9"/><label htmlFor="9">9</label>
                <input type="radio" name="star" id="8"/><label htmlFor="8">8</label>
                <input type="radio" name="star" id="7"/><label htmlFor="7">7</label>
                <input type="radio" name="star" id="6"/><label htmlFor="6">6</label>
                <input type="radio" name="star" id="5"/><label htmlFor="5">5</label>
                <input type="radio" name="star" id="4"/><label htmlFor="4">4</label>
                <input type="radio" name="star" id="3"/><label htmlFor="3">3</label>
                <input type="radio" name="star" id="2"/><label htmlFor="2">2</label>
                <input type="radio" name="star" id="1"/><label htmlFor="1">1</label>
            </div>
        </div>
    </div>
  );
}

export default RatePage;
