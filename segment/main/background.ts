import { app, desktopCapturer,  } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import path from 'path';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    for (const source of sources) {
      if (source.name === 'Electron-sample') {
        console.log('come here');
        mainWindow.webContents.send('SET_SOURCE', source.id)
        return
      }
    }
  });

})();

app.on('window-all-closed', () => {
  app.quit();
});

