import { Product } from "@/types/products";

type ProductCardProps = {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => (
  <div className="bg-white p-3 shadow-md rounded-lg flex flex-col items-start space-y-2">
    {product.shop_image && (
      <img
        src={product.shop_image}
        alt={product.shop_name}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
    )}
    <h3 className="text-xl font-semibold">{product.shop_name}</h3>
    <p className="text-gray-600">
      <span className="font-medium">Commission Rate:</span> {product.commission_rate}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Shop Type:</span> {product.shop_type}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Country:</span> {product.country}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Period:</span> {product.period_start_time} to{" "}
      {product.period_end_time || "N/A"}
    </p>
    <a
      href={product.tracking_link}
      className="text-blue-500 hover:underline mt-4 inline-block"
      target="_blank"
      rel="noopener noreferrer"
    >
      Go to Shop
    </a>
  </div>
);

export default ProductCard;
