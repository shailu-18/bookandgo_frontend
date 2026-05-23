import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function MyBookings() {

const [bookings,setBookings]=
useState([]);

useEffect(()=>{

fetchBookings();

},[]);

const fetchBookings=async()=>{

try{

const res=await axios.get(
"https://bookandgo-backend.onrender.com/api/bookings"
);

setBookings(
res.data
);

}
catch(err){

console.log(
"Fetch Error:",
err
);

}

};

// Delete booking
const deleteBooking=
async(id)=>{

try{

await axios.delete(
`https://bookandgo-backend.onrender.com/api/bookings/${id}`
);

fetchBookings();

}
catch(err){

console.log(
"Delete Error:",
err
);

}

};

// Download PDF
const downloadPDF=
(booking)=>{

const doc=
new jsPDF();

doc.setFontSize(16);

doc.text(
"Travel Booking Ticket",
20,
20
);

doc.setFontSize(12);

doc.text(
`Booking ID: ${booking.bookingId || "N/A"}`,
20,
40
);

doc.text(
`Name: ${booking.name}`,
20,
50
);

doc.text(
`Email: ${booking.email}`,
20,
60
);

doc.text(
`Destination: ${booking.destination}`,
20,
70
);

doc.text(
`Date: ${booking.date}`,
20,
80
);

doc.text(
`Adults: ${booking.adults}`,
20,
90
);

doc.text(
`Children: ${booking.children}`,
20,
100
);

doc.text(
`Total Price: ₹${booking.totalPrice}`,
20,
110
);

doc.save(
"Booking.pdf"
);

};

return(

<div className="booking-list">

<h2>
My Bookings
</h2>

{bookings.length===0 ? (

<p>
No bookings found
</p>

):(

bookings.map((b)=>(

<div
className="booking-item"
key={b._id}
>

<h3>
{b.destination}
</h3>

<p>
<strong>Booking ID:</strong>
{b.bookingId || "N/A"}
</p>

<p>
<strong>Name:</strong>
{b.name}
</p>

<p>
<strong>Email:</strong>
{b.email}
</p>

<p>
<strong>Date:</strong>
{b.date}
</p>

<p>
<strong>Adults:</strong>
{b.adults}
</p>

<p>
<strong>Children:</strong>
{b.children}
</p>

<p>
<strong>Total:</strong>
₹{b.totalPrice}
</p>

<div
style={{
marginTop:"10px"
}}
>

<button
onClick={()=>
downloadPDF(b)
}
>
Download PDF
</button>

<button
onClick={()=>
deleteBooking(
b._id
)
}
style={{
marginLeft:"10px",
background:"red",
color:"white"
}}
>
Delete
</button>

</div>

</div>

))

)}

</div>

);

}