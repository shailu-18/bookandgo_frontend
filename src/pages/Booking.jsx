import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Booking() {
  const navigate = useNavigate();

  // Get data from Details page
  const destination = localStorage.getItem("destination");
  const tripDays = localStorage.getItem("tripDays");

  const ADULT_PRICE =
    Number(localStorage.getItem("adultPrice")) || 0;

  const CHILD_PRICE =
    Number(localStorage.getItem("childPrice")) || 0;

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    date: "",
    duration: tripDays || "1",
    adults: 0,
    children: 0,
    travellers: [],
  });

  // No destination
  if (!destination) {
    return (
      <div className="booking-form">
        <h2>No destination selected</h2>

        <button onClick={() => navigate("/details")}>
          Go To Trips
        </button>
      </div>
    );
  }

  // Traveller details
  const handleTravellerChange = (
    index,
    field,
    value
  ) => {
    const updated = [...form.travellers];

    if (!updated[index]) {
      updated[index] = {
        name: "",
        age: "",
        type: "adult",
      };
    }

    updated[index][field] = value;

    setForm({
      ...form,
      travellers: updated,
    });
  };

  // Adults & children
  const handlePeopleChange = (
    type,
    value
  ) => {
    const num = Math.max(
      0,
      Number(value)
    );

    const updated = {
      ...form,
      [type]: num,
    };

    const adultTravellers =
      Array.from(
        { length: updated.adults },
        () => ({
          name: "",
          age: "",
          type: "adult",
        })
      );

    const childTravellers =
      Array.from(
        { length: updated.children },
        () => ({
          name: "",
          age: "",
          type: "child",
        })
      );

    updated.travellers = [
      ...adultTravellers,
      ...childTravellers,
    ];

    setForm(updated);
  };

  // Total price
  const totalPrice =
    form.adults * ADULT_PRICE +
    form.children * CHILD_PRICE;

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.adults === 0 &&
      form.children === 0
    ) {
      alert(
        "Please add at least 1 traveller"
      );
      return;
    }

    // Validation
    for (let t of form.travellers) {
      const age = Number(t.age);

      if (!t.name || !t.age) {
        alert(
          "Please fill all traveller details"
        );
        return;
      }

      if (
        t.type === "adult" &&
        age < 5
      ) {
        alert(
          "Adult age must be 5 or above"
        );
        return;
      }

      if (
        t.type === "child" &&
        age >= 5
      ) {
        alert(
          "Child age must be below 5"
        );
        return;
      }
    }

    // Booking ID
    const bookingId =
      "BOOK" +
      Math.floor(
        100000 +
          Math.random() * 900000
      );

    const newBooking = {
      bookingId,
      name: form.name,
      email: form.email,
      contact: form.contact,
      date: form.date,
      destination,
      duration: form.duration,
      adults: form.adults,
      children: form.children,
      totalPrice,
    };

    try {
      await axios.post(
        "https://bookandgo-backend.onrender.com/api/bookings",
        newBooking
      );

      alert(
        "Booking Successful!"
      );

      navigate(
        "/confirmation",
        {
          state: newBooking,
        }
      );

    } catch (err) {
      console.log(err);

      alert(
        "Error saving booking"
      );
    }
  };

  return (
    <section className="booking-form">
      <h2>Booking Now</h2>

      <div className="booking-card">

        <p>
          Destination:
          <strong>
            {destination}
          </strong>
        </p>

        <p>
          Package:
          {form.duration} Day(s)
        </p>

        <p>
          Adult Price:
          ₹{ADULT_PRICE}

          | Child Price:
          ₹{CHILD_PRICE}
        </p>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e)=>
              setForm({
                ...form,
                name:e.target.value
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e)=>
              setForm({
                ...form,
                email:e.target.value
              })
            }
            required
          />

          <input
            type="tel"
            placeholder="Contact Number"
            value={form.contact}
            onChange={(e)=>
              setForm({
                ...form,
                contact:e.target.value
              })
            }
            required
          />

          <input
            type="date"
            value={form.date}
            onChange={(e)=>
              setForm({
                ...form,
                date:e.target.value
              })
            }
            required
          />

          <div>
            <input
              type="number"
              placeholder="Adults"
              min="0"
              value={form.adults}
              onChange={(e)=>
                handlePeopleChange(
                  "adults",
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Children"
              min="0"
              value={form.children}
              onChange={(e)=>
                handlePeopleChange(
                  "children",
                  e.target.value
                )
              }
            />
          </div>

          {form.travellers.length > 0 &&
            <h4>
              Traveller Details
            </h4>
          }

          {form.travellers.map(
            (t,i)=>(
            <div key={i}>

              <p>
                {t.type==="adult"
                  ? "Adult"
                  : "Child"}
                {" "}
                {i+1}
              </p>

              <input
                type="text"
                placeholder="Name"
                value={t.name}
                onChange={(e)=>
                  handleTravellerChange(
                    i,
                    "name",
                    e.target.value
                  )
                }
                required
              />

              <input
                type="number"
                placeholder="Age"
                value={t.age}
                onChange={(e)=>
                  handleTravellerChange(
                    i,
                    "age",
                    e.target.value
                  )
                }
                required
              />

            </div>
          ))}

          <h3>
            Total Price:
            ₹{totalPrice}
          </h3>

          <button type="submit">
            Confirm Booking
          </button>

        </form>

      </div>
    </section>
  );
}