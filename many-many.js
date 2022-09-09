const db = require('./models')

async function createToy() {
    try {
      // First, get a reference to a pet.
      const [pet, petCreated] = await db.pet.findOrCreate({
        where: {
          name: "Silly May",
          species: "Mini Aussie",
          userId: 2
        }
      })
  
      // Second, get a reference to a toy.
      const [toy, toyCreated] = await db.toy.findOrCreate({
        where: { type: "stinky bear", color: "brown" }
      })
  
      // Finally, use the "addModel" method to attach one model to another model.
      await pet.addToy(toy) // increment the join table pets_toys
      console.log(`${toy.type} added to ${pet.name}.`);
  
    } catch (error) {
      console.log(error)
    }
  }
  
//   createToy()

async function readToy() {
    try {
      // find a toy
      const toy = await db.toy.findOne({
        where: { type: "stinky bear" }
      })
  
      const pets = await toy.getPets()
      console.log(`${pets.length} pet(s) loves the ${toy.color, toy.type}.`);
      //   console.log(pets)
      pets.forEach(pet => {
        console.log(`${pet.name} who is a ${pet.species} loves the ${toy.type}`)
      })
    } catch (error) {
      console.log(error)
    }
  }
  
//   readToy()

async function readPet() {
    try {
      // find a pet
      const pet = await db.pet.findOne({
        where: { name: "Silly May" }
      })
      // ask the pet what their toys are
      const toys = await pet.getToys()
      
      // loop over the array of toys that the pet has
      toys.forEach(toy => {
        console.log(`${pet.name} loves their ${toy.color} ${toy.type}.`);
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  // readPet()

// this works becuase pet has been associated with users and toys 
async function eagerLoad() {
  try {
    // find a pet
    const pet = await db.pet.findOne({
      where: {
        name: "Silly May"
      },
      include: [db.user, db.toy]
    })
    
    pet.toys.forEach(toy => {
      console.log(`${pet.user.firstName}'s pet ${pet.name} loves their ${toy.color} ${toy.type}.`);
    })
  } catch (error) {
    console.log(error)
  }
}

// eagerLoad()

const findUserEager = async () => {
  try {
    const user = await db.user.findOne({
      where: { 
        firstName: 'April'
      },
      include: [{
        model: db.pet, // include pets with the user
        include: [db.toy] // include toys in the pets
      }]
    })

    user.pets.forEach(pet => {
      console.log(`${user.firstName} owns a ${pet.name}`)
      // pets will have the toys nested in them
      pet.toys.forEach(toy => {
        console.log(`${pet.name} loves their ${toy.type}`)
      })
    })
  } catch (err) {
    console.log(err)
  }
}

findUserEager()

// TOY instance methods

// toy.getPets()
// toy.countPets()
// toy.hasPet()
// toy.hasPets()
// toy.setPets()
// toy.addPet()
// toy.addPets()
// toy.removePet()
// toy.removePets()
// toy.createPet()

// PET instance methods

// pet.getToys()
// pet.countToys()
// pet.hasToy()
// pet.hasToys()
// pet.setToys()
// pet.addToy()
// pet.addToys()
// pet.removeToy()
// pet.removeToys()
// pet.createToy()