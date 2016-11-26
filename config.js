var config = {
    "BASE": "https://se-console.kinvey.com/environments",
    "Development": "kid_Zk-fAAEhwg",
    "UAT": "kid_Hy7Pxmhs",
    "Production": "kid_Z1EUc88ual"
};


var components = [{
        "collection": "profiles",
        "business_logic": ["onPostFetch"]
    }, {
        "collection": "countries",
        "business_logic": []
    }, {
        "collection": "retailors",
        "business_logic": ["onPreFetch"]
    },

    {
        "collection": "publicPrices",
        "business_logic": ["onPreFetch"]
    },

    {
        "collection": "phoneNumbers",
        "business_logic": []
    },

    {
        "collection": "orderChanges",
        "business_logic": ["onPreFetch"]
    }
];
