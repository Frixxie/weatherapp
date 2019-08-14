let table;
let y_ratio = 25;
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
    text('Information:', 1160, 130);
    text('Location: ' + loc, 1160, 150);
    text('Description: ' + desc, 1160, 170);
    text('Temperature: ' + temp, 1160, 190);
    text('Min temperature ' + table.getString(row - 1, 9), 1160, 210); 
    text('Max temperature ' + table.getString(row - 1, 10), 1160, 230); 
}

function graph_info() {
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
    rect(460, 50, 10, 10);
    fill(255);
    text('Temperature', 471, 60);

    fill(255, 255, 0);
    rect(460, 70, 10, 10);
    fill(255);
    text('Mean temp', 471, 80);

    text('Temperature Last 3.5 days', 431, 40);
}


function draw() {
    let lo = 1000, mi = 0, hi = 0;
    noStroke();
        
    meta_data();

    fill(36, 36, 36);
    rect(0, 0, 1068, 800);  
    
    graph_info();    
    for (let i = Number(table.getRowCount()) - 1009, j = 30; i < table.getRowCount() - 1; i++, j++) {
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
        
        index++;
    }

    let options = { day: '2-digit', weekday: 'narrow', year: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }

    for (let i = 0; i < 1008; i++) {
        if (i % 100 == 0) {
            stroke(0);
            line(i + 30, 100, i + 30, 700);
            let row = Number(table.getRowCount());
            let timestamp = Number(table.get(row - i - 1, 0) * 1000);
            let date = new Date(timestamp);
            let hours = date.getHours();
            let min = "0" + date.getMinutes();
            let sec = "0" + date.getSeconds();
            let weekday = date.toDateString();
            let time = hours + ':' + min.substr(-2) + ':' + sec.substr(-2); 
            text(weekday, 1008 - i + 22, 720);
            text(time, 1008 - i + 22, 740);
        }
    }
    
    noStroke();
    fill(255);
    text('Mean temp: ' + mi/index, 1160, 250);
    text('Alltime maxtemp: ' + hi, 1160, 270);
    text('Alltime lowtemp: ' + lo, 1160, 290);
    mi = 0;
    index = 1;

	image(mapimg, 1068, 500);
}


