import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Booking() {

const navigate=useNavigate();

const destination=
localStorage.getItem("destination");

const tripDays=
localStorage.getItem("tripDays");

const user=
JSON.parse(
localStorage.getItem("user")
);

const ADULT_PRICE=
Number(
localStorage.getItem(
"adultPrice"
)
)||0;

const CHILD_PRICE=
Number(
localStorage.getItem(
"childPrice"
)
)||0;

const [form,setForm]=
useState({

name:"",
email:user?.email || "",
contact:"",
date:"",
duration:tripDays || "1",
adults:0,
children:0,
travellers:[]

});

const handleTravellerChange=
(index,field,value)=>{

const updated=[
...form.travellers
];

updated[index][field]=
value;

setForm({
...form,
travellers:updated
});

};

const handlePeopleChange=
(type,value)=>{

const num=
Math.max(
0,
Number(value)
);

const updated={
...form,
[type]:num
};

const adults=
Array.from(
{
length:
updated.adults
},
()=>({
name:"",
age:"",
type:"adult"
})
);

const children=
Array.from(
{
length:
updated.children
},
()=>({
name:"",
age:"",
type:"child"
})
);

updated.travellers=[
...adults,
...children
];

setForm(updated);

};

const totalPrice=

form.adults*
ADULT_PRICE+

form.children*
CHILD_PRICE;

const handleSubmit=
async(e)=>{

e.preventDefault();

const bookingId=
"BOOK"+
Math.floor(
100000+
Math.random()*900000
);

const newBooking={

bookingId,
name:form.name,
email:user?.email,
contact:form.contact,
date:form.date,
destination,
duration:form.duration,
adults:form.adults,
children:form.children,
travellers:form.travellers,
totalPrice

};

try{

await axios.post(
"https://bookandgo-backend.onrender.com/api/bookings",
newBooking
);

alert(
"Booking Confirmed Successfully!"
);

navigate(
"/confirmation",
{
state:newBooking
}
);

}
catch(err){

console.log(err);

alert(
"Booking failed"
);

}

};

return(

<div className="booking-form">

<h2>
Booking Now
</h2>

<form
onSubmit={
handleSubmit
}
>

<input
type="text"
placeholder="Name"
required
value={form.name}
onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}
/>

<input
type="email"
value={form.email}
readOnly
/>

<input
type="tel"
placeholder="Contact"
required
value={form.contact}
onChange={(e)=>
setForm({
...form,
contact:e.target.value
})
}
/>

<input
type="date"
required
value={form.date}
onChange={(e)=>
setForm({
...form,
date:e.target.value
})
}
/>

<input
type="number"
placeholder="Adults"
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
value={form.children}
onChange={(e)=>
handlePeopleChange(
"children",
e.target.value
)
}
/>

<h3>
Total: ₹{totalPrice}
</h3>

<button
type="submit"
>
Confirm Booking
</button>

</form>

</div>

);

}