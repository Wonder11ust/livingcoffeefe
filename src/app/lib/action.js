import {z} from 'zod';
import { revalidatePath } from 'next/cache';
import {redirect} from 'next/navigation';


export default async function addCoffeeAction(formData) {
  const coffeeSchema = z.object({
    cname: z.string().min(1, "Nama kopi tidak boleh kosong"),
    price: z.string().min(1, "Harga kopi tidak boleh kosong"),
    category: z.string().min(1, "Kategori kopi tidak boleh kosong"),
  });

  try {
    const coffeeData = coffeeSchema.parse(formData);
    
  } catch (error) {
    console.error("Validation error:", error);
    return { error: error.errors[0].message };
  }
}