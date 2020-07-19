import {
  LitElement,
  html,
  css, 
} from "https://unpkg.com/lit-element/lit-element.js?module";
class DisplayComponent extends LitElement {
  static get properties() {
    return {
      code: { type: String },
    };
  }

  render() {
    return html`
      <div class="display-element">
        <pre style="color:#FFFFFF margin:0 padding:0">${this.code}</pre>
      </div>
    `;
  }
  static get styles() {
    return css`
      .display-element {
        height: 90%;
        margin-top: 5px;
        padding: 1rem;
        box-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 6px #ffffff;

        border-radius: 0.5rem;
        font-size: 1vw;
        overflow-y: auto;
        scrollbar-width: thin; 
        scrollbar-color: #922661 white; 
      }

      @media only screen and (max-width: 900px) {
        .display-element {
          position: relative;
          padding: 1rem;
          border-radius: 0.5rem;
          align-content: center;
          margin-top: 5px;
          font-size: 3vw;
          overflow-y: auto;
          scrollbar-width: thin; 
          scrollbar-color: purple white;
        }
      }
    `;
  }
}
customElements.define("display-component", DisplayComponent);
