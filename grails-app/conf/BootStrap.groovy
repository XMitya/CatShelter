import catshelter.Breed
import catshelter.Cat
import catshelter.Coat
import grails.util.Environment

class BootStrap {

    def init = { servletContext ->
        if (!Coat.count()) {
            // adding default items if they does not exist
            def hairless = new Coat(type: "Hairless").save()
            new Coat(type: "Short").save()
            new Coat(type: "Semi-long").save()
            new Coat(type: "Long").save()

            // create some test data
            if (Environment.current == Environment.DEVELOPMENT ||
                    Environment.current == Environment.TEST) {
                def sphincs = new Breed(breedName: "Sphincs").save()

                new Cat(name: 'Jack', coat: hairless,
                        breed: sphincs, arrivalDate: new Date()).save()
            }
        }
    }
    def destroy = {
    }
}
