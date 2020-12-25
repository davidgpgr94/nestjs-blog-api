# Blog Api
---
## ToDo

- [x] Hacer las validaciones y usar los pipes para las validaciones.
- [x] Terminar de hacer el controller de los posts
- [ ] Hacer la parte de los usuarios (login, jwt, roles...)
- [ ] Añadir Guard para que solo un usuario autenticado (con jwt) pueda crear un post.
- [ ] Relacionar post con su author
- [ ] Añadir Guard para que solo el autor o un admin pueda editar un post
- [ ] Añadir un modulo de admin para gestionar los usuarios (controlador para añadir nuevos admins)
- [ ] Crear submodulo Comentarios dentro de los posts.
- [ ] Relacionar los comentarios con los posts
- [ ] Añadir Guard para que solo un usuario autenticado (con jwt) pueda crear un comentario
- [ ] Añadir Guard para que solo el autor o un admin pueda eliminar un comentario
- [ ] Dar la opción de subir documentos/imagenes a un post
---


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
