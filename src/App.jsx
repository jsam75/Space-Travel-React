import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Nav from './components/Nav/Nav';
import AppRoutes from './routes/AppRoutes';
import SpaceTravelMockApi from './services/SpaceTravelMockApi';

export default function App() {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [error, setError] = useState(null);

  const [lastSend, setLastSend] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    refreshAll();
     }, []);

    useEffect(() => {
      setError(null);
      }, [location.pathname]);
  
  const DEBUG = import.meta.env.DEV;
  async function refreshAll() {
    setIsLoading(true);
    setError(null);

    try {
    const planetRes = await SpaceTravelMockApi.getPlanets();
    if (planetRes.isError) {
      setError(planetRes.data);
      return;
    }
  

    const scResp = await SpaceTravelMockApi.getSpacecrafts();
    if (scResp.isError) {
      setError(scResp.data);
      return;
    }

    setPlanets(planetRes.data);
    setSpacecrafts(scResp.data);

  
   if (DEBUG) {
    console.log("PLANETS AFTER REFRESH:", planetRes.data.map(p => ({
    id: p.id, pop: p.currentPopulation}))
  );

   console.log("SPACECRAFT AFTER REFRESH:", scResp.data.map(sc => ({
   id: sc.id, loc: sc.currentLocation}))
  );
    
  if (lastSend) {
  const sc = scResp.data.find(
    s => String(s.id) === String(lastSend.spacecraftId)
  );
  console.log("LAST SEND CHECK:", lastSend, "=> spacecraft now:", sc?.currentLocation);
  }
}

    } finally {
      setIsLoading(false);
    }
 
}

async function handleDestroySpacecraft(id) {
    setError(null);

    const destroyResp = await SpaceTravelMockApi.destroySpacecraftById({ id });
    if (destroyResp.isError) {
      setError(destroyResp.data);
      return;
    }

    setSpacecrafts((prev) => 
      prev.filter((sc) => sc.id !== id));
    

    await refreshAll();

  }

  async function handleSendSpacecraftToPlanet(spacecraftId, targetPlanetId) {
    setError(null);

    const  targetIdNum = Number(targetPlanetId);
    setLastSend({ spacecraftId, targetPlanetId: targetIdNum });

    if (DEBUG) {
      console.log("SEND CALLED:", {
        spacecraftId, 
        targetPlanetId, 
        type: typeof targetIdNum});
    }

    
    const sendResp = await SpaceTravelMockApi.sendSpacecraftToPlanet({
      spacecraftId, 
      targetPlanetId: targetIdNum,
    });

    if (DEBUG) console.log("SEND RESPONSE:", sendResp);

    if (sendResp.isError) {
      setError(sendResp.data);
      return;
    }

    await refreshAll();

  }
  
 return (
  
   <div>
      
      <Nav />

      {error && <p className="error">Error: {String(error)}</p>}

       <AppRoutes
       planets={planets}
       spacecrafts={spacecrafts}
       onDestroySpacecraft={handleDestroySpacecraft}
       onSendSpacecraftToPlanet={handleSendSpacecraftToPlanet}
       onRefreshAll={refreshAll}
       error={error}
       isLoading={isLoading}
        />
                
   </div>

  );
}

/*Notes:
Refer to spaceTravelService.js

General Architecture-
This file serves as the root component and central orchestration layer for the app.  
State lives here and coordinates how data and handler functions are passed into the app.

App.jsx uses useEffect to perform side effects of external interactions 
(data fetching, subscriptions and DOM manipulation) and clean up functions.  This keeps
the application state synchronized with external data sources.

Ideally, this file would not have direct communication with the backend and would rely on the
service layer.  However, due to the size of this project and the design of the backend, a hybrid
structure was used allowing App.jsx to directly call backend functions while coordinating
shared state. 
(In large apps, can "siphon off" side effect logic into a custom hook file. Want to avoid
App.jsx becoming a "god file", so different techniques can be used to break up state or 
other logic for modularity/debugging purposes)

The refreshAll() function was needed in multiple parts of the app, so it was pushed up to 
this file (lifted state).  This ensures that updates to spacecraft or planets are reflected 
consistently without having to manually refresh the page.

*/

