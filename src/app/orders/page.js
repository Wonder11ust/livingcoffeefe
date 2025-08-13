"use client";
import { useEffect, useState } from "react";
import CoffeeCard from "../components/CoffeeCard";
import echoInstance from "../utils/echo";

export default function Pages() {
  const [coffees, setCoffees] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (coffee)=>{
    const existingItem = cart.find(item => item.id === coffee.id);

    if(existingItem){
      setCart(prev =>
        prev.map(item =>
          item.id === coffee.id ? {...item, quantity: item.quantity + 1}: item
        )
      );
    }else {
      setCart(prev => [...prev, {...coffee, quantity:1}])
    }
    console.log("cart updated:",[...cart,coffee])
  }

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coffees.map((coffee, index) => (
          <CoffeeCard key={index} coffee={coffee}  onAddToCart={addToCart}/>
        ))}
      </div>
    </main>
  );
}
