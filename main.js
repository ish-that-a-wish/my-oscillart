const input = document.getElementById('input');

// create web audio api elements
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();


// create Oscillator node
const oscillator = audioCtx.createOscillator();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";

// set initial frequency
oscillator.start();
gainNode.gain.value = 0;

notenames = new Map();
mapName.set("C", 261.63);
mapName.set("D", 293.66);
mapName.set("E", 329.63);
mapName.set("F", 349.23);
mapName.set("G", 392.00);
mapName.set("A", 440.00);
mapName.set("B", 493.88);

function frequency(pitch) {
    gainNode.gain.setValueAtTime(100, audioCtx.currentTime);
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 1);
}

function handle() {
    
    console.log("handled!");
    audioCtx.resume();
    gainNode.gain.value = 0;
    var note = String(input.value);
    frequency(notenames.get(note)); 
}
