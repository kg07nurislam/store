const sheetApiUrl = 'https://script.google.com/macros/s/AKfycbzqF__uCwx7wytjDQexuokIAEPm8HoTRYrLYo3qy6OTdyRDNY5oczRGjR0FP6B2u93W/exec';

document.getElementById('product-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const productName = document.getElementById('product-name').value;
  const productDescription = document.getElementById('product-description').value;
  const productImgUrl = document.getElementById('product-img-url').value;
  const productPrice = document.getElementById('product-price').value;
  const wbNumber = document.getElementById('product-wb-number').value;

  const data = {
    action: 'addProduct',
    email,
    password,
    productName,
    productDescription,
    productImgUrl,
    productPrice,
    wbNumber,
  };

  fetch(sheetApiUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(result => {
      document.getElementById('status').innerText = result.message;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('status').innerText = 'Бир ката кетти!';
    });
});
