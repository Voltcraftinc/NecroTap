// src/components/PhantsComponent.tsx

import React, { useState, useEffect, useCallback } from 'react';

interface Phant {
  id: number;
  name: string;
  description: string;
  image: string;
  requiredTrinket: number;
  requiredTrinketLevel: number;
  wraithiumShards: number;
}

interface Trinket {
  id: number;
  name: string;
  level: number;
}

interface PhantsComponentProps {
  trinkets: Trinket[];
  discoveredPhants: Phant[];
  setDiscoveredPhants: React.Dispatch<React.SetStateAction<Phant[]>>; // Updated prop to pass the setter
}

// Move phantsData outside of the component to avoid it being recreated every render
const phantsData = [
  {
    id: 1,
    name: 'Spectrawisp',
    description: 'A flickering entity, barely held together by the fabric of reality.',
    image: '/assets/phants/spectrawisp.png.png',
    requiredTrinket: 14,
    requiredTrinketLevel: 12,
    chanceToFind: 0.1,  // 10% chance to find
    wraithiumShards: 25,
  },
  {
    id: 2,
    name: 'Voidling',
    description: 'A shadowy figure born from the dark spaces between worlds.',
    image: '/assets/phants/voidling.png.png',
    requiredTrinket: 7,
    requiredTrinketLevel: 20,
    chanceToFind: 0.08,  // 8% chance to find
    wraithiumShards: 50,
  },
  {
    id: 3,
    name: 'Skulkrot',
    description: 'An ancient phantom that decays as it drifts, leaving traces of itself behind.',
    image: '/assets/phants/skulkrot.png.png',
    requiredTrinket: 3,
    requiredTrinketLevel: 45,
    chanceToFind: 0.07,  // 7% chance to find
    wraithiumShards: 75,
  },
  {
    id: 4,
    name: 'Grimtentacle',
    description: 'A twisted, sinister figure whose tendrils seek out life to drain.',
    image: '/assets/phants/grimtentacle.png.png',
    requiredTrinket: 19,
    requiredTrinketLevel: 60,
    chanceToFind: 0.05,  // 5% chance to find
    wraithiumShards: 100,
  },
  {
    id: 5,
    name: 'Shadelurk',
    description: 'A stealthy spirit that hides in dark corners, feeding off fear.',
    image: '/assets/phants/shadelurk.png.png',
    requiredTrinket: 2,
    requiredTrinketLevel: 30,
    chanceToFind: 0.09,  // 9% chance to find
    wraithiumShards: 65,
  },
  {
    id: 6,
    name: 'Glowhaunt',
    description: 'A softly glowing entity that lingers where tragic events took place.',
    image: '/assets/phants/glowhaunt.png.png',
    requiredTrinket: 6,
    requiredTrinketLevel: 10,
    chanceToFind: 0.06,  // 6% chance to find
    wraithiumShards: 30,
  },
  {
    id: 7,
    name: 'Dripghast',
    description: 'A haunting presence, constantly weeping, both physically and spiritually.',
    image: '/assets/phants/dripghast.png.png',
    requiredTrinket: 15,
    requiredTrinketLevel: 50,
    chanceToFind: 0.04,  // 4% chance to find
    wraithiumShards: 85,
  },
  {
    id: 8,
    name: 'Orbobeast',
    description: 'A large, rounded phantom that watches, waiting for the right moment to strike.',
    image: '/assets/phants/orbobeast.png.png',
    requiredTrinket: 10,
    requiredTrinketLevel: 40,
    chanceToFind: 0.03,  // 3% chance to find
    wraithiumShards: 90,
  },
  {
    id: 9,
    name: 'Blushphant',
    description: 'A delicate and deceivingly innocent specter with a sinister edge.',
    image: '/assets/phants/blushphant.png.png',
    requiredTrinket: 13,
    requiredTrinketLevel: 15,
    chanceToFind: 0.08,  // 8% chance to find
    wraithiumShards: 40,
  },
  {
    id: 10,
    name: 'Wailgloom',
    description: 'A sorrowful creature, constantly leaking its sadness into the world.',
    image: '/assets/phants/wailgloom.png.png',
    requiredTrinket: 8,
    requiredTrinketLevel: 25,
    chanceToFind: 0.07,  // 7% chance to find
    wraithiumShards: 60,
  },
  {
    id: 11,
    name: 'Doomcap',
    description: 'An eerie fungus-like Phant that spreads corruption as it moves.',
    image: '/assets/phants/doomcap.png.png',
    requiredTrinket: 5,
    requiredTrinketLevel: 35,
    chanceToFind: 0.06,  // 6% chance to find
    wraithiumShards: 70,
  },
  {
    id: 12,
    name: 'Shadewhisk',
    description: 'A sleek, fast-moving shadow spirit that vanishes just before it strikes.',
    image: '/assets/phants/shadewhisk.png.png',
    requiredTrinket: 4,
    requiredTrinketLevel: 28,
    chanceToFind: 0.07,  // 7% chance to find
    wraithiumShards: 50,
  },
  {
    id: 13,
    name: 'Mawblight',
    description: 'A pink, gaping-mouthed entity that consumes everything in its path.',
    image: '/assets/phants/mawblight.png.png',
    requiredTrinket: 12,
    requiredTrinketLevel: 48,
    chanceToFind: 0.05,  // 5% chance to find
    wraithiumShards: 80,
  },
  {
    id: 14,
    name: 'Bubblenight',
    description: 'A floating phantom, expanding and contracting as if trapped in an eternal gasp.',
    image: '/assets/phants/bubblenight.png.png',
    requiredTrinket: 9,
    requiredTrinketLevel: 18,
    chanceToFind: 0.09,  // 9% chance to find
    wraithiumShards: 55,
  },
  {
    id: 15,
    name: 'Grinspawn',
    description: 'This twisted, malformed entity always wears a disturbing grin as it hunts.',
    image: '/assets/phants/grinspawn.png.png',
    requiredTrinket: 11,
    requiredTrinketLevel: 38,
    chanceToFind: 0.06,  // 6% chance to find
    wraithiumShards: 65,
  },
  {
    id: 16,
    name: 'Driftsoul',
    description: 'A wandering spirit that haunts forgotten places, tethered to nothing.',
    image: '/assets/phants/driftsoul.png.png',
    requiredTrinket: 16,
    requiredTrinketLevel: 55,
    chanceToFind: 0.05,  // 5% chance to find
    wraithiumShards: 90,
  },
  {
    id: 17,
    name: 'Hollowgaze',
    description: 'A spectral entity with a hollow, gaping void for a face, staring endlessly.',
    image: '/assets/phants/hollowgaze.png.png',
    requiredTrinket: 20,
    requiredTrinketLevel: 60,
    chanceToFind: 0.05,  // 5% chance to find
    wraithiumShards: 110,
  },
  {
    id: 18,
    name: 'Plasmagrot',
    description: 'A slimy, purple Phant that spreads a toxic aura wherever it floats.',
    image: '/assets/phants/plasmagrot.png.png',
    requiredTrinket: 18,
    requiredTrinketLevel: 50,
    chanceToFind: 0.04,  // 4% chance to find
    wraithiumShards: 85,
  },
  {
    id: 19,
    name: 'Weepmask',
    description: 'A sorrowful, mask-wearing ghoul whose silent tears speak of great loss.',
    image: '/assets/phants/weepmask.png.png',
    requiredTrinket: 17,
    requiredTrinketLevel: 30,
    chanceToFind: 0.06,  // 6% chance to find
    wraithiumShards: 60,
  },
  {
    id: 20,
    name: 'Eyewail',
    description: 'A single-eyed Phant that mourns the loss of its other senses, wailing endlessly.',
    image: '/assets/phants/eyewail.png.png',
    requiredTrinket: 21,
    requiredTrinketLevel: 62,
    chanceToFind: 0.05,  // 5% chance to find
    wraithiumShards: 100,
  },

{
    id: 21,
    name: 'Globchild',
    description: 'A small but powerful creature, hiding its strength behind innocent eyes.',
    image: '/assets/phants/globchild.png.png',
    requiredTrinket: 22,
    requiredTrinketLevel: 25,
    chanceToFind: 0.07,  // 7% chance to find
    wraithiumShards: 55,
  },
  {
    id: 22,
    name: 'Screamclaw',
    description: 'A ghoulish beast with sharp claws and a scream that can pierce the veil between worlds.',
    image: '/assets/phants/screamclaw.png.png',
    requiredTrinket: 23,
    requiredTrinketLevel: 35,
    chanceToFind: 0.05,  // 5% chance to find
    wraithiumShards: 75,
  },
  {
    id: 23,
    name: 'Pinksoul',
    description: 'A mischievous spirit with a disturbing smile, always lurking in the shadows.',
    image: '/assets/phants/pinksoul.png.png',
    requiredTrinket: 24,
    requiredTrinketLevel: 15,
    chanceToFind: 0.09,  // 9% chance to find
    wraithiumShards: 45,
  },
  {
    id: 24,
    name: 'Wraithcoil',
    description: 'A coiled, serpent-like entity that silently slithers between dimensions.',
    image: '/assets/phants/wraithcoil.png.png',
    requiredTrinket: 25,
    requiredTrinketLevel: 50,
    chanceToFind: 0.04,  // 4% chance to find
    wraithiumShards: 85,
  },
  {
    id: 25,
    name: 'Slugmaul',
    description: 'A slow-moving, slug-like phantom that leaves a corrosive trail behind.',
    image: '/assets/phants/slugmaul.png.png',
    requiredTrinket: 26,
    requiredTrinketLevel: 40,
    chanceToFind: 0.06,  // 6% chance to find
    wraithiumShards: 70,
  },
  {
    id: 26,
    name: 'Shadelimp',
    description: 'A limping, deformed creature, once powerful but now broken and seeking revenge.',
    image: '/assets/phants/shadelimp.png.png',
    requiredTrinket: 27,
    requiredTrinketLevel: 45,
    chanceToFind: 0.05,  // 5% chance to find
    wraithiumShards: 75,
  }
  // Add more Phants here if needed
];

