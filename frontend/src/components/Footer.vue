<template>
    <footer>
      <div class="footer-content">
        <div class="contact-info">
          <p>Contact me:</p>
          <ul>
            <li>Telegram: <a :href="telegramLink" target="_blank">@expeoo</a></li>
            <!-- Добавьте другие контактные данные по необходимости -->
          </ul>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'footer-d',
    data() {
      return {};
    },
    computed: {
      telegramLink() {
        return `https://t.me/expeoo`;
      },
    },
  };
  </script>
  
  <style scoped>
  footer {
    background-color: #222;
    padding: 20px;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .contact-info {
    font-size: 16px;
  }
  
  .contact-info ul {
    list-style-type: none;
    padding: 0;
  }
  
  .contact-info li {
    margin-bottom: 5px;
  }
  
  .contact-info a {
    color: #007bff;
    text-decoration: none;
  }
  </style>
  