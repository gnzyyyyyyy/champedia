import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Banner from './Components/Banner/Banner';

import EsportChoices from './Components/Landing_Page/E-Sports/Esports';
import SportChoices from './Components/Landing_Page/Sports/Sport';
import Banner_ML from './Components/MLBB_Page/Banner_ML/Banner_ML';
import OGT_ML from './Components/MLBB_Page/On_Going_Tur_ML/OGT_ML';
import Matches_ML from './Components/MLBB_Page/Matches_ML/Matches_ML';
import MLBB_Heroes from './Components/MLBB_Heroes_Page/MLBB_Heroes';
import TeamsPage from './Components/MLBB_Teams_Page/TeamsPage';
import PlayersPage from './Components/MLBB_Players_Page/MLBBPlayers';
import ItemsPage from './Components/MLBB_Items_Page/ItemsPage';
import TournamentsPage from './Components/MLBB_Tour_Page/MLBBTour';
import PatchesPage from './Components/MLBB_Patches_Page/MLBBPatches';
import Mplid from './Components/MLBB_MPLID/Mplid';

import BannerValo from './Components/Valo_Page/Banner_valo/Banner_valo';
import OGT_Valo from './Components/Valo_Page/On_Going_Tur_valo/OGT_Valo';
import Matches_Valo from './Components/Valo_Page/Matches_valo/Matches_Valo';
import Valo_Agents from './Components/Valo_Agents_Page/AgentsPage';
import ValoTeamsPage from './Components/Valo_Teams_Page/ValoTeams';
import VALOPlayers from './Components/Valo_Players_Page/ValoPlayers';
import VALOTour from './Components/Valo_Tours_Page/ValoTours';
import VALOMapsPage from './Components/Valo_Maps_Page/VALOMapsPage';

import BannerPUBG from './Components/PUBG_Page/Banner_PUBG/Banner_PUBG';
import OGT_PUBG from './Components/PUBG_Page/On_Going_Tour_PUBG/OGT_PUBG';
import Matches_PUBG from './Components/PUBG_Page/Matches_PUBG/Matches_PUBG';
import PUBGTeamsPage from './Components/PUBG_Teams_Page/PUBGTeamsPage';
import PUBGPlayersPage from './Components/PUBG_Players_Page/PUBGPlayersPage';
import PUBGToursPage from './Components/PUBG_Tour_Page/PUBGToursPage';
import PUBGPatchesPage from './Components/PUBG_Patches_Page/PUBGPatchesPage';
import PUBGMapsPage from './Components/PUBG_Maps_Page/PUBGMapsPage';

import BannerCR from './Components/CR_Page/Banner_ML/Banner_CR';
import OGT_CR from './Components/CR_Page/On_Going_Tur_ML/OGT_CR';
import CRCardsPage from './Components/CR_Cards_Page/CRCardsPage';
import CREvoPage from './Components/CR_Evo_Page/CREvoPage';
import CRHeroPage from './Components/CR_Hero_Page/CRHeroPage';
import CRTeamsPage from './Components/CR_Teams_Page/CRTeamsPage';
import CRPlayersPage from './Components/CR_Players_Page/CRPlayersPage';
import CRToursPage from './Components/CR_Tours_Page/CRToursPage';

//MGP_Page
import MGP_Banner from './Components/MGP_Page/MGP_Banner/MGP_Banner';
import MGP_Option from './Components/MGP_Page/MGP_Option/MGP_Option';
import MGP_UpcomingRace from './Components/MGP_Page/MGP_UR/MGP_UR';
import MGP_Championship from './Components/MGP_Page/MGP_Championship/MGP_Championship';
import MGP_News from './Components/MGP_Page/MGP_News/MGP_News';
import MGP_Highlight from './Components/MGP_Page/MGP_Highlight/MGP_Highlight';
//MGP_Championship
import MGP_Table from './Components/MGP_Championship/MGP_Table/MGP_Table';
import MGP_Recommended from './Components/MGP_Championship/MGP_Receommended/MGP_Recommended';

