# SDC

**Version1.0.0**

SDC is a legacy API meant to serve a product page web app. This project was created during my tenoir at Hack Reactor(coding bootcamp). Three other engineers and myself contributed to the creation of routes, library functions,  and data treatment processes in this project.

## Installation

1. Fork repository into local machine

2. Perform bash commands

### Install packages


    npm install


### Run app


    npm start


> Server should be running on port 3001.

## Features
1. Routes to handle products page's four widget sections
  - Current Product and info
  - Related Items
  - Questions and Answers
  - Ratings and Reviews

# SDC API

## Root URL

`http://localhost:3001/api`

## Get questions

### Request

`GET /qa/questions?product_id=<id>`

    http://localhost:3001/api/qa/questions?product_id=3

### Response

```json
[
    {
        "id": 16,
        "product_id": 3,
        "body": "How long does it last?",
        "date_written": "1596386728488",
        "name": "funnygirl",
        "email": "first.last@gmail.com",
        "reported": 0,
        "helpfulness": 0
    }
]
```

## Add question

### Request

`POST /qa/questions`

    http://localhost:3001/api/qa/questions

`Body`
```json
{
    "product_id": 3,
    "body": "Is it good?",
    "name": "random_user",
    "email": "random_user@gmail.com"
}
```

### Response

    Status: 200 OK

## Get answers

### Request

`GET /qa/questions/<question_id>/answers`

    http://localhost:3001/api/qa/questions/2/answers

### Response

```json
[
    {
        "id": 30,
        "question_id": 2,
        "body": "Its a rubber sole",
        "date_written": "1616293796317",
        "name": "dschulman",
        "email": "first.last@gmail.com",
        "reported": 0,
        "helpfulness": 2,
        "photos": [
            {
                "url": "https://images.unsplash.com/photo-1528318269466-69d920af5dad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            }
        ]
    },
]
```

## Add answer

### Request

`POST /qa/questions`

    http://localhost:3001/api/qa/questions

`Body`
```json
{
    "body": "It fits well",
    "name": "random_user",
    "email": "random_user@gmail.com",
    "photos": ["photo_url.com"]
}
```

### Response

    Status: 200 OK

## Mark question helpful

### Request

`PUT /qa/questions/<question_id>/helpful`

    http://localhost:3001/api/qa/questions/2/helpful

### Response

    Status: 200 OK

## Mark answer helpful

### Request

`PUT /qa/answers/<answer_id>/helpful`

    http://localhost:3001/api/qa/answers/2/helpful

### Response

    Status: 200 OK

## Report question

### Request

`PUT /qa/questions/<question_id>/report`

    http://localhost:3001/api/qa/questions/2/report

### Response

    Status: 200 OK

## Report answer

### Request

`PUT /qa/answers/<answer_id>/report`

    http://localhost:3001/api/qa/answers/2/report

### Response

    Status: 200 OK

## Get initital list of products

### Request

`GET /products`

    http://localhost:3001/api/products

### Response

```json
[
    {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140"
    }
]
```

## Get related products with info

### Request

`GET /related/products/<productId>`

    http://localhost:3001/api/related/products/3

### Response

```json
[
    {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": "40",
        "thumbnail_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
    }
]
```

## Get specific product info

### Request

`GET /products/<product_id>`

    http://localhost:3001/api/products/3

### Response

```json
{
    "id": 3,
    "name": "Morning Joggers",
    "slogan": "Make yourself a morning person",
    "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
    "category": "Pants",
    "default_price": "40",
    "thumbnail_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "features": [
        {
            "feature": "Fabric",
            "value": "100% Cotton"
        },
        {
            "feature": "Cut",
            "value": "Skinny"
        }
    ]
}
```

## Get specific product styles info

## Request

`GET /products/<product_id>/styles`

    http://localhost:3001/api/products/3/styles

## Response

```json
{
    "product_id": "3",
    "results": [
      {
            "style_id": 16,
            "name": "White",
            "original_price": 40,
            "sale_price": null,
            "default?": false,
            "photos": [
                {
                    "thumbnail_url": "https://images.unsplash.com/photo-1510390099355-23e690d8129d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                    "url": "https://images.unsplash.com/photo-1510390099355-23e690d8129d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                }
            ],
            "skus": {
                "72": {
                    "quantity": 6,
                    "size": "XXL"
                }
            }
        }
    ]
}
```

## Get specific product related ids

### Request

`GET /products/<product_id>/related`

    http://localhost:3001/api/products/3/related

### Response

```json
[
    5,
    9,
    7,
    2,
    1
]
```

## Get specific product reviews

### Request

`GET /reviews/<product_id>`

    http://localhost:3001/api/reviews/1

### Response

```json
[
    {
        "product_id": 1,
        "rating": 5,
        "date": "1596080481467",
        "summary": "This product was great!",
        "body": "I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",
        "recommend": true,
        "reported": false,
        "reviewer_name": "funtime",
        "reviewer_email": "first.last@gmail.com",
        "response": "null",
        "helpfulness": 8,
        "id": 1,
        "photos": []
    }
]
```

## Mark review helpful

### Request

`PUT /reviews/<review_id>/helpful`

    http://localhost:3001/api/reviews/1/helpful

### Response

    Status: 200 OK

## Report review

### Request

`PUT /reviews/<review_id>/report`

    http://localhost:3001/api/reviews/1/report

### Response

    Status: 200 OK






























