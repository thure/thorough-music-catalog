const electron = require('electron'),
      app = electron.app,
      BrowserWindow = electron.BrowserWindow;

const MusicData = require('./lib/music-data');

electron.crashReporter.start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

  var md = new MusicData(app);

  md.init(function(err){
    if(err) return console.log('DB err:', err);
    console.log('DBs ready');
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});