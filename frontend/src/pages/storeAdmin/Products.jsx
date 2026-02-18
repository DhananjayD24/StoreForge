import { useState } from "react";
import { useProducts } from "../../context/ProductContext";

function Products() {
  const { products, addProduct, deleteProduct, updateStock } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: "https://via.placeholder.com/150",
    });
    setShowForm(false);
    setFormData({ name: "", price: "", category: "", stock: "" });
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">
          Product Management
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg w-full sm:w-auto"
        >
          + Add Product
        </button>
      </div>

      {/* ADD PRODUCT FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Product Name"
            required
            className="border p-3 rounded-lg dark:bg-gray-700"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            required
            className="border p-3 rounded-lg dark:bg-gray-700"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Category"
            required
            className="border p-3 rounded-lg dark:bg-gray-700"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Stock"
            required
            className="border p-3 rounded-lg dark:bg-gray-700"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />

          <button
            type="submit"
            className="sm:col-span-2 bg-black text-white py-3 rounded-xl"
          >
            Save Product
          </button>
        </form>
      )}

      {/* ===== DESKTOP TABLE (md+) ===== */}
      <div className="hidden md:block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b dark:border-gray-700">
              <th className="py-3">Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-3 font-medium">{product.name}</td>
                <td>₹ {product.price}</td>
                <td>{product.category}</td>
                <td>
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) =>
                      updateStock(product.id, Number(e.target.value))
                    }
                    className="w-16 border p-1 rounded"
                  />
                  {product.stock < 5 && (
                    <span className="ml-2 text-xs text-red-500">
                      Low
                    </span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARD VIEW (< md) ===== */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm space-y-3"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">
                {product.name}
              </h3>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>

            <p className="text-sm">
              Price: ₹ {product.price}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-sm">Stock:</span>
              <input
                type="number"
                value={product.stock}
                onChange={(e) =>
                  updateStock(product.id, Number(e.target.value))
                }
                className="w-20 border p-1 rounded"
              />
              {product.stock < 5 && (
                <span className="text-xs text-red-500">
                  Low
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Products;
