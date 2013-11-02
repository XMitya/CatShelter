package catshelter

import grails.converters.JSON

class CatController {

    def catService

    def index() {
        redirect(action: "list")
    }

    def listApi() {
        def cats = catService.listCats()

        JSON.use('deep')
        render cats as JSON
    }

    def list() {

    }

    def loadCatApi() {
        def catId = params.catId
        if (catId) {
            def cat = catService.getCat(catId as long);
            JSON.use('deep')
            render cat as JSON
        } else {
            render "{}"
        }

    }

    def edit() {
        flash.titleAction = "editing"
        def catId = params.id
        if (catId) {
            def cat = catService.getCat(catId as long)
            if (cat) {
                render (view: "edit")
            } else {
                redirect(action: "add")
            }
        } else {
            redirect(action: "add")
        }
    }

    def add() {
        flash.titleAction = "adding"
        render(view: "edit")
    }

    def saveApi() {
        def jsonObject = request.JSON
        def cat = catService.buildCatFromJsonObject(jsonObject)
        catService.saveCat(cat)
        // todo render error or success
        render "{}"
    }

    def deleteApi() {
        def jsonObject = request.JSON
        def cat = catService.buildCatFromJsonObject(jsonObject)
        catService.deleteCat(cat)
        render "{}"
    }
}
