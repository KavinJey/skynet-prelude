import { createContext, useState, useEffect } from "react";
import { DacLibrary, MySky, SkynetClient } from "skynet-js";
import { FileSystemDAC } from "fs-dac-library";
import * as Kokoro from "kokoro";

// To import DAC, uncomment here, and 2 spots below.
// import { ContentRecordDAC } from '@skynetlabs/content-record-library';
import { UserProfileDAC } from "@skynethub/userprofile-library";
import { SIA_DATA_DOMAIN, SIA_PORTAL } from "./store";

interface ISkynetContext {
  client?: SkynetClient;
  mySky?: MySky;
  userProfile?: UserProfileDAC;
  fileSystem?: FileSystemDAC;
  dataDomain?: string;
  player?: Kokoro.IState;
}

const SkynetContext = createContext<ISkynetContext>(undefined);

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal = SIA_PORTAL;

// Initiate the SkynetClient
const client = new SkynetClient(portal);

// Initiate userprofile and filesystem dacs
const userProfile = new UserProfileDAC();
const fileSystem = new FileSystemDAC();

const playerInitialize = new Kokoro.Kokoro();
const playerState = playerInitialize.getState();

const dataDomain = SIA_DATA_DOMAIN;

const SkynetProvider = ({ children }) => {
  const [skynetState, setSkynetState] = useState<ISkynetContext>({
    client,
    mySky: null,
    userProfile,
    fileSystem,
    dataDomain,
    player: playerState,
  });

  useEffect(() => {
    // define async setup function
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain, {
          debug: true,
          // dev: true,
        });
        const player = skynetState.player;

        // load necessary DACs and permissions
        // Uncomment line below to load DACs
        // await mySky.loadDacs(contentRecord);

        await mySky.loadDacs(fileSystem as any as DacLibrary);
        await mySky.loadDacs(userProfile);

        // replace mySky in state object
        setSkynetState({ ...skynetState, mySky, player, fileSystem });
      } catch (e) {
        console.error(e);
      }
    }

    // call async setup function
    if (!skynetState.mySky) {
      initMySky();
    }

    return () => {
      if (skynetState.mySky) {
        skynetState.mySky.destroy();
      }
    };
  }, [skynetState]);

  return (
    <SkynetContext.Provider value={skynetState}>
      {children}
    </SkynetContext.Provider>
  );
};

export { SkynetContext, SkynetProvider };