//MGP Riders
import MGP_bannerRider from './Components/MGP_Riders/MGP_bannerRider/MGP_bannerRider';  
import MGP_riderOption from './Components/MGP_Riders/MGP_riderOption/MGP_riderOption';
import MGP_riderDetails from './Components/MGP_Riders/MGP_riderDetails/MGP_riderDetails';

//MGP Teams
import MGP_teamOption from './Components/MGP_Teams/MGP_teamOption/MGP_teamOption';
import MGP_teamDetails from './Components/MGP_Teams/MGP_teamDetails/MGP_teamDetails';
import MGP_bannerTeam from './Components/MGP_Teams/MGP_bannerTeam/MGP_bannerTeam';

//MGP Circuits
import MGP_bannerCircuit from './Components/MGP_Circuits/MGP_bannerCircuit/MGP_bannerCircuit';
import MGP_circuitsOption from './Components/MGP_Circuits/MGP_circuitsOption/MGP_circuitsOption';
import MGP_circuitDetails from './Components/MGP_Circuits/MGP_circuitDetails/MGP_circuitDetails';

//MGP Transfer
import MGP_Transfer from './Components/MGP_Transfer/MGP_Transfer';

//MGP Hall of Fame
import MGP_HoF from './Components/MGP_HoF/MGP_HoF';

//BDM_Page
import BDM_Page from './Components/BDM_Page/BDM_Base';
import BDM_Players from './Components/BDM_Players/BDM_Players'; 
import BDM_Tournaments from './Components/BDM_Tournaments/BDM_Tournaments';
import BDM_Equipment from './Components/BDM_Equipment/BDM_Equipment';

//Chess_Page
import Chess_Page from './Components/Chess_Page/Chess_Page';
import Chess_Players from './Components/Chess_Players/Chess_Players'; 
import Chess_Tournaments from './Components/Chess_Tournaments/Chess_Tournaments';
import Chess_ELO from './Components/Chess_ELO/Chess_ELO';

/* --- BACKEND COMPONENTS --- */
import Login from './Backend-Components/LoginPage/Login';
import EsportChoicesBackEnd from './Backend-Components/AdminPage/E-Sports/Esports';
import SportChoicesBackEnd from './Backend-Components/AdminPage/Sports/Sport';
import BannerML_BackEnd from './Backend-Components/MLBB-BackEnd-Page/Banner_ML/Banner_ML_BackEnd';
import MLBBTeamsBE from './Backend-Components/MLBB_Teams-BE-Page/MLBBTeamsBE';
import MLBBPlayersBE from './Backend-Components/MLBB_Players-BE-Page/MLBBPlayersBE';
import MLBBItemsBE from './Backend-Components/MLBB_Items-BE-Page/MLBBItemsBE';
import MLBBHeroesBE from './Backend-Components/MLBB_Heroes-BE-Page/MLBBHeroesBE';
import MLBBToursBE from './Backend-Components/MLBB_Tours-BE-Page/MLBBToursBE';
import MLBBPatchesBE from './Backend-Components/MLBB_Patches-BE-Page/MLBBPatchesBE';

import BannerValo_BackEnd from './Backend-Components/VALO-BackEnd-Page/Banner_valo/Banner_valo_BackEnd';
import VALOAgentsBE from './Backend-Components/VALO_Agents-BE-Page/VALOAgentsBE';
import VALOTeamsBE from './Backend-Components/VALO_Teams-BE-Page/VALOTeamsBE';
import VALOPlayersBE from './Backend-Components/VALO_Players-BE-Page/VALOPlayersBE';
import VALOToursBE from './Backend-Components/VALO_Tours-BE-Page/VALOToursBE';
import VALOMapsBE from './Backend-Components/VALO_Maps-BE-Page/VALOMapsBE';

import BannerCR_BackEnd from './Backend-Components/CR-BackEnd-Page/Banner_CR/Banner_CR_BackEnd';
import CRCardsBE from './Backend-Components/CR_Cards-BE-Page/CRCardsBE';
import CREvoBE from './Backend-Components/CR_EvoCards-BE-Page/CREvoBE';
import CRHeroBE from './Backend-Components/CR_HeroCards-BE-Page/CRHeroBE';
import CRTeamsBE from './Backend-Components/CR_Teams-BE-Page/CRTeamsBE';
import CRPlayersBE from './Backend-Components/CR_Players-BE-Page/CRPlayersBE';
import CRToursBE from './Backend-Components/CR_Tours-BE-Page/CRToursBE';

