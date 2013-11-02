package catshelter

class Cat {

    String name
    Breed breed
    Coat coat
    Date arrivalDate

    static constraints = {
        name unique: false, nullable: true, size: 1..30, blank: false
        breed nullable: true, unique: false
        coat unique: false, nullable: true
        arrivalDate unique: false, nullable: false
    }
}
