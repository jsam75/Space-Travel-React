# Space Travel App
This app is for users to evacuate Earth and go to other planets.  They can find planets, build spacecrafts, assign seating capacities, send the spacecraft to planets and remove them from planets.

# Features
Find a planet, build & name spacecraft, assign seating capacity, destroy spacecraft.  Note: nobody dies in this app.  When a spacecraft is destroyed, the population remains the same.

# Project Structure
## Folder Structure
src/
-components/                            #reusable components for UI
    -Loading/                           #Loading spinner
        -Loading.jsx                    #Loading component logic
        -Loading.module.css             #Loading styles
    -Nav/                               #Navigation Bar
        -Nav.jsx                        #Navigation component logic
        -Nav.module.css                 #Navigation styles
    -PlanetCard/                        #Planet display for each
        -PlanetCard.jsx                 #Planet display logic
        -PlanetCard.module.css          #Planet card styles
    -SpacecraftCard/                    #Spacecraft display for each type
        -SpacecraftCard.jsx             #Spacecraft display logic
        -SpacecraftCard.module.css      #Spacecraft styles
-pages/                                 #Top level UI/UX pages
    -ConstructionPage/                  #Under-construction          
        -ConstructionPage.jsx           #Construction page component
        -ConstructionPage.module.css    #Construction styles
    -HomePage/                          #Landing Page
        -HomePage.jsx                   #Home page component
        -HomePage.module.css            #Home page styles
    -NotFoundRedirect/                  #Not Found/404 handler
        -NotFoundRedirect.jsx           #NotFound logic
    -PlanetsPage/                       #List of all planets
        -PlanetsPage.jsx                #Planets page component
        -PlanetsPage.module.css         #Planets page styles
    -SpacecraftPage/                    #Single spacecraft page
        -SpacecraftPage.jsx             #Spacecraft details page
        -SpacecraftPage.module.css      #Spacecraft styes
    -SpacecraftsPage/                   #List of all spacecrafts (plural)
        -SpacecraftsPage.jsx            #List of all spacecrafts component
        -SpacecraftsPage.module.css     #Spacecrafts page styles
-routes/                                #React Router configuration
    -AppRoutes.jsx                      #Defines app routes
-services/                              #API layer
    -spaceTravelApi.js                  #Service layer/ACL
    -spaceTravelMockApi.js              #API (given in assignment)
    -spaceTravelService.js              #Mock API (given- do not alter)
-App.jsx/                               #Root application component (renders)
-main.jsx                               #React app entry point 

Researched diagrams and started down the path of Mermaid, but way too complex right now. Read it is acceptable to write diagram manually.  After doing this, I further read that it can be created from command line: tree src /F  Will try this next time.

## Sources
Due to file connectivity, there are sources cited in some of the files. The ones cited were used in addition to class videos/notes, MDN docs and/or other sources recommended in tutorials.
All the extra CSS sources are cited in the Nav.module.css.  In other files, I tried to give cross references and/or any file relevant information.