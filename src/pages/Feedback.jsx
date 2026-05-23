import { useState, useEffect } from "react";
import axios from "axios";

export default function Feedback() {

const API="https://bookandgo-backend.onrender.com/api/feedbacks";

const [feedbacks,setFeedbacks]=useState([]);
const [message,setMessage]=useState("");
const [rating,setRating]=useState(5);
const [editId,setEditId]=useState(null);

const user=JSON.parse(
localStorage.getItem("user")
);

useEffect(()=>{

fetchFeedbacks();

},[]);

const fetchFeedbacks=async()=>{

try{

const res=await axios.get(API);

setFeedbacks(res.data);

localStorage.setItem(
"feedbacks",
JSON.stringify(res.data)
);

}
catch(err){

console.log(err);

}

};

const handleSubmit=async(e)=>{

e.preventDefault();

const data={

email:user?.email||"Guest",
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

setEditId(null);

}
else{

await axios.post(
API,
data
);

}

setMessage("");
setRating(5);

fetchFeedbacks();

}
catch(err){

alert("Saving failed");

}

};

const handleEdit=(fb)=>{

setMessage(fb.message);

setRating(fb.rating);

setEditId(fb._id);

};

const handleDelete=async(id)=>{

try{

await axios.delete(
`${API}/${id}`
);

fetchFeedbacks();

}
catch{

alert("Delete error");

}

};

return(

<div className="feedback-container">

<h2>Feedback & Reviews</h2>

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

<option value="5">⭐⭐⭐⭐⭐</option>
<option value="4">⭐⭐⭐⭐</option>
<option value="3">⭐⭐⭐</option>
<option value="2">⭐⭐</option>
<option value="1">⭐</option>

</select>

<button type="submit">

{editId?
"Save Update":
"Submit"}

</button>

</form>

{feedbacks.map((fb)=>(

<div
key={fb._id}
className="feedback-item"
>

<p>{fb.email}</p>

<p>{fb.message}</p>

<p>
{"⭐".repeat(
fb.rating
)}
</p>

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