import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <div className="group w-full max-w-[300px] bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden border border-secondary/5 m-3">
      {/* Image Section with Hover Zoom */}
      <div className="relative w-full h-[240px] overflow-hidden bg-primary/10">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={product.images[0]}
          alt={product.name}
        />

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest shadow-sm">
          {product.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Product Name & ID */}
        <h1 className="text-lg font-medium text-secondary leading-tight line-clamp-1">
          {product.name}
        </h1>
        <p className="text-[11px] text-secondary/40 font-mono mb-3 mt-1 uppercase tracking-wider">
          {product.productID}
        </p>

        {/* Pricing Section (Pushed to bottom using mt-auto) */}
        <div className="mt-auto mb-4">
          {product.labelledPrice > product.price ? (
            <div className="flex gap-2 items-baseline">
              <p className="text-xl text-accent font-semibold">
                LKR {product.price.toFixed(2)}
              </p>
              <p className="text-sm text-secondary/40 font-medium line-through">
                LKR {product.labelledPrice.toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-xl text-accent font-semibold">
              LKR {product.price.toFixed(2)}
            </p>
          )}
        </div>

        {/* Call to Action Button */}
        <Link
          to="/overview"
          className="block w-full text-center py-2.5 rounded-xl font-medium tracking-wide bg-primary/50 text-secondary border border-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 active:scale-[0.98]"
          state={product}
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
