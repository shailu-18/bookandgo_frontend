import {useEffect,useState} from "react";
import axios from "axios";

export default function AdminDashboard(){

const[bookings,setBookings]=useState([]);
const[feedbacks,setFeedbacks]=useState([]);

useEffect(()=>{

loadData();

},[]);

const loadData=async()=>{

try{

const bookingRes=
await axios.get(
"https://bookandgo-backend.onrender.com/api/bookings"
);

const feedbackRes=
await axios.get(
"https://bookandgo-backend.onrender.com/api/feedbacks"
);

setBookings(
bookingRes.data
);

setFeedbacks(
feedbackRes.data
);

}
catch(err){

console.log(err);

}

};

return(

<div>

<h2>Admin Dashboard</h2>

<h3>
Bookings:
{bookings.length}
</h3>

<h3>
Feedbacks:
{feedbacks.length}
</h3>

{bookings.map((b)=>(

<div
key={b._id}
>

<p>{b.name}</p>

<p>{b.destination}</p>

</div>

))}

{feedbacks.map((f)=>(

<div
key={f._id}
>

<p>{f.email}</p>

<p>{f.message}</p>

</div>

))}

</div>

);

}