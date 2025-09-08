export async function searchGoogle(query) {

  const res = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEYSECOND}&cx=${process.env.SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
  );

  const data = await res.json();
  if (!data.items) return "No results found.";

  // Return only snippets, keep it short
  return data.items.map(item => item.snippet).join("\n\n");
}

export async function searchWeather(query) {

 const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.WEATHER_API_KEY}&units=metric`);

  const data = await res.json();
 
  const extractedData = {
    city: data.name,
    country: data.sys.country,
    condition: data.weather[0].description,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    unit: "°C"
  }

  return extractedData;
}


export async function searchCurrency(baseCurrency) {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/latest/${baseCurrency}`
  );

  const data = await res.json();

  if (data.result !== "success") {
    return { error: "Failed to fetch currency rates." };
  }

  // Return a clean object
  return {
    base: data.base_code,
    lastUpdate: data.time_last_update_utc,
    rates: data.conversion_rates
  };
}
