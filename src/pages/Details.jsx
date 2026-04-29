import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Details() {
  const navigate = useNavigate();
  const selectedCity = localStorage.getItem("selectedCity");
  const [tripDays, setTripDays] = useState("1");

  // ❌ No city selected
  if (!selectedCity) {
    return (
      <div className="trip-details no-city">
        <h2>Please select a city first</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  // ✅ COMMON BOOKING FUNCTION (FIXED)
  const handleBooking = (place, adultPrice, childPrice) => {
  localStorage.setItem("destination", place);
  localStorage.setItem("tripDays", tripDays);
  localStorage.setItem("adultPrice", adultPrice);
  localStorage.setItem("childPrice", childPrice);

  navigate("/booking");
};

// ✅ SAVE TO WISHLIST FUNCTION
const saveToWishlist = (place, price, childPrice) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  const stored = JSON.parse(localStorage.getItem("wishlist")) || [];

  const newItem = {
    id: Date.now(), // unique id
    destination: place,
    price: price,
    childPrice: childPrice,
    email: user.email, // important for filtering
  };

  stored.push(newItem);

  localStorage.setItem("wishlist", JSON.stringify(stored));

  alert("Added to Wishlist ❤️");
};

  return (
    <section className="trip-details">
      <h2>Trip Details for {selectedCity} - By BUS</h2>

      {/* Trip Options */}
      <div className="trip-options">
        <label>
          <input
            type="radio"
            value="1"
            checked={tripDays === "1"}
            onChange={() => setTripDays("1")}
          />
          1 Day Trip
        </label>

        <label>
          <input
            type="radio"
            value="2"
            checked={tripDays === "2"}
            onChange={() => setTripDays("2")}
          />
          2 Days Trip
        </label>

        <label>
          <input
            type="radio"
            value="3"
            checked={tripDays === "3"}
            onChange={() => setTripDays("3")}
          />
          3 Days Trip
        </label>
      </div>

      <div className="itinerary">
        <h4>It follows:</h4>

        {/* ================= BANGALORE ================= */}
        {selectedCity === "Bangalore" && tripDays === "1" && (
          <>
            <div className="trip-plan">
              <h2>🌞 1-Day Trip Plan <strong>From:</strong> Bangalore → <strong>To:</strong> Mysore (5 AM to 10 PM)</h2>
               <div className="sub-plan">
              <ul>
                <li>🕔 <strong>5:00 AM:</strong> Departure from Majestic, Bangalore - A/C bus or tempo traveler</li>
                    <li>☕ <strong>7:30 AM:</strong> Breakfast at Adyar Anand Bhavan (Mandya)</li>
                    <li>🏰 <strong>9:00 AM:</strong> Mysore Palace - Guided tour & photos</li>
                    <li>🌺 <strong>11:00 AM:</strong> Brindavan Gardens - Floral gardens & boating</li>
                    <li>🍛 <strong>1:00 PM:</strong> Lunch at RRR/Dasaprakash (local cuisine)</li>
                    <li>🐒 <strong>2:30 PM:</strong> Chamundi Hills - Temple + city view</li>
                    <li>🎨 <strong>4:00 PM:</strong> Optional: Zoo or Art Gallery</li>
                    <li>🛍️ <strong>5:30 PM:</strong> Devaraja Market - Shopping & sweets</li>
                    <li>🍴 <strong>7:00 PM:</strong> Dinner at Kamat Lokaruchi or Mandya</li>
                    <li>🚐 <strong>10:00 PM:</strong> Return to Bangalore & drop-off</li>
              </ul>
                     <p className="price">💰 Price: ₹999 per person</p>
                     <p className="price">💰 Child: ₹899 per person(below 5years)</p>
                     <p>✅ Includes: Travel, Breakfast, Trek Guide, Entry Fee</p>
              <button
  type="button"
  onClick={() => handleBooking("Mysore", 999, 899)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Mysore", 999, 899)}
>
  ❤️ Save for Later
</button>
                     </div>
                     </div>

                          <div className="trip-plan">
      <h2>⛰️ 1-Day Adventure Trip <strong>From:</strong> Bangalore → <strong>To:</strong> Savandurga Hill (5:30 AM to 10 PM)</h2>
      <div className="sub-plan">
        <ul>
          <li>🕕 <strong>5:30 AM:</strong> Departure from Bangalore (Majestic/Shantinagar)</li>
          <li>☕ <strong>7:00 AM:</strong> Breakfast en route (Magadi Road)</li>
          <li>🥾 <strong>8:00 AM:</strong> Trek starts – moderate climb with guide</li>
          <li>📸 <strong>11:00 AM:</strong> Reach summit – photos, rest</li>
          <li>⬇️ <strong>11:30 AM:</strong> Descent begins</li>
          <li>🍛 <strong>1:30 PM:</strong> Lunch at a local restaurant</li>
          <li>🛕 <strong>2:30 PM:</strong> Optional: Visit to temple at base</li>
          <li>🛍️ <strong>4:00 PM:</strong> Local snack stop on return</li>
          <li>🚐 <strong>6:00 PM:</strong> Return to Bangalore</li>
        </ul>
        <p className="price">💰 Price: ₹899 per person</p>
        <p className="price">💰 Child: ₹699 per person (below 5 years)</p>
        <p>✅ Includes: Travel, Breakfast, Trek Guide, Entry Fee</p>
        <button
  type="button"
  onClick={() => handleBooking("Savandurga Hill", 899, 699)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Savandurga Hill", 899, 699)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>
  </>
        )}

        {selectedCity === "Bangalore" && tripDays === "2" && (
          <>
            <div className="trip-plan">
              <h2>🏞️ 2-Day Trip From Bangalore → Coorg</h2>
              <div className="sub-plan">
               <ul>
        <li>🕗 <strong>Day 1 - 6:00 AM:</strong> Departure from Bangalore</li>
        <li>🏞️ <strong>11:00 AM:</strong> Visit Abbey Falls</li>
        <li>🌿 <strong>1:00 PM:</strong> Lunch at Coorg Cuisine</li>
        <li>🕍 <strong>3:00 PM:</strong> Visit Madikeri Fort</li>
        <li>🏡 <strong>6:00 PM:</strong> Check-in to Homestay + Campfire</li>
        <li>🍽️ <strong>8:00 PM:</strong> Dinner at homestay</li>
        <li>🌅 <strong>Day 2 - 7:00 AM:</strong> Breakfast + Talacauvery Temple visit</li>
        <li>🛍️ <strong>10:00 AM:</strong> Local market shopping</li>
        <li>🍛 <strong>1:00 PM:</strong> Lunch & depart to Bangalore</li>
        <li>🏠 <strong>7:00 PM:</strong> Reach Bangalore</li>
      </ul>
      <p className="price">💰 Price: ₹2499 per person</p>
      <p className="price">💰 Child: ₹1899 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Entry Fees</p>
     <button
  type="button"
  onClick={() => handleBooking("Coorg", 2499, 1899)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Coorg", 2499, 1899)}
>
  ❤️ Save for Later
</button>
    </div>
  </div>

            <div className="trip-plan">
            <h2>🌄 2-Day Trip From Bangalore → Chikmagalur</h2>
      <div className="sub-plan">
        <ul>
          <li>🕗 <strong>Day 1 - 6:00 AM:</strong> Departure from Bangalore</li>
          <li>🌿 <strong>11:00 AM:</strong> Coffee estate walk with local guide</li>
          <li>🍛 <strong>1:00 PM:</strong> Lunch at local Malnad restaurant</li>
          <li>🏞️ <strong>3:00 PM:</strong> Mullayanagiri Peak visit</li>
          <li>🏕️ <strong>7:00 PM:</strong> Bonfire & Dinner at resort</li>
          <li>🛏️ <strong>Night:</strong> Overnight stay at plantation resort</li>
          <li>🌅 <strong>Day 2 - 6:30 AM:</strong> Sunrise trek + breakfast</li>
          <li>💦 <strong>10:00 AM:</strong> Visit Hebbe Falls</li>
          <li>🛍️ <strong>1:00 PM:</strong> Lunch & coffee shopping</li>
          <li>🚐 <strong>2:30 PM:</strong> Return journey to Bangalore</li>
          <li>🏠 <strong>9:00 PM:</strong> Arrival at Bangalore</li>
        </ul>
        <p className="price">💰 Price: ₹2599 per person</p>
        <p className="price">💰 Child: ₹1999 per person (below 5 years)</p>
        <p>✅ Includes: Travel, Accommodation, Meals, Entry Fees, Trek Guide</p>
              <button
  type="button"
  onClick={() => handleBooking("Chikmagalur", 2599, 1999)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Chikmagalur", 2599, 1999)}
>
  ❤️ Save for Later
</button>
            </div>
            </div>
          </>
        )}

        {selectedCity === "Bangalore" && tripDays === "3" && (
          <>
            <div className="trip-plan">
              <h2>🏖️ 3-Day Trip From Bangalore → Gokarna</h2>
    <div className="sub-plan">
      <ul>
        <li>🕘 <strong>Day 1 - 9:00 PM:</strong> Overnight journey from Bangalore</li>
        <li>🌅 <strong>Day 2 - 6:00 AM:</strong> Arrival at Gokarna + Hotel Check-in</li>
        <li>🏝️ <strong>9:00 AM:</strong> Beach Hopping: Om Beach, Kudle Beach</li>
        <li>🍛 <strong>1:00 PM:</strong> Lunch at Namaste Cafe</li>
        <li>🛕 <strong>4:00 PM:</strong> Visit Mahabaleshwar Temple</li>
        <li>🔥 <strong>7:00 PM:</strong> Bonfire & Dinner at beach resort</li>
        <li>🌅 <strong>Day 3 - 7:00 AM:</strong> Sunrise trek + breakfast</li>
        <li>🛍️ <strong>11:00 AM:</strong> Shopping at local markets</li>
        <li>🚌 <strong>2:00 PM:</strong> Return journey to Bangalore</li>
        <li>🏠 <strong>9:00 PM:</strong> Reach Bangalore</li>
      </ul>
      <p className="price">💰 Price: ₹3499 per person</p>
      <p className="price">💰 Child: ₹2599 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>
              <button
  type="button"
  onClick={() => handleBooking("Gokarna", 3499, 2599)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Gokarna", 3499, 2599)}
>
  ❤️ Save for Later
</button>
            </div>
            </div>

            <div className="trip-plan">
              <h2>🍃 3-Day Trip From Bangalore → Ooty & Coonoor</h2>
      <div className="sub-plan">
        <ul>
          <li>🌃 <strong>Day 1 - 10:00 PM:</strong> Night departure from Bangalore</li>
          <li>🌄 <strong>Day 2 - 6:00 AM:</strong> Reach Ooty + Check-in</li>
          <li>🏞️ <strong>9:00 AM:</strong> Visit Ooty Lake, Botanical Garden</li>
          <li>🧺 <strong>1:00 PM:</strong> Lunch + Relax at hotel</li>
          <li>🚞 <strong>4:00 PM:</strong> Nilgiri Mountain Railway ride</li>
          <li>🏨 <strong>7:00 PM:</strong> Dinner + overnight stay</li>
          <li>🌄 <strong>Day 3 - 7:00 AM:</strong> Breakfast + leave for Coonoor</li>
          <li>🌸 <strong>10:00 AM:</strong> Sims Park, Dolphin Nose</li>
          <li>🛍️ <strong>12:30 PM:</strong> Local tea shop & lunch</li>
          <li>🚐 <strong>2:30 PM:</strong> Return to Bangalore</li>
          <li>🌙 <strong>9:30 PM:</strong> Reach Bangalore</li>
        </ul>
        <p className="price">💰 Price: ₹3699 per person</p>
        <p className="price">💰 Child: ₹2899 per person (below 5 years)</p>
        <p>✅ Includes: Travel, Hotel, Meals, Toy Train, Entry Fees</p>
             <button
  type="button"
  onClick={() => handleBooking("Ooty & Coonoor", 3699, 2899)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Ooty & Coonoor", 3699, 2899)}
>
  ❤️ Save for Later
</button>
      </div>
            </div>
          </>
        )}

        {/* ================= CHENNAI ================= */}
        {selectedCity === "Chennai" && tripDays === "1" && (
          <>
{/* Mahabalipuram One-Day Trip */}
             <div className="trip-plan">
      <h2>🗿 1-Day Trip From Chennai → Mahabalipuram</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>7:00 AM:</strong> Depart from Chennai</li>
          <li>🛕 <strong>9:00 AM:</strong> Visit Shore Temple & Arjuna’s Penance</li>
          <li>🧗 <strong>11:00 AM:</strong> Krishna’s Butter Ball</li>
          <li>🍽️ <strong>1:00 PM:</strong> Lunch at Moonrakers</li>
          <li>🌊 <strong>3:00 PM:</strong> Relax on the beach</li>
          <li>🏠 <strong>6:00 PM:</strong> Return to Chennai</li>
        </ul>
           <p className="price">💰 Price: ₹3699 per person</p>
      <p className="price">💰 Child: ₹2899 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>
        <button
  type="button"
  onClick={() => handleBooking("Mahabalipuram", 1199, 899)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Mahabalipuram", 1199, 899)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>

  {/* Vedanthangal Bird Sanctuary */}
            <div className="trip-plan">
              <h2>🦜 1-Day Trip From Chennai → Vedanthangal Bird Sanctuary</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>6:00 AM:</strong> Depart from Chennai</li>
          <li>🦢 <strong>8:00 AM:</strong> Explore Bird Sanctuary (best for bird lovers)</li>
          <li>🍽️ <strong>12:00 PM:</strong> Lunch at local restaurant</li>
          <li>🏞️ <strong>2:00 PM:</strong> Scenic walk + local temples nearby</li>
          <li>🏠 <strong>6:00 PM:</strong> Return to Chennai</li>
        </ul>
   <p className="price">💰 Price: ₹999 per person</p>
      <p className="price">💰 Child: ₹749 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>       <button
  type="button"
  onClick={() => handleBooking("Vedanthangal Bird Sanctuary", 999, 749)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Vedanthangal Bird Sanctuary", 999, 749)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>
  </>
)}


        {selectedCity === "Chennai" && tripDays === "2" && (
          <>
          {/*Pondicherry Weekend Trip*/}
            <div className="trip-plan">
              <h2>🏞️ 2-Day Trip From chennai → Pondicherry</h2>
              <div className="sub-plan">
               <ul>
        <li>🕗 <strong>Day 1 - 7:00 AM:</strong> Depart from Chennai</li>
        <li>🏖️ <strong>10:00 AM:</strong> Promenade Beach & French Colony walk</li>
          <li>🧘 <strong>1:00 PM:</strong> Visit Aurobindo Ashram & Auroville</li>
          <li>🍛 <strong>4:00 PM:</strong> Local café dinner and stay overnight</li>
          <li>🌄 <strong>Day 2 - 8:00 AM:</strong> Paradise Beach + boating</li>
          <li>🛍️ <strong>12:00 PM:</strong> Local shopping & lunch</li>
          <li>🏠 <strong>5:00 PM:</strong> Return to Chennai</li>
        </ul>
   <p className="price">💰 Price: ₹1999 per person</p>
      <p className="price">💰 Child: ₹1399 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>        <button
  type="button"
  onClick={() => handleBooking("Pondicherry", 1999, 1399)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Pondicherry", 1999, 1399)}
>
  ❤️ Save for Later
</button>
    </div>
  </div>

{/*Yelagiri Hills Escape */}
      <div className="trip-plan">
      <h2>⛰️ 2-Day Trip From Chennai → Yelagiri Hills</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>Day 1 - 6:00 AM:</strong> Depart from Chennai</li>
          <li>🌄 <strong>10:00 AM:</strong> Reach Yelagiri, visit Nature Park</li>
          <li>🛶 <strong>1:00 PM:</strong> Boating at Punganoor Lake</li>
          <li>🧗 <strong>4:00 PM:</strong> Trekking or Zipline Adventure</li>
          <li>🔥 <strong>7:00 PM:</strong> Campfire and local dinner</li>
          <li>🌤️ <strong>Day 2 - 8:00 AM:</strong> Jalagamparai Waterfalls + breakfast</li>
          <li>🍛 <strong>1:00 PM:</strong> Lunch and checkout</li>
          <li>🏠 <strong>6:00 PM:</strong> Return to Chennai</li>
        </ul>
   <p className="price">💰 Price: ₹2199 per person</p>
      <p className="price">💰 Child: ₹1499 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>        <button
  type="button"
  onClick={() => handleBooking("Yelagiri Hills", 2199, 1499)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Yelagiri Hills", 2199, 1499)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>
  </>
)}

        {selectedCity === "Chennai" && tripDays === "3" && (
          <>
         {/* Kodaikanal Trip */}
            <div className="trip-plan">
              <h2>🏞️ 2-Day Trip From chennai → Kodaikanal</h2>
              <div className="sub-plan">
               <ul>
          <li>🌃 <strong>Day 1 - 9:00 PM:</strong> Overnight journey from Chennai</li>
          <li>🌄 <strong>Day 2 - 7:00 AM:</strong> Check-in at Kodai hotel</li>
          <li>🌲 <strong>10:00 AM:</strong> Coaker’s Walk, Bryant Park</li>
          <li>🧺 <strong>1:00 PM:</strong> Picnic lunch by Kodai Lake</li>
          <li>🚣 <strong>4:00 PM:</strong> Boating + Shopping</li>
          <li>🏨 <strong>7:00 PM:</strong> Dinner & Stay</li>
          <li>🌄 <strong>Day 3 - 8:00 AM:</strong> Pine Forest, Guna Caves</li>
          <li>🍽️ <strong>1:00 PM:</strong> Lunch + Return journey</li>
          <li>🌃 <strong>9:00 PM:</strong> Arrival in Chennai</li>
        </ul>
           <p className="price">💰 Price: ₹3499 per person</p>
      <p className="price">💰 Child: ₹2699 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>
        <button
  type="button"
  onClick={() => handleBooking("Kodaikanal", 3499, 2699)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Kodaikanal", 3499, 2699)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>

{/* Yercaud Trip */}
    <div className="trip-plan">
      <h2>🌿 3-Day Trip From Chennai → Yercaud</h2>
      <div className="sub-plan">
        <ul>
          <li>🌃 <strong>Day 1 - 10:00 PM:</strong> Start from Chennai (overnight)</li>
          <li>🌄 <strong>Day 2 - 7:00 AM:</strong> Check-in at Hill Resort</li>
          <li>🗻 <strong>10:00 AM:</strong> Lady's Seat, Pagoda Point</li>
          <li>🍽️ <strong>1:00 PM:</strong> Lunch at hotel</li>
          <li>🚣 <strong>4:00 PM:</strong> Boating at Yercaud Lake</li>
          <li>🔥 <strong>7:00 PM:</strong> Campfire + Dinner</li>
          <li>🌅 <strong>Day 3 - 8:00 AM:</strong> Botanical Garden + breakfast</li>
          <li>🛍️ <strong>12:00 PM:</strong> Local shopping + return trip</li>
          <li>🏠 <strong>9:00 PM:</strong> Back to Chennai</li>
        </ul>
   <p className="price">💰 Price: ₹3299 per person</p>
      <p className="price">💰 Child: ₹2499 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>        <button
  type="button"
  onClick={() => handleBooking("Yercaud", 3299, 2499)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Yercaud", 3299, 2499)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>
  </>
)}
        {selectedCity === "Hyderabad" && tripDays === "1" && (
          <>
          {/* Ramoji Film City Trip */}
            <div className="trip-plan">
              <h2>🎬 1-Day Trip From Hyderabad → Ramoji Film City</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>8:00 AM:</strong> Depart from Hyderabad</li>
          <li>🏰 <strong>9:30 AM:</strong> Arrive at Ramoji Film City</li>
          <li>🎥 <strong>10:00 AM:</strong> Film set tour + adventure zone</li>
          <li>🍱 <strong>1:00 PM:</strong> Lunch at in-house restaurant</li>
          <li>🎢 <strong>2:30 PM:</strong> Live shows, eco zones, gardens</li>
          <li>📸 <strong>5:30 PM:</strong> Photo session + souvenirs</li>
          <li>🏠 <strong>7:00 PM:</strong> Return to Hyderabad</li>
        </ul>
   <p className="price">💰 Price: ₹1299 per person</p>
      <p className="price">💰 Child: ₹999 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>        <button
  type="button"
  onClick={() => handleBooking("Ramoji Film City", 1299, 999)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Ramoji Film City", 1299, 999)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>


    {/* Ananthagiri Hills Trip */}
            <div className="trip-plan">
              <h2>🌄 1-Day Trip From Hyderabad → Ananthagiri Hills</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>6:00 AM:</strong> Depart from Hyderabad</li>
          <li>🌳 <strong>8:00 AM:</strong> Reach Ananthagiri for nature walk</li>
          <li>🧘 <strong>10:00 AM:</strong> Temple visit + meditation spot</li>
          <li>🍛 <strong>1:00 PM:</strong> Local lunch at forest cottage</li>
          <li>🚣 <strong>3:00 PM:</strong> Lake viewpoint + optional boating</li>
          <li>🏠 <strong>6:30 PM:</strong> Return to Hyderabad</li>
        </ul>
   <p className="price">💰 Price: ₹1199 per person</p>
      <p className="price">💰 Child: ₹899 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>        <button
  type="button"
  onClick={() => handleBooking("Ananthagiri Hills", 1199, 899)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Ananthagiri Hills", 1199, 899)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>
          </>
        )}

       {selectedCity === "Hyderabad" && tripDays === "2" && (
          <>
           {/* Srisailam Trip */}
            <div className="trip-plan">
                <h2>🛕 2-Day Trip From Hyderabad → Srisailam</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>Day 1 - 6:00 AM:</strong> Depart from Hyderabad</li>
          <li>🌉 <strong>9:00 AM:</strong> Stop at Srisailam Dam Viewpoint</li>
          <li>🛕 <strong>11:00 AM:</strong> Mallikarjuna Temple Darshan</li>
          <li>🍽️ <strong>1:00 PM:</strong> Lunch at local Andhra restaurant</li>
          <li>🌄 <strong>4:00 PM:</strong> Ropeway ride to Pathala Ganga</li>
          <li>🔥 <strong>7:00 PM:</strong> Check-in, dinner & campfire stay</li>
          <li>🌄 <strong>Day 2 - 7:00 AM:</strong> Tiger Reserve Safari</li>
          <li>🍽️ <strong>12:00 PM:</strong> Lunch & return journey</li>
          <li>🏠 <strong>6:00 PM:</strong> Arrival at Hyderabad</li>
        </ul>
   <p className="price">💰 Price: ₹2299 per person</p>
      <p className="price">💰 Child: ₹1699 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>        <button
  type="button"
  onClick={() => handleBooking("Srisailam", 2299, 1699)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Srisailam", 2299, 1699)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>

    {/* Nagarjuna Sagar Trip */}
            <div className="trip-plan">
              <h2>🏞️ 2-Day Trip From Hyderabad → Nagarjuna Sagar</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>Day 1 - 7:00 AM:</strong> Depart from Hyderabad</li>
          <li>🌊 <strong>10:30 AM:</strong> Visit Nagarjuna Sagar Dam</li>
          <li>🪨 <strong>1:00 PM:</strong> Lunch & Ethipothala Falls visit</li>
          <li>🏨 <strong>4:00 PM:</strong> Check-in at lake resort</li>
          <li>🌅 <strong>6:00 PM:</strong> Sunset view + dinner</li>
          <li>🌄 <strong>Day 2 - 8:00 AM:</strong> Nagarjunakonda Island museum trip</li>
          <li>🍛 <strong>1:00 PM:</strong> Lunch & check-out</li>
          <li>🏠 <strong>5:00 PM:</strong> Return to Hyderabad</li>
        </ul>
   <p className="price">💰 Price: ₹2199 per person</p>
      <p className="price">💰 Child: ₹1599 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>        <button
  type="button"
  onClick={() => handleBooking("Nagarjuna Sagar", 2199, 1599)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Nagarjuna Sagar", 2199, 1599)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>
  </>
)}

{selectedCity === "Hyderabad" && tripDays === "3" && (
          <>
           {/* Hyderabad to Hampi */}
            <div className="trip-plan">
               <h2>🏛️ 3-Day Trip From Hyderabad → Hampi</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>Day 1 - 6:00 AM:</strong> Depart from Hyderabad</li>
          <li>🏨 <strong>1:00 PM:</strong> Check-in at Hampi hotel + lunch</li>
          <li>🏯 <strong>3:00 PM:</strong> Visit Virupaksha Temple & Hampi Bazaar</li>
          <li>🌇 <strong>6:30 PM:</strong> Sunset at Hemakuta Hill</li>

          <li>🕌 <strong>Day 2 - 8:00 AM:</strong> Royal Enclosure, Elephant Stables, Lotus Mahal</li>
          <li>🌄 <strong>1:00 PM:</strong> Lunch + Tungabhadra River boating</li>
          <li>🧭 <strong>4:00 PM:</strong> Vittala Temple & Stone Chariot</li>
          <li>🔥 <strong>8:00 PM:</strong> Cultural evening + dinner</li>

          <li>🌅 <strong>Day 3 - 9:00 AM:</strong> Breakfast + relax</li>
          <li>🛍️ <strong>11:00 AM:</strong> Local shopping & return journey</li>
          <li>🏠 <strong>7:00 PM:</strong> Reach Hyderabad</li>
        </ul>
          <p className="price">💰 Price: ₹3699 per person</p>
      <p className="price">💰 Child: ₹2499 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>
        <button
  type="button"
  onClick={() => handleBooking("Hampi", 3699, 2499)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Hampi", 3699, 2499)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>


    {/* Hyderabad to Araku Valley & Vizag */}
            <div className="trip-plan">
              <h2>🚞 3-Day Trip From Hyderabad → Araku Valley & Vizag</h2>
      <div className="sub-plan">
        <ul>
          <li>🚆 <strong>Day 1 - 6:00 AM:</strong> Train from Hyderabad to Vizag</li>
          <li>🌊 <strong>2:00 PM:</strong> RK Beach, Submarine Museum, evening at Rushikonda</li>
          <li>🏨 <strong>8:00 PM:</strong> Hotel check-in + dinner</li>

          <li>🚞 <strong>Day 2 - 6:00 AM:</strong> Scenic train ride to Araku Valley</li>
          <li>🌿 <strong>10:00 AM:</strong> Coffee Museum + Tribal Museum</li>
          <li>🕳️ <strong>1:00 PM:</strong> Visit Borra Caves + Lunch</li>
          <li>🌇 <strong>6:00 PM:</strong> Return to Vizag</li>

          <li>🌄 <strong>Day 3 - 8:00 AM:</strong> Simhachalam Temple visit</li>
          <li>🛍️ <strong>11:00 AM:</strong> Shopping + lunch</li>
          <li>🚆 <strong>3:00 PM:</strong> Return train to Hyderabad</li>
        </ul>
          <p className="price">💰 Price: ₹3899 per person</p>
      <p className="price">💰 Child: ₹2799 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>
        <button
  type="button"
  onClick={() => handleBooking("Araku Valley & Vizag", 3899, 2799)}
>
  Book Now
</button>

<button
  type="button"
  onClick={() => saveToWishlist("Araku Valley & Vizag", 3899, 2799)}
>
  ❤️ Save for Later
</button>
      </div>
    </div>
  </>
)}
        
      </div>
    </section>
  );
}