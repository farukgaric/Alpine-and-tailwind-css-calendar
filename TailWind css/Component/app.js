const dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

document.addEventListener('alpine:init',() => {
    Alpine.store('menu',{
        items: [],
        cart: [],

        init() {
            this.items = menuItems;
        },

        displayDollar(value) {
            return dollarFormatter.format(value);
        },
    })

    //Data
    Alpine.data('menu', () => ({
        addToCart(itemId) {
          const item = this.$store.menu.items[itemId];
          this.$store.menu.cart.push({ ...item, count: 1 });
        },
    
        itemInCart(itemId) {
          const itemName = this.$store.menu.items[itemId].name;
          return this.$store.menu.cart.some((item) => item.name === itemName);
        },
      })
    );

    Alpine.data('cart', () => ({
        cartPrice: { subTotal: 0, tax: 0, total: 0 },
        get cartEmpty() {
          return this.$store.menu.cart.length === 0;
        },
    
        init() {
          this.$watch('$store.menu.cart', () => {
            this.cartTotal();
          });
        },
    
        increaseItem(itemId) {
          this.$store.menu.cart[itemId].count++;
        },
        decreaseItem(itemId) {
          // If 1 item in cart, remove from cart
          if (this.$store.menu.cart[itemId].count === 1) {
            this.$store.menu.cart.splice(itemId, 1);
            return;
          }
    
          this.$store.menu.cart[itemId].count--;
        },
    
        itemTotal(item) {
          const itemTotal = item.price * item.count;
          return dollarFormatter.format(itemTotal);
        },
    
        cartTotal() {
          const restaurantTax = 0.05; // 5.0% avg VA
    
          const subTotal = this.$store.menu.cart.reduce(
            (total, item) => total + item.price * item.count,
            0
          );
          const tax = subTotal * restaurantTax;
          const total = subTotal + tax;
    
          this.cartPrice = { subTotal, tax, total };
        },
      }));    
})