import { useEffect,useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function MyBookings(){

const [bookings,setBookings]=
useState([]);

useEffect(()=>{

fetchBookings();

},[]);

const fetchBookings=
async()=>{

try{

const user=
JSON.parse(
localStorage.getItem(
"user"
)
);

const res=
await axios.get(

`https://bookandgo-backend.onrender.com/api/bookings?email=${user.email}`

);

setBookings(
res.data
);

}
catch(err){

console.log(err);

}

};

const deleteBooking=
async(id)=>{

try{

await axios.delete(

`https://bookandgo-backend.onrender.com/api/bookings/${id}`

);

fetchBookings();

}
catch(err){

console.log(err);

}

};

const downloadPDF=
(booking)=>{

const doc=
new jsPDF();

doc.text(
"Travel Booking Ticket",
20,
20
);

doc.text(
`Booking ID:${booking.bookingId}`,
20,
40
);

doc.text(
`Name:${booking.name}`,
20,
50
);

doc.text(
`Destination:${booking.destination}`,
20,
60
);

doc.text(
`Date:${booking.date}`,
20,
70
);

doc.text(
`Total:₹${booking.totalPrice}`,
20,
80
);

doc.save(
"Booking.pdf"
);

};

return(

<div>

<h2>
My Bookings
</h2>

{bookings.length===0?

<p>
No bookings found
</p>

:

bookings.map((b)=>(

<div
key={b._id}
className=
"booking-item"
>

<h3>
{b.destination}
</h3>

<p>
Booking ID:
{b.bookingId}
</p>

<p>
Date:
{b.date}
</p>

<p>
Total:
₹{b.totalPrice}
</p>

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
>

Delete

</button>

</div>

))

}

</div>

);

}