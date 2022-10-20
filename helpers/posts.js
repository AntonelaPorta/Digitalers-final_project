const express = require('express')
const { faker } = require('@faker-js/faker');


generatePost = () => {
    const post = {
        title: faker.lorem.words(6),
        body: faker.lorem.sentence(12),
    }

    return post
}

module.exports = {
    generatePost
}
