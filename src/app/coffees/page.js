"use client";
import { useEffect, useState } from "react";
import CoffeeCard from "../components/CoffeeCard";
import CoffeeForm from "../components/CoffeeForm";
import echoInstance from "../utils/echo";

export default function Home() {
  // console.log('kunci:',process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER)
  const [coffees, setCoffees] = useState([]);

  const fetchCofees = async()=>{
      const res = await fetch("http://127.0.0.1:8000/api/coffees")
      const json = await res.json();
      setCoffees(json?.coffees?.data || [])
    }

  useEffect(() => {
    fetchCofees();

    if(!echoInstance) return;

    const channel = echoInstance.channel('kopi-channel');
    channel.listen('.coffee-added',(e)=>{
      console.log('New coffee added:',e)
      if(e.coffee){
        setCoffees((prev)=>[e.coffee, ...prev])
      }
    });
    return ()=>{
      channel.stopListening(".coffee-added")
    }
    
  
}, []);

const addCoffee = (coffee)=>{
  setCoffees((prev) => [coffee, ...prev]);
}

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Coffee Menu (Real Time)</h1>
      <CoffeeForm onCoffeeAdded={(coffee)=>setCoffees((prev)=>[coffee, ...prev])}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coffees.map((coffee, index) => (
          <CoffeeCard key={index} coffee={coffee} />
        ))}
      </div>
    </main>
  );
}
