const sheetApiUrl = 'https://script.google.com/macros/s/AKfycbzqF__uCwx7wytjDQexuokIAEPm8HoTRYrLYo3qy6OTdyRDNY5oczRGjR0FP6B2u93W/exec';

    // Продукттарды жүктөө жана көрсөтүү
    fetch(sheetApiUrl)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP катасы: ${response.status}`);
        return response.json();
      })
      .then(products => {
        const container = document.getElementById('product-container');
        products.forEach(product => {
          const productHtml = `
            <div class="product-item">
              <img src="${product.product_img_url}" alt="${product.product_name}" class="product-img">
              <p class="product-name"><b>${product.product_name}</b></p>
              <p class="product-description">${product.product_description}</p>
              <div class="product-price">
                <span>Баасы</span>
                <span class="p-price">${product.product_price} сом</span>
              </div>
              <button onclick="addToCart('${product.product_id}', '${product.product_name}')">
                Корзинага кошу
                <img src="cart-icon.svg" alt="Корзина">
              </button>
            </div>
          `;
          container.innerHTML += productHtml;
        });
      })
      .catch(error => {
        console.error('Fetch катасы:', error);
        alert('Продукттарды жүктөөдө ката чыкты. APIни текшерип коюңуз.');
      });

    // Корзинага кошуу функциясы
    function addToCart(productId, productName) {
      const phoneNumber = '+996999106710'; // WhatsApp номериңиз
      const message = `Салам! Мен "${productName}" (ID: ${productId}) буйрутма кылгым келет.`;
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
