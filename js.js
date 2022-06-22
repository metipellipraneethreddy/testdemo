// Background scrolling speed
let move_speed = 3;
var username;
// Gravity constant value
let gravity = 0.5;
function reload() {
  window.location.reload();
}
function close_window() {

    close();

}
var audio = new Audio('fluf.mp3');
var audio2 = new Audio('gameover.mp3');

// retreive values
document.querySelector(".dialogue").style.display = "none";
function retrieveRecords(){ //retrieves items in the localStorage

  // var values = [],
  //      keys = Object.keys(localStorage),
  //      i = keys.length;
  //
  //  while ( i-- ) {
  //      values.push( localStorage.getItem(keys[i]) );
  //  }
  //  // return values;
  //

  //  console.log(values);

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
      arr = `${key}: ${localStorage.getItem(key)}`;
    console.log(arr);
    document.getElementById('score').innerHTML +=`<div id="res">${arr}</div><br />`;

}
}
retrieveRecords();

// Getting reference to the bird element
let bird = document.querySelector('.bird');

// Getting bird element properties
let bird_props = bird.getBoundingClientRect();
let background =
	document.querySelector('.background')
			.getBoundingClientRect();

// Getting reference to the score element
let score_val =
	document.querySelector('.score_val');
let message =
	document.querySelector('.message');
let score_title =
	document.querySelector('.score_title');

// Setting initial game state to start
let game_state = 'Start';

// Add an eventlistener for key presses
document.addEventListener('keydown', (e) => {

// Start the game if enter key is pressed
if (e.key == 'Enter' &&
	game_state != 'Play') {
audio2.pause();
audio.play();
      document.getElementById('score').innerHTML = '';
  username = document.getElementById('name').value;
	document.querySelectorAll('.pipe_sprite')
			.forEach((e) => {
	e.remove();
	});
	bird.style.top = '40vh';
	game_state = 'Play';
	message.innerHTML = '';
	score_title.innerHTML = 'Score : ';
	score_val.innerHTML = '0';

	play();
}
});
function play() {
function move() {

	// Detect if game has ended
	if (game_state != 'Play') return;

	// Getting reference to all the pipe elements
	let pipe_sprite = document.querySelectorAll('.pipe_sprite');
	pipe_sprite.forEach((element) => {

	let pipe_sprite_props = element.getBoundingClientRect();
	bird_props = bird.getBoundingClientRect();

	// Delete the pipes if they have moved out
	// of the screen hence saving memory
	if (pipe_sprite_props.right <= 0) {
		element.remove();
	} else {
		// Collision detection with bird and pipes
		if (
		bird_props.left < pipe_sprite_props.left +
		pipe_sprite_props.width &&
		bird_props.left +
		bird_props.width > pipe_sprite_props.left &&
		bird_props.top < pipe_sprite_props.top +
		pipe_sprite_props.height &&
		bird_props.top +
		bird_props.height > pipe_sprite_props.top
		) {

		// Change game state and end the game
		// if collision occurs

    // let finalscore = score_val.innerHTML;



    game_state = 'End';
		message.innerHTML = 'Game Over Refresh Page';
    for (let i = 0; i < localStorage.length; i++) {
      const keys = localStorage.key(i);
        arr = `${keys}: ${localStorage.getItem(keys)}`;
      console.log(arr);
      document.getElementById('score').innerHTML +=`<div id="res">${arr}</div><br />`;
    }

		message.style.left = '28vw';
    document.querySelector(".dialogue").style.display = "";
    audio.pause();
    audio2.play();
		return;
		} else {
		// Increase the score if player
		// has the successfully dodged the
		if (
			pipe_sprite_props.right < bird_props.left &&
			pipe_sprite_props.right +
			move_speed >= bird_props.left &&
			element.increase_score == '1'
		) {
			score_val.innerHTML = +score_val.innerHTML + 1;

		}
		element.style.left =
			pipe_sprite_props.left - move_speed + 'px';
		}
	}
	});

	requestAnimationFrame(move);
}
requestAnimationFrame(move);

let bird_dy = 0;
function apply_gravity() {
	if (game_state != 'Play') return;
	bird_dy = bird_dy + gravity;
	document.addEventListener('keydown', (e) => {
	if (e.key == 'ArrowUp' || e.key == ' ') {
		bird_dy = -7.6;
	}
	});

	// Collision detection with bird and
	// window top and bottom

	if (bird_props.top <= 0 ||
		bird_props.bottom >= background.bottom) {
	game_state = 'End';
	message.innerHTML = 'Press Enter To Restart';
	message.style.left = '28vw';
	return;
	}
	bird.style.top = bird_props.top + bird_dy + 'px';
	bird_props = bird.getBoundingClientRect();
	requestAnimationFrame(apply_gravity);
}
requestAnimationFrame(apply_gravity);

let pipe_seperation = 0;

// Constant value for the gap between two pipes
let pipe_gap = 35;
function create_pipe() {
	if (game_state != 'Play'){
    function store(){ //stores items in the localStorage
        var name = username;
        var key = score_val.innerHTML; //gets the score

        const person = {
            name: name,

        }

        window.localStorage.setItem(key,JSON.stringify(person));
        //converting object to string
    }

    store();
  return;
}

	// Create another set of pipes
	// if distance between two pipe has exceeded
	// a predefined value
	if (pipe_seperation > 115) {
	pipe_seperation = 0

	// Calculate random position of pipes on y axis
	let pipe_posi = Math.floor(Math.random() * 43) + 8;
	let pipe_sprite_inv = document.createElement('div');
	pipe_sprite_inv.className = 'pipe_sprite';
	pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
	pipe_sprite_inv.style.left = '100vw';

	// Append the created pipe element in DOM
	document.body.appendChild(pipe_sprite_inv);
	let pipe_sprite = document.createElement('div');
	pipe_sprite.className = 'pipe_sprite';
	pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
	pipe_sprite.style.left = '100vw';
	pipe_sprite.increase_score = '1';

	// Append the created pipe element in DOM
	document.body.appendChild(pipe_sprite);
	}
	pipe_seperation++;
	requestAnimationFrame(create_pipe);
}
requestAnimationFrame(create_pipe);
}
