package catshelter

import org.codehaus.groovy.grails.web.json.JSONObject

class CatService {

    def listCats() {
        Cat.list()
    }

    def saveCat(Cat cat) {
        if (cat) {
            // automatically set arrival date
            if (!cat.arrivalDate) {
                cat.arrivalDate = new Date()
            }
            // if no selected breed - create a new one
            if (!cat.breed.id) {
                cat.breed = cat.breed.save()
            }
            if (cat.validate()) {
                // we may want update it instead of creating a new one
                if (cat.id) {
                    def currentCat = Cat.findById(cat.id)
                    if (currentCat) {
                        currentCat.setProperties(cat.properties)
                        cat = currentCat
                    }
                }
                return cat.save()
            } else {
                // todo add behavior
            }
        }
    }

    def getCat(long id) {
        Cat.findById(id)
    }

    def deleteCat(Cat cat) {
        if (cat) {
            def toDel = Cat.findById(cat.id)
            toDel?.delete()
        }
    }

    def buildCatFromJsonObject(JSONObject jsonObject) {
        def cat = new Cat(jsonObject as Map)
        def coat = new Coat(jsonObject.coat as Map)
        def breed = new Breed(jsonObject.breed as Map)

        if (jsonObject?.id) {
            cat.id = jsonObject?.id as long
        }

        coat.id = jsonObject?.coat?.id as long
        if (jsonObject?.breed?.id) {
            breed.id = jsonObject?.breed?.id as long
        }

        cat.coat = coat
        cat.breed = breed
        cat
    }
}
