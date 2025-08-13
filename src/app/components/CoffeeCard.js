export default function CoffeeCard({coffee, onAddToCart}){
    return (
        <div className="p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-2">
                ☕ {coffee.cname}
            </h2>
            <p className="text-gray-600">Harga: Rp.{Number(coffee.price).toLocaleString('id-ID')}</p>
            <span className="inline-block mt-1 text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                {coffee.category}
            </span>
            <input
                type="number"
                placeholder="Jumlah Pesanan"
                className="mt-2 border p-2 w-full rounded"
                name="qty"
                min="1"
                onChange={(e) => console.log('Jumlah Pesanan:', e.target.value)}    
            />
            <button className="flex mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={()=>onAddToCart(coffee)}>
                Tambah Pesanan
            </button>
        </div>
    )
}