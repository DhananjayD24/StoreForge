import { useEffect, useState } from "react";
import api from "../../api/api";
import AddProductModal from "../../components/admin/AddProductModal";
import EditProductModal from "../../components/admin/EditProductModal";

function Products() {

  const [products,setProducts] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [editingProduct,setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await api.get("/products/my");
    setProducts(res.data);
  };

  useEffect(()=>{
    fetchProducts();
  },[]);

  const deleteProduct = async(id)=>{
    if(!window.confirm("Delete this product?")) return;

    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={()=>setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-left">

          <thead className="border-b">
            <tr className="text-sm text-gray-600">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (

              <tr key={product._id} className="border-b">

                <td className="p-4">
                  {product.images?.[0] &&
                    <img
                      src={product.images[0]}
                      className="w-14 h-14 object-cover rounded"
                    />
                  }
                </td>

                <td className="p-4">{product.name}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.stock}</td>

                <td className="p-4 space-x-3">

                  <button
                    className="text-blue-500"
                    onClick={()=>setEditingProduct(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-500"
                    onClick={()=>deleteProduct(product._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}
          </tbody>

        </table>

      </div>

      {/* Modals */}

      {showModal &&
        <AddProductModal
          close={()=>setShowModal(false)}
          refresh={fetchProducts}
        />
      }

      {editingProduct &&
        <EditProductModal
          product={editingProduct}
          close={()=>setEditingProduct(null)}
          refresh={fetchProducts}
        />
      }

    </div>
  );
}

export default Products;