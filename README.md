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

`POST /qa/questions/<question_id>/answers`

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




