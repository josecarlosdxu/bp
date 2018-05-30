var cartData = {
    "shops": [{
            "name": "shop1",
            "domain": "www.shop.com",
            "selected": false,
            "buyed": true,
            "theme_name": "Ibiza",
            "theme_id": "2",
            "has_catalog": true,
            "catalog_name": "Perfumes",
            "catalog_id": "3"
        },
        {
            "name": "shop2",
            "domain": "www.shop2.com",
            "selected": true,
            "buyed": false,
            "theme_name": "Valencia",
            "theme_id": "1",
            "has_catalog": true,
            "catalog_name": "Electrónica",
            "catalog_id": "1"
        }
    ],
    "pack": {
        "idpack": 26
    },
    "packs": [{
            "index": 0,
            "type": "b2b",
            "name": "b2b",

            "quote": {
                "text": "Cuota de alta",
                "active": false,
                "price": 0
            },
            "options": [{
                "title": "Pack B2B",
                "subtitle": "(Sin cuota mensual)",
                "value": 20,
                "price": 0
            }]
        },
        {
            "type": "dropship",
            "name": "dropship",
            "index": 1,
            "quote": {
                "text": "Cuota de alta",
                "active": false,
                "price": 90
            },
            "options": [{
                    "title": "Mensual",
                    "subtitle": "",
                    "value": 21,
                    "price": 49
                },
                {
                    "title": "Semestral",
                    "subtitle": "(Ahorro 1 mes)",
                    "value": 22,

                    "price": 245
                },
                {
                    "title": "Anual",
                    "subtitle": "(Ahorro 3 meses)",
                    "value": 23,
                    "price": 441
                }
            ]
        },
        {
            "type": "enterprise",
            "name": "enterprise",
            "index": 2,
            "quote": {
                "text": "Cuota de alta",
                "active": false,
                "price": 90
            },
            "options": [{
                    "title": "Mensual",
                    "subtitle": "",
                    "value": 24,
                    "price": 69
                },
                {
                    "title": "Semestral",
                    "subtitle": "(Ahorro 1 mes)",
                    "value": 25,
                    "price": 345
                },
                {
                    "title": "Anual",
                    "subtitle": "(Ahorro 3 meses)",
                    "value": 26,
                    "price": 621
                }
            ]
        },
        {

            "type": "enterprise",
            "name": "enterprise2",
            "index": 2,
            "quote": {
                "text": "Cuota de alta",
                "active": false,
                "price": 90
            },
            "options": [{
                    "title": "Mensual",
                    "subtitle": "",
                    "value": 24,
                    "price": 69
                },
                {
                    "title": "Semestral",
                    "subtitle": "(Ahorro 1 mes)",
                    "value": 25,
                    "price": 345
                },
                {
                    "title": "Anual",
                    "subtitle": "(Ahorro 3 meses)",
                    "value": 26,
                    "price": 621
                }
            ]
        }
    ]
}