package catshelter

import grails.converters.JSON

class CoatController {

    static scaffold = true

    def index() {}

    def listApi() {
        def coats = Coat.list()
        render coats as JSON
    }
}