import BannerPUBG_BackEnd from './Backend-Components/PUBG-BackEnd-Page/Banner_PUBG/Banner_PUBG_BackEnd';
import PUBGTeamsBE from './Backend-Components/PUBG_Teams-BE-Page/PUBGTeamsBE';
import PUBGPlayersBE from './Backend-Components/PUBG_Players-BE-Page/PUBGPlayersBE';
import PUBGToursBE from './Backend-Components/PUBG_Tours-BE-Page/PUBGToursBE';
import PUBGMapsBE from './Backend-Components/PUBG_Maps-BE-Page/PUBGMapsBE';
import PUBGPatchesBE from './Backend-Components/PUBG_Patches-BE-Page/PUBGPatchesBE';

import MGP_Page_BackEnd from './Backend-Components/MGP_Page-BE-Page/MGP_Page/MGP_Page_BackEnd';
import MGP_TeamsBE from './Backend-Components/MGP_Teams-BE-Page/MGP_Teams-BE-Page';
import MGP_RidersBE from './Backend-Components/MGP_Riders-BE-Page/MGP_Riders-BE-Page';
import MGP_CircuitsBE from './Backend-Components/MGP_Circuits-BE-Page/MGP_Circuits-BE-Page';
import MGP_ChampionshipBE from './Backend-Components/MGP_Championship-BE-Page/MGP_Championship-BE-Page';
import MGP_TransferBE from './Backend-Components/MGP_Transfer-BE-Page/MGP_Transfer-BE-Page';
import MGP_HoFBE from './Backend-Components/MGP_HoF-BE-Page/MGP_HoF-BE-Page';
import MGP_HighlightBE from './Backend-Components/MGP_Highlight-BE-Page/MGP_Highlight-BE-Page';
import MGP_NewsBE from './Backend-Components/MGP_News-BE-Page/MGP_News-BE-Page';
import MGP_nextRaceBE from "./Backend-Components/MGP_UR-BE-Page/MGP_UR-BE-Page";

//Badminton
import BDM_Page_BackEnd from "./Backend-Components/BDM_Page-BE-Page/BDM_Page-BE-Page";
import BDMPlayersBE from "./Backend-Components/BDM_Players-BE-Page/BDM_Players-BE-Page";
import BDMTournamentsBE from "./Backend-Components/BDM_Tournaments-BE-Page/BDM_Tournaments-BE-Page";
import BDMEquipmentBE from './Backend-Components/BDM_Equipment-BE-Page/BDM_Equipment-BE-Page';

//Chess
import Chess_Page_BackEnd from './Backend-Components/Chess_Page-BE-Page/Chess_Page-BE-Page';
import ChessEloBE from './Backend-Components/Chess_Elo-BE-Page/Chess_Elo-BE-Page';
import ChessPlayersBE from './Backend-Components/Chess_Players-BE-Page/Chess_Players-BE-Page';
import ChessTournamentsBE from './Backend-Components/Chess_Tournaments-BE-Page/Chess_Tournaments-BE-Page';



