let table;
let y_ratio = 25;
let l = 1008;
let mapimg;
let index = 1;

function preload() {
    table = loadTable('log.csv', 'csv', 'header');
    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/18.948,69.671,9.6,0,0/332x300?access_token=pk.eyJ1IjoiZnJpeHhpZSIsImEiOiJjanllMm8yMGQwM3UzM2dsZWIwOWJ1OXM5In0.ITgViGOsXfPxRDFcvpTh9w');
}

function setup() {
    createCanvas(1400,800); 
    //print(table.getRowCount() + ' total rows');
    //print(table.getColumnCount() + ' total columns');
}

function meta_data() {
    noStroke();
    let row = Number(table.getRowCount());
    let loc = table.getString(row - 1, 1);
    let temp = table.getString(row - 1, 11);
    let desc = table.getString(row - 1, 3);
    background(100, 155, 100); 
    text('Current information:', 1160, 130);
    text('Location: ' + loc, 1160, 150);
    text('Temperature: ' + temp, 1160, 170);
    text('Description: ' + desc, 1160, 190);
}


function draw() {
    let lo = 1000, mi = 0, hi = 0;
    noStroke();
    meta_data();
    fill(36, 36, 36);
    rect(0, 0, 1068, 800);

    fill(255, 0, 0);
    rect(556, 50, 10, 10);
    fill(255);
    text('Max temperature', 571, 60);
    
    fill(255, 125, 125);
    rect(556, 70, 10, 10);
    fill(255);
    text('Alltime maxtemp', 571, 80);

    fill(0, 0, 255);
    rect(346, 50, 10, 10);
    fill(255);
    text('Min temperature', 361, 60);

    fill(0, 100, 255);
    rect(346, 70, 10, 10);
    fill(255);
    text('Alltime mintemp', 361, 80);

    fill(0);
    rect(456, 50, 10, 10);
    fill(255);
    text('Temperature', 471, 60);

    fill(255, 255, 0);
    rect(456, 70, 10, 10);
    fill(255);
    text('Mean temp', 471, 80);

    text('Temperature Last 7 days', 431, 40);

    for (let i = Number(table.getRowCount()) - 1008, j = 30; i < table.getRowCount() - l; i++, j++) {
        if (lo > Number(table.get(i, 9))) {
            lo = Number(table.get(i, 9)); 
        }
        if (Number(table.get(i, 11)) != 0) {
            mi += Number(table.get(i, 11));
        }
        if (hi < Number(table.get(i, 10))) {
            hi = Number(table.get(i, 10)); 
        }
        stroke(0);
        line(j, Number(800 - table.get(i,11) * y_ratio), j + 1, Number(800 - table.get(i+1,11) * y_ratio));
        stroke(255, 255, 0);
        line(j,Number(800 - mi/index * y_ratio),j+1,Number(800 - mi/index * y_ratio));
        stroke(0, 0, 255);
        line(j, Number(800 - table.get(i,9) * y_ratio), j + 1, Number(800 - table.get(i+1,9) * y_ratio));
        stroke(0, 100, 255);
        line(j,Number(800 - lo * y_ratio),j+1,Number(800 - lo * y_ratio));
        stroke(255, 0, 0);
        line(j, Number(800 - table.get(i,10) * y_ratio), j + 1, Number(800 - table.get(i+1,10) * y_ratio));
        stroke(255, 125, 125);
        line(j,Number(800 - hi * y_ratio),j+1,Number(800 - hi * y_ratio));
        
        fill(100,155,100);
        noStroke();
        rect(1160, 230, 240, 190);

        stroke(255);
        fill(255);
        text('Information:', 1160, 250);
        text('Location: ' + table.getString(i,1), 1160, 270);
        text('Description: ' + table.getString(i,3), 1160, 290);
        text('Temperature: ' + table.getString(i,11), 1160, 310);
        text('Mean temp: ' + mi/index, 1160, 330);
        text('Min temperature: ' + table.getString(i,9), 1160, 350);
        text('Max temperature: ' + table.getString(i,10), 1160, 370);
        text('Alltime maxtemp: ' + hi, 1160, 390);
        text('Alltime lowtemp: ' + lo, 1160, 410);

        index++;
    }
    mi = 0;
    l--;
    index = 1;

    if (l == 0) {
        l = 1008;
        lo = 0, mi = 0, hi = 0;
    }
	image(mapimg, 1068, 500);
}


