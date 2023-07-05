// Example stock data (replace with real-time data from API)
const stockData = {
    AAPL: 150.75,
    GOOGL: 2456.32,
    MSFT: 270.40,
    AMZN: 3500.25,
    FB: 340.18,
    TSLA: 650.50,
    NVDA: 800.12,
    NFLX: 600.05,
    PYPL: 300.75,
    BABA: 210.36,
    IBM: 135.90,
    ORCL: 85.45,
    AMD: 105.60,
    V: 250.30,
    JPM: 155.80,
    XOM: 65.20,
    DIS: 175.40,
    BA: 230.15,
    WMT: 140.25,
    NKE: 175.60
  };
  
  // Function to update the balance display
  function updateBalance() {
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `Balance: $${balance.toFixed(2)}`;
  }
  
  // Function to update stock prices
  function updateStockPrices() {
    for (const symbol in stockData) {
      if (stockData.hasOwnProperty(symbol)) {
        const price = stockData[symbol];
        const priceElement = document.getElementById(symbol);
        if (priceElement) {
          priceElement.textContent = `$${price.toFixed(2)}`;
        }
      }
    }
  }
  
  // Function to handle buying stocks
  function buyStock(symbol, quantity) {
    const price = stockData[symbol];
    if (price && quantity > 0 && balance >= price * quantity) {
      balance -= price * quantity;
      updateBalance();
      alert(`Bought ${quantity} shares of ${symbol} at $${price.toFixed(2)} each.`);
    } else {
      alert('Invalid transaction.');
    }
  }
  
  // Function to handle selling stocks
  function sellStock(symbol, quantity) {
    const price = stockData[symbol];
    if (price && quantity > 0) {
      balance += price * quantity;
      updateBalance();
      alert(`Sold ${quantity} shares of ${symbol} at $${price.toFixed(2)} each.`);
    } else {
      alert('Invalid transaction.');
    }
  }
  
  // Simulate updating stock prices during market hours (9 AM to 4 PM)
  function updateMarketPrices() {
    const now = new Date();
    const marketOpen = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
    const marketClose = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0, 0);
  
    if (now > marketOpen && now < marketClose) {
      for (const symbol in stockData) {
        if (stockData.hasOwnProperty(symbol)) {
          stockData[symbol] += Math.random() * 10 - 5; // Simulate price change
        }
      }
      updateStockPrices();
    }
  }
  
  // Update stock prices every 10 seconds during market hours
  setInterval(updateMarketPrices, 10000);
  
  // Event listeners for buy buttons
  document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.getElementsByClassName('buy');
    for (let i = 0; i < buyButtons.length; i++) {
      buyButtons[i].addEventListener('click', function() {
        const symbolElement = this.parentNode.getElementsByClassName('symbol')[0];
        const quantityElement = this.parentNode.getElementsByClassName('quantity')[0];
        const symbol = symbolElement.textContent;
        const quantity = parseInt(quantityElement.value);
  
        buyStock(symbol, quantity);
      });
    }
  });