const App = () => {

  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'dark');

  useEffect(() => {
  localStorage.setItem('current_theme', theme);
  const root = document.getElementsByTagName('html')[0];
  root.className = theme;
}, [theme]);

  return (
    <Router>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />

        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <>
                <Banner theme={theme} />
                <EsportChoices theme={theme} />
                <SportChoices theme={theme} />
              </>
            }
          />

          {/* MLBB Page */}
          <Route
            path="/mlbb"
            element={
              <>
                <Banner_ML theme={theme} />
                <OGT_ML theme={theme} />
                <Matches_ML theme={theme} />
            </>  
            }
          />
          
          <Route
            path="/mlbb_heroes"
            element={<MLBB_Heroes theme={theme} />}
          />

          <Route
            path="/PlayersPage"
            element={<PlayersPage theme={theme} />}
          />

          <Route
            path="/TeamsPage"
            element={<TeamsPage theme={theme} />}
          />

          <Route 
            path="/ItemsPage"
            element={<ItemsPage theme={theme} />}
          />

          <Route
            path="/MLBBTour"
            element={<TournamentsPage theme={theme} />}
          />

          <Route
            path="/MLBBPatches"
            element={<PatchesPage theme={theme} />}
          />

          <Route
            path="/Mplid"
            element={<Mplid theme={theme} />}
          />

          {/* VALO Page */}
          <Route
            path="/valo"
            element={
              <>
              <BannerValo theme={theme} />
              <OGT_Valo theme={theme} />
              <Matches_Valo theme={theme} />
            </>}
          />

          <Route
            path="/Valo_Agents"
            element={<Valo_Agents theme={theme} />}
          />

          <Route
            path="/Valo_Teams"
            element={<ValoTeamsPage theme={theme} />}
          />

          <Route
            path="/Valo_Players"
            element={<VALOPlayers theme={theme} />}
          />

          <Route
            path="/Valo_Tours"
            element={<VALOTour theme={theme} />}
          />

          <Route
            path="/VALOMapsPage"
            element={<VALOMapsPage theme={theme} />}
          />

          {/* PUBG Page */}
          <Route
            path="/pubg"
            element={
              <>
                <BannerPUBG theme={theme} />
                <OGT_PUBG theme={theme} />
                <Matches_PUBG theme={theme} />
            </>  
            }
          />
          

          <Route
            path="/PUBGPlayersPage"
            element={<PUBGPlayersPage theme={theme} />}
          />

          <Route
            path="/PUBGTeamsPage"
            element={<PUBGTeamsPage theme={theme} />}
          />

          <Route
            path="/PUBGToursPage"
            element={<PUBGToursPage theme={theme} />}
          />

          <Route
            path="/PUBGPatchesPage"
            element={<PUBGPatchesPage theme={theme} />}
          />

          <Route
            path="/PUBGMapsPage"
            element={<PUBGMapsPage theme={theme} />}
          />

          

          {/* CR Page */}
          <Route
            path="/cr"
            element={
              <>
                <BannerCR theme={theme} />
                <OGT_CR theme={theme} />
                <Matches_PUBG theme={theme} />
            </>  
            }
          />

          <Route
            path="/CRCardsPage"
            element={<CRCardsPage theme={theme} />}
          />

          <Route
            path="/CREvoPage"
            element={<CREvoPage theme={theme} />}
          />

          <Route
            path="/CRHeroPage"
            element={<CRHeroPage theme={theme} />}
          />

          <Route
            path="/CRTeamsPage"
            element={<CRTeamsPage theme={theme} />}
          />

          <Route
            path="/CRPlayersPage"
            element={<CRPlayersPage theme={theme} />}
          />
          
          <Route
            path="/CRToursPage"
            element={<CRToursPage theme={theme} />}
          />

          {/* MGP Page */}
          <Route
            path="/MGP"
            element={
              <>
                <MGP_Banner theme={theme} />
                <MGP_Option theme={theme} />
                <MGP_UpcomingRace theme={theme} />
                <MGP_Championship theme={theme} />
                {/* <MGP_News theme={theme} /> */}
                <MGP_Highlight theme={theme} />
              </>
            }
          />

          {/* MGP Championship */}
          <Route 
            path="/MGP_Championship"
            element={
              <>
                <MGP_Table theme={theme} />
                <MGP_Recommended theme={theme} />
                {/* <MGP_News theme={theme} /> */}
              </>
            }
          />

          {/* MGP Riders */}
          <Route 
            path="/MGP_Riders"
            element={
              <>
                <MGP_bannerRider theme={theme} />
                <MGP_riderOption theme={theme} />
                <MGP_Recommended theme={theme} />
                {/* <MGP_News theme={theme} /> */}
              </>
            }
          />

          <Route 
            path="/MGP_Riders/:id"
            element={<MGP_riderDetails theme={theme} />}
          />

          {/* MGP Teams */}
          <Route 
            path="/MGP_Teams"
            element={
              <>
                <MGP_bannerTeam theme={theme} />
                <MGP_teamOption theme={theme} />
                <MGP_Recommended theme={theme} />
                {/* <MGP_News theme={theme} /> */}
              </>
            }
          />

          <Route 
            path="/MGP_Teams/:id"
            element={<MGP_teamDetails theme={theme} />}
          />

          {/* MGP Circuits */}
          <Route 
            path="/MGP_Circuits"
            element={
              <>
                <MGP_bannerCircuit theme={theme} />
                <MGP_circuitsOption theme={theme} />
                <MGP_Recommended theme={theme} />
                {/* <MGP_News theme={theme} /> */}
              </>
            }
          />

          <Route 
            path="/MGP_Circuits/:id"
            element={<MGP_circuitDetails theme={theme} />}
          />

          {/* MGP Transfers */}
          <Route 
            path="/MGP_Transfer"
            element={
              <>
                <MGP_Transfer theme={theme} />
                <MGP_Recommended theme={theme} />
                {/* <MGP_News theme={theme} /> */}
              </>
            }
          />

          {/* MGP HoF */}
          <Route 
            path="/MGP_Hof"
            element={
              <>
                <MGP_HoF theme={theme} />
                <MGP_Recommended theme={theme} />
                {/* <MGP_News theme={theme} /> */}
              </>
            }
          />

          {/* BDM Page */}
          <Route path="/badminton" element={<BDM_Page theme={theme} />} />
          <Route path="/badminton/players" element={<BDM_Players theme={theme} />} />
          <Route path="/badminton/tournaments" element={<BDM_Tournaments theme={theme} />} />
          <Route path="/badminton/equipment" element={<BDM_Equipment theme={theme} />} />

          {/* Chess Page */}
          <Route path="/chess" element={<Chess_Page theme={theme} />} />
          <Route path="/chess/players" element={<Chess_Players theme={theme} />} />
          <Route path="/chess/tournaments" element={<Chess_Tournaments theme={theme} />} />
          <Route path="/chess/elo" element={<Chess_ELO theme={theme} />} />


          {/* ✅ LOGIN PAGE ROUTE */}
          <Route
            path="/login"
            element={<Login theme={theme} />}
          />

          <Route
            path="/AdminPage"
            element={
              <>
                <EsportChoicesBackEnd theme={theme} />
                <SportChoicesBackEnd theme={theme} />
              </>
            }
          />

          {/* MLBB BACKEND */}

          <Route
            path="/mlbb_admin"
            element={ <BannerML_BackEnd theme={theme} />}
          />

          <Route
            path="/mlbb_teams_BE"
            element={<MLBBTeamsBE theme={theme} />}
          />

          <Route
            path="/mlbb_players_BE"
            element={<MLBBPlayersBE theme={theme} />}
          />

          <Route
            path="/mlbb_items_BE"
            element={<MLBBItemsBE theme={theme} />}
          />

          <Route
            path="/mlbb_heroes_BE"
            element={<MLBBHeroesBE theme={theme} />}
          />

          <Route
            path="/mlbb_tours_BE"
            element={<MLBBToursBE theme={theme} />}
          />

          <Route
            path="/mlbb_patches_BE"
            element={<MLBBPatchesBE theme={theme} />}
          />

          {/* VALO BACKEND */}

          <Route
            path="/valo_admin"
            element={<BannerValo_BackEnd theme={theme} />}
          />

          <Route
            path="/valo_agents_BE"
            element={<VALOAgentsBE theme={theme} />}
          />

          <Route
            path="/valo_teams_BE"
            element={<VALOTeamsBE theme={theme} />}
          />

          <Route
            path="/valo_players_BE"
            element={<VALOPlayersBE theme={theme} />}
          />

          <Route
            path="/valo_tours_BE"
            element={<VALOToursBE theme={theme} />}
          />

          <Route
            path="/valo_maps_BE"
            element={<VALOMapsBE theme={theme} />}
          />

          {/* CR BACKEND */

          <Route
            path="/cr_admin"
            element={<BannerCR_BackEnd theme={theme} />}
          />}

          <Route
            path="/cr_cards_BE"
            element={<CRCardsBE theme={theme} />}
          />

          <Route
            path="/cr_evo_BE"
            element={<CREvoBE theme={theme} />}
          />

          <Route
            path="/cr_hero_BE"
            element={<CRHeroBE theme={theme} />}
          />

          <Route
            path="/cr_teams_BE"
            element={<CRTeamsBE theme={theme} />}
          />

          <Route
            path="/cr_players_BE"
            element={<CRPlayersBE theme={theme} />}
          />

          <Route
            path="/cr_tours_BE"
            element={<CRToursBE theme={theme} />}
          />

          {/* PUBG BACKEND */}

          <Route
            path="/pubg_admin"
            element={<BannerPUBG_BackEnd theme={theme} />}
          />

          <Route
            path="/pubg_teams_BE"
            element={<PUBGTeamsBE theme={theme} />}
          />

          <Route
            path="/pubg_players_BE"
            element={<PUBGPlayersBE theme={theme} />}
          />

          <Route
            path="/pubg_tours_BE"
            element={<PUBGToursBE theme={theme} />}
          />

          <Route
            path="/pubg_maps_BE"
            element={<PUBGMapsBE theme={theme} />}
          />

          <Route 
            path="/pubg_patches_BE"
            element={<PUBGPatchesBE theme={theme} />}
          />

          {/* SPORTS */}
          {/* MGP BACKEND */}
         <Route
            path="/mgp_admin"
            element={<MGP_Page_BackEnd theme={theme} />}
          />

          <Route
            path="/MGP_TeamsBE"
            element={<MGP_TeamsBE theme={theme} />}
          />

          <Route
            path="/MGP_RidersBE"
            element={<MGP_RidersBE theme={theme} />}
          />

          <Route
            path="/MGP_CircuitsBE"
            element={<MGP_CircuitsBE theme={theme} />}
          />

          <Route
            path="/MGP_ChampionshipBE"
            element={<MGP_ChampionshipBE theme={theme} />}
          />

          <Route
            path="/MGP_TransferBE"
            element={<MGP_TransferBE theme={theme} />}
          />

          <Route
            path="/MGP_HofBE"
            element={<MGP_HoFBE theme={theme} />}
          />

          <Route
            path="/MGP_HighlightBE"
            element={<MGP_HighlightBE theme={theme} />}
          />

          <Route
            path="/MGP_NewsBE"
            element={<MGP_NewsBE theme={theme} />}
          />

          <Route
            path="/MGP_nextRaceBE"
            element={<MGP_nextRaceBE theme={theme} />}
          />

                    {/* Badminton BE Page */}
          <Route
            path="/badminton_BE"
            element={
              <>
                <BDM_Page_BackEnd theme={theme} />
              </>
            }
          />

          <Route 
            path="/BDM_PlayersBE"
            element={
              <>
                <BDMPlayersBE theme={theme} />
              </>
            }
          />

          <Route 
            path="/BDM_TournamentsBE"
            element={
              <>
                <BDMTournamentsBE theme={theme} />
              </>
            }
          />

          <Route 
            path="/BDM_EquipmentBE"
            element={
              <>
                <BDMEquipmentBE theme={theme} />
              </>
            }
          />

          {/* Chess BE Page */}
          <Route
            path="/chess_BE"
            element={
              <>
                <Chess_Page_BackEnd theme={theme} />
              </>
            }
          />

          <Route
            path="/Chess_EloBE"
            element={
              <>
                <ChessEloBE theme={theme} />
              </>
            }
          />

          <Route
            path="/Chess_PlayersBE"
            element={
              <>
                <ChessPlayersBE theme={theme} />
              </>
            }
          />

          <Route
            path="/Chess_TournamentsBE"
            element={
              <>
                <ChessTournamentsBE theme={theme} />
              </>
            }
          />
          
        </Routes>

        <Footer theme={theme} />
      </div>
    </Router>
  );
};

export default App;
