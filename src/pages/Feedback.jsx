import { useState, useEffect } from "react";
import axios from "axios";

export default function Feedback() {

const API="https://bookandgo-backend.onrender.com/api/feedbacks";

const user=JSON.parse(
localStorage.getItem("user")
);

const [feedbacks,setFeedbacks]=useState([]);
const [message,setMessage]=useState("");
const [rating,setRating]=useState(5);
const [editId,setEditId]=useState(null);

useEffect(()=>{

fetchFeedbacks();

},[]);

const fetchFeedbacks=async()=>{

try{

const res=await axios.get(API);

const userFeedbacks=res.data.filter(

(fb)=>fb.email===user?.email

);

setFeedbacks(userFeedbacks);

}
catch(err){

console.log(err);

}

};


const handleSubmit=async(e)=>{

e.preventDefault();

const data={

email:user?.email,
message,
rating:Number(rating),
date:new Date().toLocaleDateString()

};

try{

if(editId){

await axios.put(

`${API}/${editId}`,
data

);

alert(
"Feedback updated successfully"
);

setEditId(null);

}else{

await axios.post(
API,
data
);

alert(
"Feedback submitted successfully"
);

}

setMessage("");
setRating(5);

fetchFeedbacks();

}
catch(err){

console.log(err);

alert(
"Failed to save feedback"
);

}

};

const handleEdit=(fb)=>{

setMessage(
fb.message
);

setRating(
fb.rating
);

setEditId(
fb._id
);

};

const handleDelete=async(id)=>{

try{

await axios.delete(
`${API}/${id}`
);

alert(
"Feedback deleted successfully"
);

fetchFeedbacks();

}
catch(err){

console.log(err);

alert(
"Failed to delete"
);

}

};

return(

<div className="feedback-container">

<h2>
Feedback & Reviews
</h2>

<form onSubmit={handleSubmit}>

<input
value={user?.email||""}
readOnly
/>

<textarea
value={message}
onChange={(e)=>
setMessage(
e.target.value
)
}
required
/>

<select
value={rating}
onChange={(e)=>
setRating(
e.target.value
)
}
>

<option value={5}>⭐⭐⭐⭐⭐</option>
<option value={4}>⭐⭐⭐⭐</option>
<option value={3}>⭐⭐⭐</option>
<option value={2}>⭐⭐</option>
<option value={1}>⭐</option>

</select>

<button type="submit">

{editId?
"Save Update":
"Submit"}

</button>

</form>

<h3>Your Feedback</h3>

{feedbacks.map((fb)=>(

<div
key={fb._id}
className="feedback-item"
>

<p>{fb.message}</p>

<p>
{"⭐".repeat(
fb.rating
)}
</p>

<p>{fb.date}</p>

<button
onClick={()=>
handleEdit(fb)
}
>

Edit

</button>

<button
onClick={()=>
handleDelete(
fb._id
)
}
>

Delete

</button>

</div>

))}

</div>

);

}