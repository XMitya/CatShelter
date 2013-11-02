package catshelter

import grails.converters.JSON

class BreedController {

    static scaffold = true

    def index() {}

    def listApi() {
        render Breed.list() as JSON
    }
}
