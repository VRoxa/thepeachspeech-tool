import React, { useEffect, useState } from 'react';
import { Text, render, Box } from 'ink';
import { setup } from './modules/setup';
import { MainMenu } from './components/MainMenu';
import { Exit } from './components/common/Exit';
import { global } from './environment/global';
import { Header } from './components/Header';

enum AppState {
  SettingUp,
  Setup,
  Failed
}

const main = async () => {
  const App = () => {
    const [error, setError] = useState<Error>(null);
    const [state, setState] = useState(AppState.SettingUp);

    useEffect(() => {
      setup()
        .then(manager => {
          global.manager = manager;
          setState(AppState.Setup);
        })
        .catch(error => {
          setError(error);
          setState(AppState.Failed);
        });
    }, []);

    return (
      <>
        <Header />
        {state === AppState.SettingUp && 
          <Box marginBottom={1}>
            <Text color='gray'>🕗 Setting the repository up...</Text>
          </Box>
        }
        {state === AppState.Setup && <MainMenu />}
        {state === AppState.Failed && <Text color='red'>❌ {error.message}</Text>}
        <Exit />
      </>
    );
  }

  render(<App />);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});