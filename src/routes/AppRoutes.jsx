import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import SpacecraftsPage from '../pages/SpacecraftsPage/SpacecraftsPage';  //plural
import SpacecraftPage from '../pages/SpacecraftPage/SpacecraftPage';  //singular
import ConstructionPage from '../pages/ConstructionPage/ConstructionPage';
import PlanetsPage from '../pages/PlanetsPage/PlanetsPage';



export default function AppRoutes ({ 
    planets, 
    spacecrafts, 
    onDestroySpacecraft,
    onSendSpacecraftToPlanet, 
    onRefreshAll,
    error,
    isLoading
    }) {


    return (
    
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spacecrafts" element={
                <SpacecraftsPage 
                    spacecrafts={spacecrafts}
                    onDestroySpacecraft={onDestroySpacecraft}
                    error={error}
                />
                } 
                />
 
            <Route path="/spacecrafts/new" 
                   element={<ConstructionPage onRefreshAll={onRefreshAll}/>}
                   />

            <Route path="/spacecrafts/:spacecraftId" 
              element={
                <SpacecraftPage
                    spacecrafts = {spacecrafts}
                    planets = {planets}
                    onDestroySpacecraft = {onDestroySpacecraft}
                    onSendSpacecraftToPlanet = {onSendSpacecraftToPlanet}
                    onRefreshAll = {onRefreshAll}
                    error = {error}
                    isLoading = {isLoading}
                 />
              } 
           />

            <Route path="/planets" element={
                <PlanetsPage
                planets={planets}
                spacecrafts={spacecrafts}
                onSendSpacecraftToPlanet={onSendSpacecraftToPlanet}
                error={error} 
              />
              } 

              />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
    );
}

/*Notes:

This file centralizes and organizes routing logic for the application. It exports a functional
component that returns the <Routes> component, which contains individual <route> definitions.
It maps URL paths to components that enable React to use single page application (SPA)
navigation.
All navigation functions throughout the app are destructured and listed in the export
function signature.

*/






