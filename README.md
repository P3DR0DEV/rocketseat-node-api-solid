# App

Gympass Style App

## RF's

- [X] Deve ser possível se cadastrar.
- [X] Deve ser possível se autenticar.
- [X] Deve ser possível obter o perfil de um usuário logado.
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado.
- [X] Deve ser possível o usuário obter o seu histórico de check-ins.
- [X] Deve ser possível o usuário buscar academias próximas (até 10km).
- [X] Deve ser possível o usuário buscar academias pelo nome.
- [X] Deve ser possível o usuário realizar check-in em uma academia.
- [X] Deve ser possível validar o check-in de um usuário.
- [X] Deve ser possível cadastrar uma academia.

## RN's

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado.
- [X] O usuário não pode fazer 2 check-ins no mesmo dia.
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia.
- [X] O check-in só pode ser validado até 20min após criado.
- [ ] O check-in só pode ser validado por administradores.
- [ ] A academia só pode ser cadastrada por administradores.


## RNF's

- [X] A senha do usuário deve ser criptografada.
- [X] O usuário deve ser autenticado com o e-mail e senha.
- [X] Os dados da aplicação devem ser armazenados em um banco de dados PostgreSQL.
- [X] Todas listas de dados precisam ser paginadas com 20 itens por página.
- [ ] O usuário deve ser identificado por um token JWT.