const PhantsComponent: React.FC<PhantsComponentProps> = ({
  trinkets,
  discoveredPhants,
  setDiscoveredPhants,
}) => {
  const [phantXP, setPhantXP] = useState<{ [key: number]: number }>({});
  const [phantLevels, setPhantLevels] = useState<{ [key: number]: number }>({});

  // Memoize hasRequiredTrinket to prevent it from changing on every render
  const hasRequiredTrinket = useCallback(
    (phant: Phant): boolean => {
      const trinket = trinkets.find((t) => t.id === phant.requiredTrinket);
      return trinket ? trinket.level >= phant.requiredTrinketLevel : false;
    },
    [trinkets] // Only recompute when trinkets change
  );

  // Memoize gainXP to prevent recreating on every render
  const gainXP = useCallback(
    (phantId: number) => {
      setPhantXP((prevXP) => {
        const currentXP = prevXP[phantId] || 0;
        const newXP = currentXP + 10; // Adjust the XP increment logic as needed

        const level = phantLevels[phantId] || 1;
        if (newXP >= level * 100) {
          setPhantLevels((prevLevels) => ({
            ...prevLevels,
            [phantId]: level + 1,
          }));
          return {
            ...prevXP,
            [phantId]: newXP - level * 100, // Reset XP after level up
          };
        }

        return {
          ...prevXP,
          [phantId]: newXP,
        };
      });
    },
    [phantLevels]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      discoveredPhants.forEach((phant) => {
        gainXP(phant.id); // Gain XP for each discovered phant
      });
    }, 5000); // Increase XP every 5 seconds

    return () => clearInterval(interval);
  }, [discoveredPhants, gainXP]);

  useEffect(() => {
    const interval = setInterval(() => {
      phantsData.forEach((phant) => {
        if (
          !discoveredPhants.some((p) => p.id === phant.id) &&
          hasRequiredTrinket(phant)
        ) {
          setDiscoveredPhants((prevPhants) => [...prevPhants, phant]);
        }
      });
    }, 10000); // Randomly "discover" phants every 10 seconds

    return () => clearInterval(interval);
  }, [discoveredPhants, hasRequiredTrinket, setDiscoveredPhants]);

  return (
    <div className="phant-list">
      <div className="phant-grid">
        {phantsData.map((phant) => {
          const isOwned = discoveredPhants.some((p) => p.id === phant.id);
          const level = phantLevels[phant.id] || 1;
          const xp = phantXP[phant.id] || 0;
          const xpToNextLevel = level * 100;

          return (
            <div key={phant.id} className="phant-item">
              <img src={phant.image} alt={phant.name} className="phant-image" />
              <div className="phant-info">
                <div className="name">{phant.name}</div>
                <div className="description">{phant.description}</div>
                {isOwned ? (
                  <>
                    <div className="owned-status" style={{ color: 'red' }}>OWNED</div>
                    <div className="level">Level: {level}</div>
                    <div className="xp-bar">
                      XP: {xp}/{xpToNextLevel}
                      <div
                        className="xp-fill"
                        style={{ width: `${(xp / xpToNextLevel) * 100}%`, background: 'green' }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="requirement">
                      Requires: {trinkets.find((t) => t.id === phant.requiredTrinket)?.name} (Level {phant.requiredTrinketLevel})
                    </div>
                    {!hasRequiredTrinket(phant) && (
                      <div className="warning">You don't meet the requirements yet</div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhantsComponent;