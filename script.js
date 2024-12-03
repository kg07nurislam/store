const sheetApiUrl = 'https://script.google.com/macros/s/AKfycbzqF__uCwx7wytjDQexuokIAEPm8HoTRYrLYo3qy6OTdyRDNY5oczRGjR0FP6B2u93W/exec';

let selectedProduct = {};

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
            <span>Баасы:</span>
            <span>${product.product_price} сом</span>
          </div>
          <button onclick="openModal('${product.product_id}', '${product.product_name}', ${product.product_price})">
            Сатып алуу
          </button>
        </div>
      `;
      container.innerHTML += productHtml;
    });
  })
  .catch(error => {
    console.error('Fetch катасы:', error);
  });

// Модалдык терезени ачуу
function openModal(productId, productName, productPrice) {
  selectedProduct = { id: productId, name: productName, price: productPrice };
  document.getElementById('modal-product-name').textContent = `Продукт: ${productName}`;
  document.getElementById('quantity-modal').style.display = 'flex';
}

// Модалдык терезени жабуу
function closeModal() {
  document.getElementById('quantity-modal').style.display = 'none';
}

// Количество киргизүүнү тастыктоо
function confirmQuantity() {
  const quantity = document.getElementById('quantity-input').value;
  if (!quantity || isNaN(quantity) || quantity <= 0) {
    alert("Туура санды киргизиңиз!");
    return;
  }

  const totalPrice = (selectedProduct.price * quantity).toFixed(2);
  const message = `Салам! Мен төмөнкүлөрдү буйрутма бергим келет.%0A%0A🌟 *Буйрутма маалыматы* 🌟%0A%0A` +
    `🛒 Имя: "${selectedProduct.name}" ;%0A` +
    `🆔 ID: "${selectedProduct.id}" ;%0A` +
    `➡️ Количество: "${quantity}шт" ;%0A%0A` +
    `💰 *Жалпы сумма:* "${totalPrice} сом"`;

  const phoneNumber = "+996999106710";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappURL, "_blank");

  closeModal();
}
