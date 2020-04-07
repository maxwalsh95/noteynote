import * as pubSub from './pubsub.js';

const _tagger = document.querySelector('.js-tagger');
const _tagList = _tagger.querySelector('.js-tagger__tag-list');
const _tagInput = _tagger.querySelector('.js-tagger__tag-input');

let _tags = [];

function render(tags = [], tagList) {
  tagList.innerHTML = '';
  tags.forEach((tag) => tagList.appendChild(createTag(tag)));
}

function addTag(tag) {
  if (_tags.includes(tag)) {
    return;
  }

  _tags.push(tag);

  render(_tags, _tagList);
  pubSub.publish('tag-added', tag);
}

function removeTag(tagToRemove) {
  _tags = _tags.filter((tag) => tag !== tagToRemove);
  render(_tags, _tagList);
}

function removeSelf() {
  const tag = this.getAttribute('data-tag');
  removeTag(tag);
}

function createTag(tag) {
  const li = document.createElement('li');
  li.classList.add('tag');
  const btn = document.createElement('button');
  btn.classList.add('ghost-btn', 'ghost-btn--blue');
  const tagName = document.createTextNode(tag);

  li.appendChild(btn);
  btn.appendChild(tagName);

  btn.setAttribute('data-tag', tag);
  btn.addEventListener('click', removeSelf);

  return li;
}

function handleKeyDown(e) {
  if (e.keyCode !== 13) {
    return;
  }
  const tags = this.value.trim().split(' ');
  tags.forEach((tag) => addTag(tag));
  this.value = '';
}

export function setTags(tags) {
  _tags = tags;
  render(_tags, _tagList);
}

export function getTags() {
  return _tags;
}

export function init() {
  _tagInput.addEventListener('keydown', handleKeyDown);
}
