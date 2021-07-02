import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.post('create', 'UsersController.create')
    Route.get('all', 'UsersController.index')
    Route.get('/:id', 'UsersController.show').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })
    Route.put('/:id', 'UsersController.update').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })

    Route.delete('/:id', 'UsersController.destroy').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })
  }).prefix('/user')
  Route.post('login', 'LoginController.login')

  Route.group(() => {
    Route.post('create', 'ProfilesController.create')
    Route.get('all', 'ProfilesController.index')
    Route.get('/:id', 'ProfilesController.show').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })
    Route.put('/:id', 'ProfilesController.update').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })

    Route.delete('/:id', 'ProfilesController.destroy').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })
  }).prefix('/profile')
}).prefix('/api')
