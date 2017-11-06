/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';
import '../node_modules/kickstart-node/js/kickstart'

const scrollDirection = require('scroll-direction');
const zenScroll = require('../node_modules/zenscroll/zenscroll');
// ================================
// START YOUR APP HERE
// ================================
zenScroll.setup(300, 0);

function topInViewPort(el) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0
}

function getNextTarget() {
  const elms = k$.$$('[data-xtarget]');

  if(!elms || elms.length === 1) return;

  let idx = 0;
  let current = elms[idx];
  let next = elms[idx + 1];

  while (!topInViewPort(current)){
    idx += 1;
    current = next;
    next = elms[idx + 1]
  }
  return current;
}

function getPrevTarget() {
  const elms = k$.$$('[data-xtarget]');

  if(!elms || elms.length === 1) return;

  let idx = 1;
  let prev = elms[idx - 1];
  let current = elms[idx];

  while (!topInViewPort(current)){
    idx += 1;
    current = prev;
    prev = elms[idx - 1]
  }
  return prev;
}

function scrollToEl(el) {
  if (!zenScroll.moving())
    zenScroll.to(el);
}

function scrollTo(event, target) {
  event.preventDefault();
  const el = document.querySelector(`[data-xtarget=${target}]`);
  scrollToEl(el);
}

window
  .addEventListener('scroll', (ev) => {
    ev.preventDefault();

    if (zenScroll.moving())
      return false;

    let target;

    scrollDirection(document, (direction) => {

      if (direction){
        // upwards
        target = getPrevTarget()
      }
      else{
        target = getNextTarget();
      }
      scrollToEl(
        target
      )

    });
  });


k$.$$('a[data-xhref]')
  .forEach(
    (aElm) => {
      aElm.onclick = (event) => {
        const target = aElm.getAttribute('data-xhref');
        scrollTo(event, target)
      }
    });

