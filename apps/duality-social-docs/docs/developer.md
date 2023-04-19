# Duality Social Developer documentation

## Introduction

To run:
  ```CLIENT_ID=AAAA TENANT_ID=BBBB MSAL_CLIENT_SECRET=CCCC OPENAI_API_KEY=DDDD OPENAI_ORGANIZATION=EEEE EXPRESS_SESSION_SECRET=FFFF MONGO_URI=GGGG yarn serve```
Where:
- `AAAA` is the client ID of the Azure AD application, found in the Azure portal under the Container app's left column there is an Authentication section and the client ID is listed on the right once you click on it.
- `BBBB` is the tenant ID of the Azure AD application, found in the directory ID section of the Azure portal. There's a top menu there that lets you select the current tenant, and the directory ID is listed on the right once you click on it.
- `CCCC` is the client secret of the Azure AD application, found in the Azure portal under the Container app's left column there is an Authentication section and the client secret is listed on the right once you click on it. A & C are in the same general area.
- `DDDD` is the OpenAI API key, found in the OpenAI dashboard under the API keys section.
- `EEEE` is the OpenAI organization ID, found in the OpenAI dashboard under the Organizations section.
- `FFFF` is the express session secret, this can be any random string, we have a npm/yarn command you can run in the root, ```yarn newSecret``` that will generate a random string for you. This string will be used to encrypt the session cookie, changing it will log out any users in the current environment. This should match on all servers if there are multiple servers in the environment.
- `GGGG` is the MongoDB connection string, found in the MongoDB dashboard under the Connect section. This should match on all servers if there are multiple servers in the environment.
