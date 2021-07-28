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

  Route.group(() => {
    Route.post('create', 'CategoriesController.create')
    Route.get('all', 'CategoriesController.index')
    Route.get('/:id', 'CategoriesController.show').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })
    Route.put('/:id', 'CategoriesController.update').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })

    Route.delete('/:id', 'CategoriesController.destroy').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })
  }).prefix('/category')

  Route.group(() => {
    Route.post('create', 'AddressesController.create')
    Route.get('all', 'AddressesController.index')
    Route.get('/:id', 'AddressesController.show').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })
    Route.put('/:id', 'AddressesController.update').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })

    Route.delete('/:id', 'AddressesController.destroy').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })
  }).prefix('/address')
}).prefix('/api')
