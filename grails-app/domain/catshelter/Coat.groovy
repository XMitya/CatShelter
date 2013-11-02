package catshelter

class Coat {

    String type

    static constraints = {
        type unique: true, nullable: false, blank: false, size: 1..30
    }

    String toString() {
        type
    }
}
