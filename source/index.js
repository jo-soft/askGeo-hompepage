import './style/style.scss';
import './style/style.css';
import '../node_modules/kickstart-node/js/kickstart';


const saySomething = (something) => {
  console.log(something); // eslint-disable-line no-console
};

saySomething('Something! (index.js)');

/*
To use jQuery, first install it as a dependency: `npm install --save jquery`.
Then include `import $ from 'jquery';` at the top every JavaScript file that uses jQuery.
$('span').mouseover(() => {
  alert('span span!');
});
*/
