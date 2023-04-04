$(document).ready(function() {
    $('#crypto-form').submit(function(event) {
      event.preventDefault();
      var cryptoName = $('#crypto-name').val();
      if (cryptoName) {
        $('#crypto-data').removeClass('show');
        $.get('https://api.coingecko.com/api/v3/coins/' + cryptoName.toLowerCase())
          .done(function(data) {
            var price = data.market_data.current_price.usd.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
            var marketCap = data.market_data.market_cap.usd.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
            var volume = data.market_data.total_volume.usd.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
            var percentChange = data.market_data.price_change_percentage_24h.toFixed(2) + '%';
            var lastUpdated = new Date(data.last_updated).toLocaleString();
            $('#crypto-data').html(`
              <h3>${cryptoName.toUpperCase()}</h3>
              <p><strong>Price:</strong> ${price}</p>
              <p><strong>Market Cap:</strong> ${marketCap}</p>
              <p><strong>Trading Volume:</strong> ${volume}</p>
              <p><strong>24 Hour Change:</strong> ${percentChange}</p>
              <p><strong>Last Updated:</strong> ${lastUpdated}</p>
            `);
            $('#crypto-data').addClass('show');
          })
          .fail(function() {
            $('#crypto-data').html('<p>Unable to retrieve data. Please try again later.</p>');
            $('#crypto-data').addClass('show');
          });
      }
    });
  });
  