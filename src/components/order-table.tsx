import { Link } from '@tanstack/react-router'

export default function OrderTable({
  products,
}: {
  products: SellerOrder['products']
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table text-sm table-pin-rows">
          <thead>
            <tr className="bg-slate-100">
              <th className="font-medium">Product</th>
              <th className="font-medium">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx} className="hover:bg-light-grey-clr">
                <td className="w-full">
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="hover:underline"
                  >
                    {product.slug}
                  </Link>
                </td>

                <td className="w-max text-nowrap">
                  {product.quantity} {product.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
