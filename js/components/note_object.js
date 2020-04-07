class NoteObject extends HTMLElement {
  static get observedAttributes() {
    return ['selected'], ['template'], ['note-id'], ['heading'], ['text'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      switch (attrName) {
        /** Boolean attributes */
        case 'open':
          this[attrName] = this.hasAttribute(attrName);
          break;
        /** Value attributes */
        case 'template':
          this[attrName] = newValue;
          break;
        default:
      }
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { shadowRoot, template } = this;
    const templateNode = document.getElementById(template);
    shadowRoot.innerHTML = '';
    if (templateNode) {
      const content = document.importNode(templateNode.content, true);
      shadowRoot.appendChild(content);
    } else {
      shadowRoot.innerHTML = `<div class="note-object js-note-object">
        <h1 class="note-object__heading">${this.heading}</h1>
        <p class="note-object__text">${this.text}</p>
       </div>`;
    }
    shadowRoot
      .querySelector('.js-note-object')
      .addEventListener('click', this.select);
  }

  get selected() {
    return this.hasAttribute('selected');
  }

  get template() {
    return this.getAttribute('template');
  }

  get noteId() {
    return this.getAttribute('note-id');
  }

  get heading() {
    return this.getAttribute('heading');
  }

  get text() {
    return this.getAttribute('text');
  }

  set selected(isSelected) {
    if (isSelected) {
      this.setAttribute('selected', '');
      // this.select()
    } else {
      this.removeAttribute('selected');
    }
  }

  set template(template) {
    if (template) {
      this.setAttribute('template', template);
    } else {
      this.removeAttribute('template');
    }
    this.render();
  }

  set noteId(noteId) {
    this.setAttribute('note-id', noteId);
  }

  set heading(heading) {
    this.setAttribute('heading', heading);
  }

  set text(text) {
    this.setAttribute('text', text);
  }

  select() {
    const selectEvent = new CustomEvent('noteSelected');
    this.dispatchEvent(selectEvent);
  }
}

customElements.define('note-object', NoteObject);
