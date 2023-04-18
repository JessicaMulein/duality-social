React, Node, Typescript

Note, this is in the break-the-world branch and is now the default branch.
The old code is still present in the main branch

- Upstream: https://github.com/Digital-Defiance/duality-social/tree/main
- Downstream: https://github.com/JessicaMulein/duality-social/tree/main
- Keybase:  keybase://team/digitaldefiance/duality-social

## Getting Started

### Prerequisites

#### Software

- Visual Studio Code [https://code.visualstudio.com/](https://code.visualstudio.com/)
  - We make use of Visual Studio Devcontainers, which are built on Docker
  - The app is currently running in a Debian Bullseye container with Node 20
- Docker [https://www.docker.com/](https://www.docker.com/)
- Copy .devcontainer/.env.example to .devcontainer/.env and fill in the values
  - Some of the values are self-prophecying in that they will set up a database and user for you
  - Both Postgres and keycloak will self-initialize with whatever value you put here, but until you delete the containers, they will keep the same values

#### Steps

- Once you have opened the repository in Visual Studio Code, it may prompt you in the lower right to reopen in a container as it detected a devcontainer.json- Say no for now.
- Copy the .devcontainer/.env.example to .devcontainer/.env and fill in values, you can use yarn newSecret to generate secrets if you like, though what you pick for passwords is not super important in these local dev environments. In some cases those newSecret values are 1 character too long for postgres DB passwords and you may need to remove a character in those cases.
- In the lower left corner, left click the green >< icon and select "Reopen in Container" at the top middle of the window where it will drop down with a number of other options. The other option is to Ctrl + Shift + P and then type "reopen" and select the appropriate option.
- Once the container build appears to be done, type Ctrl + Shift + ` or click 'Terminal > New Terminal' in the menu. You should land on a zsh terminal as root.
- The first time (or every time you delete the postgres_data volume), from the devcontainer's zsh terminal, you'll need to run ```yarn postgres:db:setup``` from the workspace root.
- Also from the devcontainer's zsh terminal, run yarn vscode:create-settings
- From the new Keycloak admin page (http://localhost:28080), log in with the admin user/password in .env and then create a new realm called duality-social-dev.
- The maintainers of this repo have a SendGrid mail relay set up for duality.social and if you configure the realm email as noreply@duality.social and get an api key from sendgrid, you can fill in the mail details so that you can do registration test emails.
  - ![image](https://github.com/Digital-Defiance/duality-social/assets/3766240/06574dbc-0a9c-4dfd-831e-e32ef2879026)
- Configure a new client
  - ![image](https://github.com/Digital-Defiance/duality-social/assets/3766240/d0558c28-bc55-45f4-bba0-b9c49cb80f36)
  - ![image](https://github.com/Digital-Defiance/duality-social/assets/3766240/807c9938-4094-4115-a5d2-18a7f88c6e20)
  - ![image](https://github.com/Digital-Defiance/duality-social/assets/3766240/433fed58-e2b5-4692-83cf-a1c833cbeb74)
  - Save it and copy the resulting client id and secret to the .devcontainer/.env
    - ![image](https://github.com/Digital-Defiance/duality-social/assets/3766240/94bff1fc-abe6-4298-8960-222184bd985a)
    - Also regenerate the other token and copy that value to .env
      - ![image](https://github.com/Digital-Defiance/duality-social/assets/3766240/237c5a85-ee1d-4631-8d5e-b426750a5561)
    - Eventually, these values will be important and you'll need to restart docker (exit visual studio and reopen in the container) in order to get the .env changes into the app container, which is presently empty but will eventually listen on localhost:3000
  - Get the OAuth dev credentials off of github or add a new one for your local dev
    - ![image](https://github.com/Digital-Defiance/duality-social/assets/3766240/35937467-3206-4487-bee1-4b90e0c3504c)
    - ![image](https://github.com/Digital-Defiance/duality-social/assets/3766240/0f15f96a-9db3-4edf-9bca-647d74bed163)
    - Client ID: f7de3c338f0a2238597f
    - Start filling into Keycloak
      - ![image](https://github.com/Digital-Defiance/duality-social/assets/3766240/c3656eb5-a900-45fb-99fc-481d5cd03d61)
  - Run yarn build:react
  - Run yarn build:node

### Nx monorepo

This is a repository created with:
  ```npx create-nx-workspace@latest --packageManager yarn --preset ts --workspaceType integrated --nxCloud --style scss --appName duality-social --name duality-social duality-social```
