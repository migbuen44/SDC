const router = require('express').Router();

module.exports = router;


const Product = {
	id: int,
	campus: text,
	name: text,
	slogan: text,
	category: text,
	default_price: int,
	created_at: date,
	updated_at: date,
	features: text,
	Styles: [
		{
      name: text,
      original_price: int,
      sale_price: int,
      default?: boolean,
      size: {
        id: int,
        quantity: int,
        sku: int
      },
      photos: {
        thumbnail_url: varchar,
        url: varchar
      }
    },
  ],
  Reviews: [
    {
      id: int,
      rating: int,
      summary: text,
      recommend: boolean,
      response: text,
      body: text,
      date: date,
      reviewer_name: text,
      helpfulness: boolean,
      characteristics: [
        {
        id: int,
        characteristics: text,
        value: int
        }
      ],
    }
  },
  Questions: [
    {
      id: int,
      questions_body: text,
      question_dat: date,
      question_helpfulness: boolean,
      answers: [{
        id: int,
        body: text,
        answerer_name: text,
        helpfulness: boolean
      }]
    }
  ]
}






const Product = {
	id: int,
	campus: text,
	name: text,
	slogan: text,
	category: text,
	default_price: int,
	created_at: date,
	updated_at: date,
	features: text,
	Styles: {
    id: {
      name: text,
      original_price: int,
      sale_price: int,
      default?: boolean,
      size: {
        id: int,
        quantity: int,
        sku: int
      },
      photos: {
        thumbnail_url: varchar,
        url: varchar
      }
    }
  },
  Reviews: {
    id: {
      id: int,
      rating: int,
      summary: text,
      recommend: boolean,
      response: text,
      body: text,
      date: date,
      reviewer_name: text,
      helpfulness: boolean,
      characteristics: {
        id  {
          characteristics: text,
          value: int
        }
      }
    }
  },
  Questions: {
    id: {
      questions_body: text,
      question_dat: date,
      question_helpfulness: boolean,
      answers: [{
        id: int,
        body: text,
        answerer_name: text,
        helpfulness: boolean
      }]
    }
  }
}