const categories =  [
  {
    "id": 1,
    "name": "Business Cards",
    "image": "https://dummyimage.com/200x300&text=dummyimage.com+Buisness+Cards",
    "description": "High-quality business cards for every need.",
    "subcategories": [
      {
        "id": 101,
        "name": "Standard",
        "image": "https://dummyimage.com/200x300&text=dummyimage.com+rocks!",
        "description": "Standard business cards with various finishes.",
        "products": [
          {
            "id": 1001,
            "name": "Matte",
            "image": "https://via.placeholder.com/150",
            "description": "Matte finish business cards.",
            "subproducts": [
              {
                "id": 10001,
                "name": "14pt",
                "description": "Durable 14pt matte finish."
              },
              {
                "id": 10002,
                "name": "16pt",
                "description": "Premium 16pt matte finish."
              }
            ]
          },
          {
            "id": 1002,
            "name": "Glossy",
            "image": "https://via.placeholder.com/150",
            "description": "Glossy finish business cards.",
            "subproducts": [
              {
                "id": 10003,
                "name": "14pt ",
                "description": "Durable 14pt glossy finish."
              },
              {
                "id": 10004,
                "name": "16pt ",
                "description": "Premium 16pt glossy finish."
              }
            ]
          }
        ]
      },
      {
        "id": 102,
        "name": "Premium",
        "image": "https://via.placeholder.com/150",
        "description": "Premium quality business cards with unique finishes.",
        "products": [
          {
            "id": 1003,
            "name": "Silk",
            "image": "https://via.placeholder.com/150",
            "description": "Silk finish business cards.",
            "subproducts": [
              {
                "id": 10005,
                "name": "14pt Silk Finish",
                "description": "Durable 14pt silk finish."
              },
              {
                "id": 10006,
                "name": "16pt Silk Finish",
                "description": "Premium 16pt silk finish."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Print Advertising & Office Signs",
    "image": "https://via.placeholder.com/150",
    "description": "Advertising materials and office signs.",
    "subcategories": [
      {
        "id": 201,
        "name": "Flyers",
        "image": "https://via.placeholder.com/150",
        "description": "High-quality flyers for all purposes.",
        "products": [
          {
            "id": 2001,
            "name": "Standard Flyers",
            "image": "https://via.placeholder.com/150",
            "description": "Standard flyers with multiple paper options.",
            "subproducts": [
              {
                "id": 20001,
                "name": "80lb Glossy",
                "description": "80lb glossy paper."
              },
              {
                "id": 20002,
                "name": "100lb Matte",
                "description": "100lb matte paper."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "name": "Banners & Posters",
    "image": "https://via.placeholder.com/150",
    "description": "High-quality banners and posters for every need.",
    "subcategories": [
      {
        "id": 301,
        "name": "Vinyl Banners",
        "image": "https://via.placeholder.com/150",
        "description": "Durable vinyl banners for indoor and outdoor use.",
        "products": [
          {
            "id": 3001,
            "name": "Standard Vinyl Banners",
            "image": "https://via.placeholder.com/150",
            "description": "Standard vinyl banners in various sizes.",
            "subproducts": [
              {
                "id": 30001,
                "name": "3x5 Vinyl Banner",
                "description": "3x5 feet vinyl banner."
              },
              {
                "id": 30002,
                "name": "4x6 Vinyl Banner",
                "description": "4x6 feet vinyl banner."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "name": "Labels, Stickers & Packaging",
    "image": "https://via.placeholder.com/150",
    "description": "Custom labels, stickers, and packaging solutions.",
    "subcategories": [
      {
        "id": 401,
        "name": "Custom Labels",
        "image": "https://via.placeholder.com/150",
        "description": "High-quality custom labels for all purposes.",
        "products": [
          {
            "id": 4001,
            "name": "Paper Labels",
            "image": "https://via.placeholder.com/150",
            "description": "Standard paper labels.",
            "subproducts": [
              {
                "id": 40001,
                "name": "Glossy Paper Labels",
                "description": "Glossy paper labels."
              },
              {
                "id": 40002,
                "name": "Matte Paper Labels",
                "description": "Matte paper labels."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "Clothing & Bags",
    "image": "https://via.placeholder.com/150",
    "description": "Custom clothing and bags for branding and giveaways.",
    "subcategories": [
      {
        "id": 501,
        "name": "T-Shirts",
        "image": "https://via.placeholder.com/150",
        "description": "High-quality custom t-shirts.",
        "products": [
          {
            "id": 5001,
            "name": "Standard T-Shirts",
            "image": "https://via.placeholder.com/150",
            "description": "Standard t-shirts with custom prints.",
            "subproducts": [
              {
                "id": 50001,
                "name": "Cotton T-Shirt",
                "description": "100% cotton t-shirt."
              },
              {
                "id": 50002,
                "name": "Polyester T-Shirt",
                "description": "100% polyester t-shirt."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "name": "Promotional Products",
    "image": "https://via.placeholder.com/150",
    "description": "Custom promotional products for branding and giveaways.",
    "subcategories": [
      {
        "id": 601,
        "name": "Pens",
        "image": "https://via.placeholder.com/150",
        "description": "Custom pens for promotional use.",
        "products": [
          {
            "id": 6001,
            "name": "Standard Pens",
            "image": "https://via.placeholder.com/150",
            "description": "Standard pens with custom prints.",
            "subproducts": [
              {
                "id": 60001,
                "name": "Plastic Pen",
                "description": "Custom plastic pen."
              },
              {
                "id": 60002,
                "name": "Metal Pen",
                "description": "Custom metal pen."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 7,
    "name": "Invitations, Gifts & Stationery",
    "image": "https://via.placeholder.com/150",
    "description": "Custom invitations, gifts, and stationery.",
    "subcategories": [
      {
        "id": 701,
        "name": "Wedding Invitations",
        "image": "https://via.placeholder.com/150",
        "description": "Beautiful custom wedding invitations.",
        "products": [
          {
            "id": 7001,
            "name": "Standard Wedding Invitations",
            "image": "https://via.placeholder.com/150",
            "description": "Standard wedding invitations with custom designs.",
            "subproducts": [
              {
                "id": 70001,
                "name": "Classic Wedding Invitation",
                "description": "Classic style wedding invitation."
              },
              {
                "id": 70002,
                "name": "Modern Wedding Invitation",
                "description": "Modern style wedding invitation."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "Deals",
    "image": "https://via.placeholder.com/150",
    "description": "Special deals on various products.",
    "subcategories": [
      {
        "id": 801,
        "name": "Limited Time Offers",
        "image": "https://via.placeholder.com/150",
        "description": "Exclusive limited-time offers.",
        "products": [
          {
            "id": 8001,
            "name": "Discounted",
            "image": "https://via.placeholder.com/150",
            "description": "Special discounts on business cards.",
            "subproducts": [
              {
                "id": 80001,
                "name": "14pt Matte",
                "description": "Discounted 14pt matte business cards."
              },
              {
                "id": 80002,
                "name": "16pt Glossy",
                "description": "Discounted 16pt glossy business cards."
              }
            ]
          }
        ]
      }
    ]
  }
];

export default categories;
