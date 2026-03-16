import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function StoreFront() {

  const { slug } = useParams();

  const [storeName, setStoreName] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      const res = await api.get(`/store/${slug}/products`);

      setStoreName(res.data.storeName);
      setProducts(res.data.products);

    };

    fetchProducts();

  }, [slug]);

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        {storeName}
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {products.map(product => (

          <div
            key={product._id}
            className="border p-4 rounded shadow"
          >

            <h2 className="text-xl font-bold">
              {product.name}
            </h2>

            <p className="text-gray-600">
              ₹{product.price}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}