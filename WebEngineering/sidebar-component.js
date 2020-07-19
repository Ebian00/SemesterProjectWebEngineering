import {LitElement,html,css,} from "https://unpkg.com/lit-element/lit-element.js?module";

class SidebarComponent extends LitElement {
  static get properties() {
    return {
      sidebarElements: { type: Array },
      exerciseName: { type: String },
    };
  }
  render() {
    return html`
      <div class="side">
        ${this.sidebarElements.map(
          (item) =>
            html`<div class="botFrame">
              <button class="button" id=${item} @click="${this.loadContent}">${item}</button>
            </div>`
        )}
      </div>
    `;
  }
  loadContent(e) {
    this.dispatchEvent(
      new CustomEvent("exerciseName", { detail: { key: e.target.id } })
    );
  }

  static get styles() {
    return css`
      .side {
        box-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 6px #ffffff;
        height: 90%;
        margin-top: 5px;
        padding: 10%;
        border-radius: 0.5rem;
        text-align: center;
        align-content: top;
      }
      .line {
        height: 2px;
        border-bottom: 1px solid white;
        position: inherit;
        color: #f7f7f7;
      }
      .botFrame {
        position: relative;
        word-wrap: break-word;
        box-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 6px #b285bc;
        padding: 1rem;
        margin-top: 10%;
        border-radius: 0.5rem;
        text-align: center;
        word-wrap: anywhere;
        justify-content: center;
        align-items: top;
      }

      .button {
        background: none;
        border: none;
        font-size: 1vw;
        color: #ffffff;
        cursor: pointer;
      }
      .button:hover {
        color: #e43294;
      }
      @media only screen and (max-width: 900px) {
        .side {
          position: relative;
          height: auto;
        }
        .botFrame {
          padding: 1rem;
          margin-top: 2%;
          border-radius: 0.5rem;
          text-align: center;
          justify-content: center;
          align-items: center;
            }
          .button {
            font-size: 2vw;
          }
      }
    `;
  }
}
customElements.define("sidebar-component", SidebarComponent);
