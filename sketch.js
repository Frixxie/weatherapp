let table;
let y_ratio = 25;
let l = 1008;
let mapimg;

function preload() {
    table = loadTable('log.csv', 'csv', 'header');
    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/18.948,69.671,9.6,0,0/332x300?access_token=pk.eyJ1IjoiZnJpeHhpZSIsImEiOiJjanllMm8yMGQwM3UzM2dsZWIwOWJ1OXM5In0.ITgViGOsXfPxRDFcvpTh9w');
}

function setup() {
    createCanvas(1400,800); 
    print(table.getRowCount() + ' total rows');
    print(table.getColumnCount() + ' total columns');
}

function meta_data() {
    noStroke();
    let row = Number(table.getRowCount());
    let loc = table.getString(row - 1, 1);
    let temp = table.getString(row - 1, 11);
    let desc = table.getString(row - 1, 3);
    background(50, 100, 255);
    fill(255);
    text('Location: ' + loc, 1160, 150);
    text('Temperature: ' + temp, 1160, 170);
    text('Description: ' + desc, 1160, 190);
}


function draw() {
    meta_data();
    noStroke();
    fill(36, 36, 36);
    rect(0, 0, 1068, 800);
    fill(255, 0, 0);
    rect(556, 50, 10, 10);
    fill(255);
    text('Max temperature', 571, 60);
    fill(0, 0, 255);
    rect(346, 50, 10, 10);
    fill(255);
    text('Min temperature', 361, 60);
    fill(0);
    rect(456, 50, 10, 10);
    fill(255);
    text('Temperature', 471, 60);
    text('Temperature Last 7 days', 431, 40);
    for (let i = Number(table.getRowCount()) - 1008, j = 30; i < table.getRowCount() - l; i++, j++) {
        stroke(0);
        line(j, Number(800 - table.get(i,11) * y_ratio), j + 1, Number(800 - table.get(i+1,11) * y_ratio));
        stroke(0, 0, 255);
        line(j, Number(800 - table.get(i,9) * y_ratio), j + 1, Number(800 - table.get(i+1,9) * y_ratio));
        stroke(255, 0, 0);
        line(j, Number(800 - table.get(i,10) * y_ratio), j + 1, Number(800 - table.get(i+1,10) * y_ratio));
    }
    l--;

    if (l == 0) {
        l = 1008;
    }
	image(mapimg, 1068, 500);
}


