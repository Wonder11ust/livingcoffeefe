// import { useEffect, useState } from "react";
// import CoffeeCard from "../components/CoffeeCard";
// import echo from "../utils/echo";

// export default function Home(){
//     const [coffees, setCoffees] = useState([]);

//     useEffect(()=>{
//         fetch('http://localhost:8000/api/coffees')
//         .then(res => res.json())
//         .then(data => setCoffees(data));

//         echo.channel('kopi-channel')
//         .listen('.coffee-added',(event)=>{
//             console.log('New coffee received:', event);
//             setCoffees(prev => [event.coffee, ...prev]);
//         });

//         return ()=>{
//             echo.leave('kopi-channel');
//         };
//     }, [])

//     return (
//         <main className="max-w-4xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Coffee Menu (Real Time)</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {coffees.map((coffee, index)=>(
//                     <CoffeeCard key={index} coffee={coffee} />
//                 ))}
//             </div>
//         </main>
//     )
// }