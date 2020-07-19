import {LitElement, html,css,} from "https://unpkg.com/lit-element/lit-element.js?module";
import "./navbar-component.js";
import "./display-component.js";
import "./sidebar-component.js";

class MainComponent extends LitElement {
  static get properties() {
    return {
      kapitelPath: { type: String },
      kapitelName: { type: String },
      sidebarElements: { type: Array },
      navbarElements: { type: Array },
      exercisePath: { type: String },
      exercise: { type: String },
      codePath: { type: String },
      codeExample: { type: String },
      code: { type: String },
    };
  }
  constructor() {
    super();
    (this.kapitelPath = "/kapiteln/kapiteln"),
      (this.sidebarElements = []),
      (this.navbarElements = []),
      (this.exercisePath = "./exercises/"),
      (this.kapitelName = "home"),
      (this.codePath = "./code_exercises/"),
      (this.exerciseName = ""),
      (this.kapitel = "");
    (this.codeExample = ""), (this.code = ""), (this.route = "");
  }
  static get styles() {
    return css`
      html,
      body,
      .grid-container {
        height: 100%;
        margin: 0;
      }

      .grid-container {
        display: grid;
        grid-template-columns: minmax(5%, 10%) minmax(0, 80%);
        grid-template-rows: minmax(0, 10vh) minmax(0, 80vh);
        grid-gap: 1px 30px;
        grid-template-areas: "navbar navbar" "sidebar code-area";
        align-items: stretch;
        min-height: 0; /* NEW */
        min-width: 0;
      }

      .navbar {
        grid-area: navbar;
      }

      .sidebar {
        grid-area: sidebar;
      }

      .code-area {
        grid-area: code-area;
      }

      .grid-container * {
        position: relative;
      }

      @media only screen and (max-width: 900px) {
        .grid-container {
          grid-template-areas:
            "navbar "
            "sidebar "
            "code-area";
          grid-gap: 30px;
          grid-template-columns: 80vw;
          grid-template-rows: minmax(min-content, max-content) minmax(
              min-content,
              max-content
            ) minmax(min-content, max-content);
        }
      }
      .grid-container * {
        position: relative;
      }
    `;
  }
  render() {
    return html` <div class="grid-container">
      <navbar-component class="navbar"  .navbarElements=${this.navbarElements || []} @kapitelName="${(e) => { this.kapitelName = e.detail.key; this.loadSidebar(); }}"></navbar-component>
      <sidebar-component class="sidebar" exerciseName=${this.exerciseName || ""} .sidebarElements=${this.sidebarElements || []} @exerciseName=${(e) => { this.exerciseName = e.detail.key; this.loadCode(); }}></sidebar-component>
      <display-component class="code-area" .code=${this.code || ""} ></display-component>
    </div>`;
  }
  historyTracker(tag,callback) {
    window.onpopstate = function(e ){
          callback.apply(tag, [e.state]);
      }
  };
  readHistory(e){
    for (let key of Object.keys(e)) {
      key==='kapitel'? this.kapitelName= e[key]: key==='exercise'?this.exerciseName= e[key]:key==='code'?this.code= e[key]: 'null'
       
    }
  }
  pushHistoryState(){
    var stateObj = { kapitel: this.kapitelName , exercise: this.exerciseName, code: this.code};
    window.history.pushState(stateObj, "state", "/"+this.kapitelName);
  }
  loadSidebar() {
    if(this.kapitelName==='home'){
      this.code='';
      this.sidebarElements=[];
      window.history.pushState({}, "state", "/"+"home");
    }
    else{
      this.code = "";
    this.loadFile( this,this.fillSidebar, this.exercisePath + this.kapitelName);
    }
    
  }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('onpopstate', this.historyTracker(this,this.readHistory));
    this.loadFile(this, this.fillNavbar, this.kapitelPath);
  }
  loadCode() {
    this.loadFile(this,this.getCode,this.codePath + this.kapitelName + "/" + this.exerciseName);
  }
  getCode(responseText) {
    this.code = responseText;
    this.pushHistoryState();
  }
  fillNavbar(responseText) {
    let data = JSON.parse(responseText);
    let tempArray = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        tempArray.push(data[key]);
      }
    }
    this.navbarElements = tempArray;
    this.pushHistoryState();
  }
  fillSidebar(responseText) {
    let data = JSON.parse(responseText);
    let tempArray = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        tempArray.push(data[key]);
      }
    }
    this.sidebarElements = tempArray;
    this.pushHistoryState();

  }
  loadFile(tag, callback, path) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path + ".json", true);
    xhr.send(null);
    xhr.onreadystatechange = function () { 
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback.apply(tag, [xhr.responseText]);
      } else {
        //alert("the path to the file is not correct or the file does not exists, SORRY :(")
      }
    };
  }
}

customElements.define("my-exercises", MainComponent);
