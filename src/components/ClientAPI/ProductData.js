import './ProductCard.css'

const ProductData = (props) => {
    return <div className='product-card'>
        <p className='title'>{props.drink.strDrink}</p>
        <img src={props.drink.strDrinkThumb} alt="" height="200" width="200" />
    </div>
}

export default ProductData