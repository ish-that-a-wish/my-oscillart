const input = document.getElementById('input');

// Create Web Audio API elements
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
gainNode.connect(audioCtx.destination);

// Define canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var amplitude = 40; // Amplitude of the wave
var interval = null; // Interval to manage drawing
var counter = 0; // Counter to track drawing progress
var freq; // Frequency for the wave drawing
var x = 0;
var y = 0;

// Map of note frequencies
const notenames = new Map();
notenames.set("C", 261.63);
notenames.set("D", 293.66);
notenames.set("E", 329.63);
notenames.set("F", 349.23);
notenames.set("G", 392.00);
notenames.set("A", 440.00);
notenames.set("B", 493.88);

// Function to create and play a new oscillator
function playFrequency(pitch) {
    freq = pitch / 10000; // Set frequency for wave drawing
    
    const oscillator = audioCtx.createOscillator();
    oscillator.connect(gainNode);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);

    // Stop drawing when the oscillator ends
    oscillator.onended = function() {
        clearInterval(interval);
    };

    return oscillator;
}

// Draw a single line segment of the sine wave
function line() {
    if (counter > width) {
        clearInterval(interval); // Stop drawing when we reach the end
        return;
    }
    
    // Calculate sine wave point
    y = height/2 + amplitude * Math.sin(2 * Math.PI * freq * counter);
    ctx.lineTo(counter, y);
    ctx.stroke();
    
    // Move to next x position
    counter += 1;
}

// Draw the full waveform on the canvas
function drawWave() {
    counter = 0; // Reset counter
    
    // Clear canvas and set up drawing
    ctx.clearRect(0, 0, width, height);
    x = 0;
    y = height/2;
    ctx.moveTo(x, y);
    ctx.beginPath();
    
    // Start the interval to draw the wave
    interval = setInterval(line, 20);
}

// Function to handle user input and play note
function handle() {
    console.log("handled!");
    
    // Make sure AudioContext is resumed
    audioCtx.resume().then(() => {
        var note = String(input.value).toUpperCase();
        const pitch = notenames.get(note);
        
        if (pitch) {
            // Stop previous wave drawing
            if (interval) clearInterval(interval);
            
            // Play the frequency and draw the wave
            const oscillator = playFrequency(pitch);
            drawWave(); // Draw wave after setting frequency
        } else {
            // If note is not found, clear the canvas
            ctx.clearRect(0, 0, width, height);
        }
    });
}