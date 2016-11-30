var config = {
    "BASE": "https://se-console.kinvey.com/environments",
    "Development": "kid_Zk-fAAEhwg",
    "UAT": "kid_Hy7Pxmhs",
    "Production": "kid_Z1EUc88ual"
};


var components = [{
    "collection": "profiles",
    "business_logics": ["onPostFetch"]
}, {
    "collection": "countries",
    "business_logics": []
}, {
    "collection": "retailors",
    "business_logics": ["onPreFetch"]
}, {
    "collection": "publicPrices",
    "business_logics": ["onPreFetch"]
}, {
    "collection": "phoneNumbers",
    "business_logics": []
}, {
    "collection": "orderChanges",
    "business_logics": ["onPreFetch"]
}];
