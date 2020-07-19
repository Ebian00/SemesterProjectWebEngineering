import {LitElement,html,css} from "https://unpkg.com/lit-element/lit-element.js?module";

class NavbarComponent extends  LitElement{
  static get properties() {
    return {
      navbarElements: { type: Array },
    };
  }
  render() { 
    return html`
      <nav id="nav" class="container">
        <div class="length" ><a id='home' @click="${this.loadContent}" >Home</a></div>
        <div class="lines"><p  ></p> </div>
         ${this.navbarElements.map(item => html`<div class="length"><a id=${item} @click="${this.loadContent}">${item}</a></div> <div class="lines" ><p  ></p> </div>`)}
        </nav>
    `;
  }

  loadContent(e){
      this.dispatchEvent(new CustomEvent('kapitelName', { detail: { key: e.target.id}}));
  }
  static get styles() {
    return css`
      .container {
     
        position:initial;
        display: grid;
        grid-template-columns: 8% 0.1% 8% 0.1% 8% 0.1% 12% 0.1% 8% 0.1% 8% 0.1% 16% 0.1% 8% 0.1% 8% 0.1%  8% 0.1%;
        box-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 6px #ffffff;
        padding:1%;
        border-radius: 0.5rem;
        text-align: center;
        align-content: center;
        align-items: center;
      }
      a {
        text-shadow: 1px 1px 2px black, 0 0 5px #46eaf0;
        color: #fff;
        text-decoration: none;
        text-align: center;
        font-size:  1vw;
        cursor: pointer;
      }
      a:hover {
        color: #e43294;
        font-size:  1.05vw;
      }
      a:active{
        color: #e43294;
        font-size:  1.2vw;
      }
      .activeElement {
        text-shadow: 1px 1px 2px black, 0 0 5px #46eaf0;
        color: #e43294;        
        text-decoration: none;
        text-align: center;
        font-size:  1.1vw;
        cursor: pointer;
      }
    .length{
      margin-left: 20% ; margin-right: 20%
    }

      .lines{
        background-color: #e43294; padding-left : 1%;
      }
      @media only screen and (max-width: 900px  ) {
        .container {
         
          position:relative;
          display:grid;
          grid-template-columns:auto;
          grid-template-rows:  auto;
          border-radius: 0.5rem;
          text-align: center;
          align-content: center;
          align-items: center;
          padding: 1rem;
        }
     
        .length {
         position: relative;
         word-wrap: break-word;
         box-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 6px #b285bc;
         padding: 1rem;
         margin-top: 2%;
         border-radius: 0.5rem;
         text-align: center;
         justify-content: center;
         align-items: top;
        }
       a {
        color: #fff;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
        font-size: 2vw;
        }
        .lines{
         background-color: #B285BC; padding-left : 0%; height:0;width:0;
        }
        .length{
        margin-left: 0% ; margin-right: 0%
      }
      }
    `;
  }
}
customElements.define("navbar-component", NavbarComponent);
