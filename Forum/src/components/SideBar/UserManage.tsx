import App from "../../App"
import React from "react"
import User from "../../model/user.model"
import {arrUser} from "../../App"



<div className="App">
    <header className="App-header">
      <h1>User from NestJS Backend</h1>
      <ul className="name">
        <App/> 
      </ul>
      <ul>
        {App.arrUser.map((arrUser[u]) => {
          <li key={arrUser[u].email}>{arrUser[u].email}</li>
        })}
        
      </ul>
    </header>
  </div>

