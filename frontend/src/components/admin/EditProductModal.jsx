import { useState } from "react";
import api from "../../api/api";

function EditProductModal({ product, close, refresh }) {

  const [form,setForm] = useState(product);
  const [images,setImages] = useState([]);

  const handleUpdate = async () => {

    const formData = new FormData();

    formData.append("name",form.name);
    formData.append("price",form.price);
    formData.append("description",form.description);
    formData.append("category",form.category);
    formData.append("stock",form.stock);

    images.forEach(img=>{
      formData.append("images",img);
    });

    await api.put(`/products/${product._id}`,formData);

    refresh();
    close();
  };

  const removeImage = (index)=>{

    const updated = [...form.images];
    updated.splice(index,1);

    setForm({
      ...form,
      images:updated
    });
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl w-[600px] space-y-4">

        <h2 className="text-xl font-bold">
          Edit Product
        </h2>

        <input
          value={form.name || ""}
          onChange={(e)=>setForm({...form,name:e.target.value})}
          className="w-full border p-2 rounded"
          placeholder="Product Name"
        />

        <input
          type="number"
          value={form.price || ""}
          onChange={(e)=>setForm({...form,price:e.target.value})}
          className="w-full border p-2 rounded"
          placeholder="Price"
        />

        <textarea
          value={form.description || ""}
          onChange={(e)=>setForm({...form,description:e.target.value})}
          className="w-full border p-2 rounded"
          placeholder="Description"
        />

        <input
          value={form.category || ""}
          onChange={(e)=>setForm({...form,category:e.target.value})}
          className="w-full border p-2 rounded"
          placeholder="Category"
        />

        <input
          type="number"
          value={form.stock || ""}
          onChange={(e)=>setForm({...form,stock:e.target.value})}
          className="w-full border p-2 rounded"
          placeholder="Stock"
        />

        {/* Existing Images */}

        <div className="flex gap-3 flex-wrap">

          {form.images?.map((img,index)=>(
            <div key={index} className="relative">

              <img
                src={img}
                className="w-20 h-20 object-cover rounded"
              />

              <button
                onClick={()=>removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
              >
                ×
              </button>

            </div>
          ))}

        </div>

        <input
          type="file"
          multiple
          onChange={(e)=>setImages([...e.target.files])}
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={close}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Update Product
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProductModal;