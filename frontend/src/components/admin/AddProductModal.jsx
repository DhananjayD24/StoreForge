import { useState } from "react";
import api from "../../api/api";

function AddProductModal({close,refresh}) {

  const [form,setForm] = useState({
    name:"",
    price:"",
    description:"",
    category:"",
    stock:""
  });

  const [images,setImages] = useState([]);

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = async(e)=>{
    try{
        e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach(key=>{
      formData.append(key,form[key]);
    });

    images.forEach(img=>{
      formData.append("images",img);
    });

    await api.post("/products",formData);
    

    refresh();
    close();
    }
    catch (error) {
  alert(error.response?.data?.message || "Error adding product");
}
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl w-[500px]">

        <h2 className="text-xl font-bold mb-6">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="name" placeholder="Product Name" className="w-full border p-2 rounded" onChange={handleChange} />

          <input name="price" type="number" placeholder="Price" className="w-full border p-2 rounded" onChange={handleChange} />

          <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" onChange={handleChange} />

          <input name="category" placeholder="Category" className="w-full border p-2 rounded" onChange={handleChange} />

          <input name="stock" type="number" placeholder="Stock" className="w-full border p-2 rounded" onChange={handleChange} />

          <input type="file" multiple onChange={(e)=>setImages([...e.target.files])} />

          <div className="flex justify-end gap-3">
            <button type="button" onClick={close} className="border px-4 py-2 rounded">Cancel</button>
            <button className="bg-black text-white px-4 py-2 rounded">Create</button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProductModal;