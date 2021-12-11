// https://placeholder.com/ per le immagini

export default function Product ({
  data
}) {
  /* add to cart
  chiamare setCart dal context
  */

  return (
    <div className="product">
      {/* visualizzazione dati */}
      <div className="product__name">{data.name}</div>

      {/* counter quantità */}

      {/* bottone aggiunta carrello */}
    </div>
  )
}