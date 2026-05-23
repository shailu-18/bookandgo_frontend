import {useEffect,useState} from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function MyBookings(){

const[bookings,setBookings]=useState([]);

const API=
"https://bookandgo-backend.onrender.com/api/bookings";

useEffect(()=>{

fetchBookings();

},[]);

const fetchBookings=async()=>{

try{

const res=
await axios.get(API);

setBookings(
res.data
);

localStorage.setItem(
"bookings",
JSON.stringify(
res.data
)
);

}
catch(err){

console.log(err);

}

};

const downloadPDF=(booking)=>{

const doc=new jsPDF();

doc.text(
`Booking ID:${booking.bookingId}`,
20,
20
);

doc.text(
`Name:${booking.name}`,
20,
30
);

doc.text(
`Destination:${booking.destination}`,
20,
40
);

doc.text(
`Total:${booking.totalPrice}`,
20,
50
);

doc.save(
"Booking.pdf"
);

};

return(

<div>

<h2>My Bookings</h2>

{bookings.map((b)=>(

<div
key={b._id}
>

<p>{b.destination}</p>

<p>{b.name}</p>

<p>{b.date}</p>

<p>₹{b.totalPrice}</p>

<button
onClick={()=>
downloadPDF(
b
)
}
>
PDF
</button>

</div>

))}

</div>

);

}