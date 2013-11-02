package catshelter

class Breed {

    String breedName

    static constraints = {
        breedName size: 1..30, nullable: false, blank: false, unique: true
    }

    String toString() {
        breedName
    }
}
