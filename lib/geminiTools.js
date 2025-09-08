export const searchGoogleDeclaration = {
  name: "searchGoogle",
  description: "Fetch the latest Google search snippets for a given query",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "The search query" }
    },
    required: ["query"]
  }
};

export const searchWeatherDeclaration = {
  name: "searchWeather",
  description: "Fetch the Latest Weather Information for a given query",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "The search query" }
    },
    required: ["query"]
  }
};


export const searchCurrencyDeclaration = {
  name: "searchCurrency",
  description: "Get live currency exchange rates",
  parameters: {
    type: "object",
    properties: {
      currency: {
        type: "string",
        description: "Base currency code (e.g., USD, PKR, EUR)"
      }
    },
    required: ["currency"]
  }
};

export const calculatorDeclaration = {
  name: "calculate",
  description: "Perform basic math calculations",
  parameters: {
    type: "object",
    properties: {
      expression: { type: "string", description: "Math expression like '2 + 2' or '15% of 200'" },
    },
    required: ["expression"],
  },
};
