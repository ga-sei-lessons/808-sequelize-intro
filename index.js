const db = require("./models")

async function newPet() {
    try {
      // literally just find the first user
      const user = await db.user.findOne()
      // now that we found them, lets give them a pet!
      const newPet = await user.createPet({
        name: 'Sugar Belle',
        species: 'Beautiful beast'
      })
      // look at the dog!!!
      console.log(newPet)
    } catch (error) {
      console.log(error)
    }
  }
// don't forget to invoke your function
// newPet()

async function printPets() {
    try {
      // literally just find the first user
      const user = await db.user.findOne()
      // get thier pets!
      const pets = await user.getPets()
      // now that we got them, lets do something with thier them a pets!
      pets.forEach(pet=>{
        console.log(`${user.firstName}'s pets:`, pet.name)
    })
    } catch (error) {
      console.log(error)
    }
}
// printPets()

async function associatePets() {
    try {
      // lets make this pet!
      const options = {
        where: {
          name: 'Simba',
          species: 'Ginger Cat'
        },
        defaults: {
          description: 'Traumatised by a very jealous toy aussie, Simba is very cute but rarely comes out to play'
        }
      }
      // remember that wierd 'array destructuring' thing with findorCreate?
      const [pet, created] = await db.pet.findOrCreate(options)
      // lets find a user and give them this pet
      // to get a specific user, use the wqhere c lause and give it identifying information
      const user = await db.user.findOne()
      // you get a pet!
      await user.addPet(pet);
      console.log('User ' + user.firstName + ' is the owner of ' + pet.name);
  
    } catch (error) {
      console.log(error)
    }
  }
// associatePets()

async function eagerBeaver() {
    try {
      // find everyone!
      const users = await db.user.findAll({
        include: [db.pet]
      })
      // users will have a .pets key with an array of pets
      users.forEach(user=>{
        console.log(`${user.firstName}'s pets:`)
        // nested forEach! 
        user.pets.forEach(pet=>{
            console.log(pet.name)
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
// eagerBeaver()