var serial;   // variable to hold an instance of the serialport library
var portName = 'COM6';    // fill in your serial port name here
var inData;   // variable to hold the input data from Arduino

function setup() {
  // Set up communication port
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  try {
    serial.open(portName);            // open a serial port
  } catch (error) {
    console.error("Error opening serial port:", error);
  }

  createCanvas(400, 400);
}

function draw() {
  // Your drawing code goes here
  background(255); // Set background to white
  fill(0); // Set fill color to black
  textSize(24); // Set text size
  text("Brightness Level: " + inData, 30, 100); // Display brightness level
}

function serialEvent() {
  // Read the string from the serial port
  var message = serial.readStringUntil('\r\n');
  // Print the received message to the console
  console.log("Received message: " + message);
  // If you've got a valid message, convert it to a number
  if (message) {
    inData = Number(message);
    // Update the HTML element with the brightness value
    document.getElementById('brightnessValue').innerText = inData;
  }
}

// Following functions print the serial communication status to the console for debugging purposes

function printList(portList) {
  // PortList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list in the console
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('Connected to server.');
}

function portOpen() {
  console.log('The serial port opened.');
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}
