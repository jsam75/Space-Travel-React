import SpaceTravelApi from './spaceTravelApi.js';

async function getPlanets () {
    return SpaceTravelApi.getPlanets();
}

async function getSpacecrafts() {
    try {
        const response = await SpaceTravelApi.getSpacecrafts();

    if (response.isError) {
        return response;
    }

        const raw = response.data;
        const list = 
        Array.isArray(raw) ? raw :
        Array.isArray(raw?.spacecrafts) ? raw.spacecrafts :
        Array.isArray(raw?.data) ? raw.data :
        [];

        return {isError: false, data: list };

    } catch (error) {
        console.log("getSpacecrafts threw error:", error);
        return {isError: true, data: error};
    }
}

async function getSpacecraftById(id) {
    try {
        const response = await SpaceTravelApi.getSpacecraftById({ id });
        return response;
    } catch (error) {
        console.log("getSpacecraftById threw error:", error);
        return {isError: true, data: error};
    }

      
}
async function buildSpacecraft(payload) {
        try {
            const safePayload = payload?.payload ?? payload ?? {};

            const {
                name = "",
                capacity = "",
                description = "",
                pictureUrl = undefined,
            } = safePayload;

            const apiPayload = {
                name,
                capacity,
                description,
                pictureUrl,
            };

        const response =  await SpaceTravelApi.buildSpacecraft(apiPayload);

         console.log("BUILD API RESPONSE:", response);

        if (response.isError)
            return response;

        const createdId = response.data?.id;
        if (!createdId) {
            return {isError: true, data: "Build succeeded but no ID returned."};
        }

        const created = {
            id: createdId,
            currentLocation: response.data?.currentLocation ?? null,
            ...apiPayload,
        }

        return { isError: false, data: created };
           
    } catch (error) {
        console.log("buildSpacecraft threw error:", error);
        return {isError: true, data: error};
        }
    }

 
export default {
    getPlanets,
    getSpacecrafts,
    getSpacecraftById,
    buildSpacecraft,
};

/*Notes:

General Architecture-

This file is part of the service layer that performs API calls.  Ideally, this file is the single
gateway for all backend communication, which prevents other pages or components from
calling the API directly and centralizes asynchronous logic, error handling, and response 
formatting in one place.  

Centralizing API calls improves the separation of concerns, reduces duplicated logic and 
inconsistent error handling across the app.

In this project, the mock API does more than just return data. It was more of an entire backend
that also returned business logic. As a result, the API interaction was broken up into 2 files:
spaceTravelService,js and App.jsx.

Because this is a plain JS file, React hooks cannot be used here.  (So, no useEffect for managing
side effects and act as a clean up function for API calls)
Instead, the service layer calls the functions from the mock API/backend and may optionally format
or normalize data before passing it into the app.

In this project, the response structure is already defined by the mock API, so minimal formatting
is needed.

"Mock APIs vs Real Backends- Getting the Best of Both Worlds"
https://www.confluent.io/blog/choosing-between-mock-api-and-real-backend/

"API Mocking vs API Stubbing: What's the Difference and When to Use Each"
https://www.gravitee.io/blog/api-mocking-vs-api-stubbing-differences

"Why You Need an API Layer and How to Build It in React"
https://semaphore.io/blog/api-layer-react

"React Project Structure For Scale: Decomposition, Layers and Hierarchy"
https://www.developerway.com/posts/react-project-structure



*/
