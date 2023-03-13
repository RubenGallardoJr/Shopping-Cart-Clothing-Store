function ShoppingCart({ availableItems }) {
    const [stock, setStock] = React.useState(availableItems);
    const [cart, setCart] = React.useState([]);
  
    const addToCart = (productId) => {
      const itemInStock = stock.find((item) => item.product === productId);
      if (itemInStock.inStock === 0) {
        return;
      }
  
      const updatedStock = stock.map((item) => {
        if (item.product === productId) {
          item.inStock -= 1;
        }
        return item;
      });
      setStock(updatedStock);
  
      setCart([...cart, { product: productId }]);
    };
  
    const availableItemsButtons = availableItems.map((item, index) => {
      return (
        <button
          key={index}
          onClick={() => addToCart(item.product)}
          disabled={item.inStock === 0}
        >
          {item.product}:{item.inStock}
        </button>
      );
    });
  
    return (
      <>
        <ul key="stock" style={{ listStyleType: 'none' }}>
          {availableItemsButtons}
        </ul>
        <h1>Shopping Cart</h1>
        <Cart cartitems={cart} />
      </>
    );
  }
  
  function Cart({ cartitems }) {
    const cartItemButtons = cartitems.map((item, index) => {
      return (
        <button key={index} disabled>
          {item.product}
        </button>
      );
    });
  
    return (
      <ul id="cart-items" style={{ listStyleType: 'none' }} key="cart">
        {cartItemButtons}
      </ul>
    );
  }
  
  const availableItems = [
    { product: "Jacket", inStock: 2 },
    { product: "Pants", inStock: 3 },
    { product: "Scarf", inStock: 0 },
    { product: "Pajamas", inStock: 3 },
    { product: "Shirt", inStock: 1 },
  ];
  
  ReactDOM.render(
    <ShoppingCart availableItems={availableItems} />,
    document.getElementById("root")
  );
  