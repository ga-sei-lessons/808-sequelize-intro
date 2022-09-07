const db = require('./models')

//db.user.sequelizeMethod()

const userCRUD = async () => {
    try {
        // CREATE
        // const newUser = await db.user.create({
        //     firstName: 'April',
        //     lastName: 'Gonzales',
        //     age: 30,
        //     email: 'a@g.com'
        // })
        // console.log(newUser)
        // READ
        // const allUsers = await db.user.findAll() // find everyone
        // const someUsers = await db.user.findAll({
        //     where: {
        //         // can search for any field from the model
        //         firstName: 'April'
        //     }
        // })

        // find or create
        // array destructuring syntax
        // user = array[0] -- the user that is found or created
        // created = array[1] -- a bool of whether the user was created (true = created, false = found)
        const [user, created] = await db.user.findOrCreate({
            where: {
                // what we are searching for
                firstName: 'Weston'
            }, 
            // data to add if we are creating
            defaults: {
                lastName: 'Bailey',
                age: 35,
                email: 'w@b.com'
            }
        })

        console.log(user)
        console.log(`the user was created: ${created}`)

        // console.log(someUsers)
        // UPDATE
        // updates return the number of rows that were changed
        // db.model.update({ what to change }, { where: { where clause } })
        // const numRowsChanged = await db.user.update({ email: 'newEmail@b.com' }, { 
        //     where: {
        //         firstName: 'Weston'
        //     }
        // })
        // console.log(numRowsChanged)
        // DESTROY
        const numRowsDeleted = await db.user.destroy({
            where: {
                firstName: 'Weston'
            }
        })
        console.log(numRowsDeleted)
    } catch(err) {
        console.warn(err)
    }
}

// dont forget to invoke
userCRUD()