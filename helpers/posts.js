const express = require('express')
const { faker } = require('@faker-js/faker');


const generatePost = () => {
    const post = {
        title: faker.lorem.words(6),
        body: faker.lorem.sentence(100),
        userName: faker.internet.userName(),
        restaurant: {
            name: faker.lorem.words(2),
            city: randomCity()
        },
        tags: randomTags(),
        image: faker.image.food(640, 480, true)

    }
    return post
}

function randomCity() {
    const provinces = ['Buenos Aires', 'Córdoba', 'Misiones', 'Mendoza', 'Santa Fe', 'Entre Ríos', 'San Luis', 'San Juan', 'Santa Cruz', 'Río Negro', 'Chubut', 'La Rioja', 'Catamarca', 'La Pampa', 'Santiago del Estero', 'Corrientes', 'Tucumán', 'Neuquén', 'Salta', 'Chaco', 'Formosa', 'Jujuy', 'Tierra del Fuego']
    return provinces[Math.floor(Math.random() * provinces.length)]
}

function randomTags() {
    const tags = ['Comida mexica', 'Fast Food', 'Gourmet', 'Buffet', 'Take Away', 'Parrilla', 'Pizzeria', 'Vegetariano', 'Vegano']
    return tags[Math.floor(Math.random() * tags.length)]
}

module.exports = {
    generatePost
}

