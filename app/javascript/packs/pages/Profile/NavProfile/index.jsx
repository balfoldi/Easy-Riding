import React from "react";
import { Link } from "react-router-dom";

const NavProfile = () => {
  return (
    <div>
      <ul>
        <li><Link to="/mon-compte">Mon Profil</Link></li>
        <li><Link to="/mon-compte/mon-garage">Mon Garage</Link></li>
        <li><Link to="/mon-compte/mes-annonces">Mes Annonces</Link></li>
        <li><Link to="/mon-compte/mes-reservations">Mes Réservations</Link></li>
        <li><Link to="/mon-compte/mes-favoris">Mes Favoris</Link></li>
      </ul>
    </div>
  )
}

export default NavProfile
