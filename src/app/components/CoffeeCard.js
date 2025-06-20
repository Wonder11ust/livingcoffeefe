export default function CoffeeCard({coffee}){
    return (
        <div className="p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-2">
                ☕ {coffee.cname}
            </h2>
            <p className="text-gray-600">Harga: Rp.{Number(coffee.price).toLocaleString('id-ID')}</p>
            <span className="inline-block mt-1 text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                {coffee.category}
            </span>
        </div>
    )
}