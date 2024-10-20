import React, { useState, useEffect } from 'react';
import './index.css'; // Import the updated styles
import PhantsComponent from './components/PhantsComponent'; // Updated to PhantsComponent

const Game: React.FC = () => {
  const [mutabytes, setMutabytes] = useState<number>(0); // Track earned mutabytes
  const [energy, setEnergy] = useState<number>(6500); // Energy system
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]); // Track click animations
  const [mutabytesPerTap, setMutabytesPerTap] = useState<number>(1); // Mutabytes per tap
  // const [wraithiumShards, setWraithiumShards] = useState<number>(0); // Wraithium shards starting at 0
  const [boostBoxVisible, setBoostBoxVisible] = useState<boolean>(false); // Show/hide boost box
  const [hpIncreaseCost, setHpIncreaseCost] = useState<number>(1500); // Cost for increasing HP
  const [tapPowerCost, setTapPowerCost] = useState<number>(100); // Cost for increasing Tap Power
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false); // Overlay visibility state
  const [currentOverlay, setCurrentOverlay] = useState<string | null>(null); // Track which overlay is active
  const [discoveredPhants, setDiscoveredPhants] = useState<Phants[]>([]); // State for discovered Phants

  // PHANTS INTERFACE
  interface Phants {
    id: number;
    name: string;
    description: string;
    image: string;
    requiredTrinket: number;
    requiredTrinketLevel: number;
    wraithiumShards: number;
  }


// Trinket assets
const [trinkets, setTrinkets] = useState([
  {
    id: 1,
    name: 'Eye of the Eternal',
    level: 0,
    description: 'A mystical eye that watches over all realms, never blinking.',
    cost: 184,
    image: '/assets/trinkets/eye_of_the_eternal.png',
  },
  {
    id: 2,
    name: 'Lumina Spire',
    level: 0,
    description: 'A radiant spire said to hold the light of lost worlds.',
    cost: 450,
    image: '/assets/trinkets/lumina_spire.png',
  },
  {
    id: 3,
    name: 'Chrono Pillar',
    level: 0,
    description: 'A pillar believed to manipulate the flow of time within its radius.',
    cost: 864,
    image: '/assets/trinkets/chrono_pillar.png',
  },
  {
    id: 4,
    name: 'Shard of Voidglass',
    level: 0,
    description: 'A fragment from the shattered edge of the universe, brimming with dark energy.',
    cost: 1527,
    image: '/assets/trinkets/shard_of_voidglass.png',
  },
  {
    id: 5,
    name: 'Orbitron Disc',
    level: 0,
    description: 'A device once used to track celestial movements beyond the stars.',
    cost: 390,
    image: '/assets/trinkets/orbitron_disc.png',
  },
  {
    id: 7,
    name: 'Flame of the Forgotten',
    level: 0,
    description: 'An ancient flame that burns with the memories of the lost and forsaken.',
    cost: 545,
    image: '/assets/trinkets/flame_of_the_forgotten.png',
  },
  {
    id: 8,
    name: 'Vessel of Wraithstone',
    level: 0,
    description: 'A jar containing the remains of long-forgotten wraiths, still whispering in the dark.',
    cost: 1601,
    image: '/assets/trinkets/vessel_of_wraithstone.png',
  },
  {
    id: 9,
    name: 'Totem of Whisperwood',
    level: 0,
    description: 'A carved totem from a haunted forest, said to whisper secrets to its bearer.',
    cost: 1174,
    image: '/assets/trinkets/totem_of_whisperwood.png',
  },
  {
    id: 10,
    name: 'Oculus Blade',
    level: 0,
    description: 'A weapon that sees through the void, allowing its wielder to strike with unerring precision.',
    cost: 462,
    image: '/assets/trinkets/oculus_blade.png',
  },
  {
    id: 11,
    name: 'Void Key',
    level: 0,
    description: 'A key that unlocks forbidden realms, feared by even the bravest explorers.',
    cost: 350,
    image: '/assets/trinkets/void_key.png',
  },
  {
    id: 12,
    name: 'Sigil of Sorrow',
    level: 0,
    description: 'A symbol of endless grief, used in rituals to commune with the beyond.',
    cost: 1639,
    image: '/assets/trinkets/sigil_of_sorrow.png',
  },
  {
    id: 13,
    name: 'Helm of the Warden',
    level: 0,
    description: 'The helm of an ancient guardian, worn to protect the realm between life and death.',
    cost: 245,
    image: '/assets/trinkets/helm_of_the_warden.png',
  },
  {
    id: 14,
    name: 'Skull of the Forsaken',
    level: 0,
    description: 'A cursed relic, once worn by those who were cast into the abyss and forgotten.',
    cost: 1438,
    image: '/assets/trinkets/skull_of_the_forsaken.png',
  },
  {
    id: 15,
    name: 'Guardian’s Crest',
    level: 0,
    description: 'A protective crest used to ward off malevolent forces.',
    cost: 350,
    image: '/assets/trinkets/guardians_crest.png',
  },
  {
    id: 16,
    name: 'Sting of the Firstborn',
    level: 0,
    description: 'A ceremonial blade, said to draw the first blood in every battle.',
    cost: 1589,
    image: '/assets/trinkets/sting_of_the_firstborn.png',
  },
  {
    id: 17,
    name: 'Chrono Dial',
    level: 0,
    description: 'A timepiece that can briefly alter the flow of events when turned.',
    cost: 404,
    image: '/assets/trinkets/chrono_dial.png',
  },
  {
    id: 18,
    name: 'Orb of Dimensia',
    level: 0,
    description: 'A small orb that views across dimensions, revealing strange and distant places.',
    cost: 1413,
    image: '/assets/trinkets/orb_of_dimensia.png',
  },
  {
    id: 19,
    name: 'Wraith’s Howl',
    level: 0,
    description: 'A spectral mask that echoes the haunting cries of the dead.',
    cost: 200,
    image: '/assets/trinkets/wraiths_howl.png',
  },
  {
    id: 20,
    name: 'Mask of the Hollow',
    level: 0,
    description: 'A mask worn by those who lost their souls to the void.',
    cost: 980,
    image: '/assets/trinkets/mask_of_the_hollow.png',
  },
  {
    id: 21,
    name: 'Nether Core',
    level: 0,
    description: 'The pulsating heart of an ancient machine, powered by dark energy.',
    cost: 1504,
    image: '/assets/trinkets/nether_core.png',
  },
  {
    id: 22,
    name: 'Eye of Perdition',
    level: 0,
    description: 'An ominous eye that sees into the future, foretelling doom.',
    cost: 825,
    image: '/assets/trinkets/eye_of_perdition.png',
  },
  {
    id: 23,
    name: 'Vilehorn Idol',
    level: 0,
    description: 'A twisted idol worshipped in dark rites, promising power at a steep price.',
    cost: 1488,
    image: '/assets/trinkets/vilehorn_idol.png',
  },
  {
    id: 24,
    name: 'Sigil of the Nexus',
    level: 0,
    description: 'A symbol of power connecting all dimensions, used to traverse realities.',
    cost: 1705,
    image: '/assets/trinkets/sigil_of_the_nexus.png',
  },
  {
    id: 25,
    name: 'Cyclopean Visage',
    level: 0,
    description: 'A floating eye said to be the last remnant of an ancient god.',
    cost: 323,
    image: '/assets/trinkets/cyclopean_visage.png',
  },
  {
    id: 27,
    name: 'Void Spindle',
    level: 0,
    description: 'A device that spins the very fabric of reality, warping it to the user’s will.',
    cost: 404,
    image: '/assets/trinkets/void_spindle.png',
  },
  {
    id: 28,
    name: 'Eclipse Monolith',
    level: 0,
    description: 'A towering structure aligned with cosmic events, unlocking hidden power.',
    cost: 1980,
    image: '/assets/trinkets/eclipse_monolith.png',
  },
  {
    id: 29,
    name: 'Omen Orb',
    level: 0,
    description: 'A crystal sphere used by seers to predict disasters before they strike.',
    cost: 512,
    image: '/assets/trinkets/omen_orb.png',
  },
  {
    id: 30,
    name: 'Prism of the Abyss',
    level: 0,
    description: 'A sharp crystal that captures light from the deepest, darkest realms.',
    cost: 1857,
    image: '/assets/trinkets/prism_of_the_abyss.png',
  },
  ]);

  // Handle purchase of a trinket
  const handlePurchase = (trinketId: number) => {
    setTrinkets((prevTrinkets) =>
      prevTrinkets.map((trinket) => {
        if (trinket.id === trinketId && mutabytes >= trinket.cost) {
          setMutabytes(mutabytes - trinket.cost); // Deduct mutabytes
          return {
            ...trinket,
            level: trinket.level + 1, // Increase the level
            cost: trinket.cost * 2, // Double the cost
          };
        }
        return trinket;
      })
    );
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left; // X coordinate relative to the orb
      const y = e.clientY - rect.top; // Y coordinate relative to the orb

      setMutabytes(mutabytes + mutabytesPerTap); // Add mutabytes
      setEnergy(energy - 1); // Decrease energy
      setClicks([...clicks, { id: Date.now(), x, y }]); // Track click animation
    }
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id)); // Remove animation after it ends
  };

  // Energy regeneration over time
  useEffect(() => {
    const energyInterval = setInterval(() => {
      if (energy < 6500) {
        setEnergy(energy + 1);
      }
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [energy]);

  // Function to show the overlay box for a given type (Phants, Trinkets, etc.)
  const handleOverlayClick = (overlayType: string) => {
    setCurrentOverlay(overlayType);
    setOverlayVisible(true);
  };

  // Close the overlay box
  const handleCloseOverlay = () => {
    setOverlayVisible(false);
    setCurrentOverlay(null);
  };

  const handleBoostClick = () => {
    setBoostBoxVisible(true);
  };

  const handleCloseBoostBox = () => {
    setBoostBoxVisible(false);
  };

  const increaseTapPower = () => {
    if (mutabytes >= tapPowerCost) {
      setMutabytes(mutabytes - tapPowerCost);
      setMutabytesPerTap(mutabytesPerTap + 1);
      setTapPowerCost(tapPowerCost * 2);
    } else {
      alert('Not enough mutabytes to increase Tap Power!');
    }
  };

  const increaseHP = () => {
    if (mutabytes >= hpIncreaseCost) {
      setMutabytes(mutabytes - hpIncreaseCost);
      setEnergy(energy + 500); // Increase HP by 500
      setHpIncreaseCost(hpIncreaseCost * 2);
    } else {
      alert('Not enough mutabytes to increase HP!');
    }
  };

  return (
    <div className="fixed-container">
      {/* Background */}
      <div className="background-container"></div>

      {/* Logo */}
      <div className="logo-container">
        <img src="/assets/necrotap_logo.png" alt="NecroTap Logo" />
      </div>

      {/* Central Orb with click handler */}
      <div className="central-orb-container" onClick={handleTap}>
        <img src="/assets/orb_spin.gif" alt="Tap Orb" draggable="false" />
        {clicks.map((click) => (
          <div
            key={click.id}
            className="mutabytes-animation"
            style={{
              top: `${click.y - 50}px`,
              left: `${click.x - 25}px`,
            }}
            onAnimationEnd={() => handleAnimationEnd(click.id)}
          >
            <img src="/assets/mutabytes_logo.png" alt="Mutabytes Icon" />
          </div>
        ))}
      </div>

      {/* Mutabytes Earned */}
      <div className="mutabytes-earn-container">
        <img src="/assets/mutabytes_earn.png" alt="Mutabytes Earn" />
        <div className="mutabytes-text">{mutabytes}</div>
      </div>

      {/* Wraithium Shards */}
      <div className="wraithium-earn-container">
        <img src="/assets/wraithiumshards_earn.png" alt="Wraithium Shards" />
      <div className="wraithium-text">{}</div>
      </div>

      {/* Bottom Icon buttons */}
      <div className="icons-container">
        <div className="icon">
          <img
            src="/assets/phants.png"
            alt="Phants"
            onClick={() => handleOverlayClick('Phants')}
          />
        </div>
        <div className="icon">
          <img
            src="/assets/trinkets.png"
            alt="Trinkets"
            onClick={() => handleOverlayClick('Trinkets')}
          />
        </div>
        <div className="icon">
          <img src="/assets/tap.png" alt="Tap" />
        </div>
        <div className="icon">
          <img
            src="/assets/earn.png"
            alt="Earn"
            onClick={() => handleOverlayClick('Earn')}
          />
        </div>
        <div className="icon">
          <img
            src="/assets/haunts.png"
            alt="Haunts"
            onClick={() => handleOverlayClick('Haunts')}
          />
        </div>
      </div>

      {/* HP Bar */}
      <div className="hp-bar">
        <img src="/assets/hp_bar.png" alt="HP Bar" />
        <div className="hp-text">{energy} / 6500</div>
      </div>

       {/* Left Side Icons */}
       <div className="left-icons-container">
        <div className="left-icon" onClick={handleBoostClick}>
          <img src="/assets/boost.png" alt="Boost" />
        </div>
        <div className="left-icon">
          <img src="/assets/invite.png" alt="Invite" />
        </div>
        <div className="left-icon">
          <img src="/assets/leaderboard.png" alt="Leaderboard" />
        </div>
        <div className="left-icon">
          <img src="/assets/settings.png" alt="Settings" />
        </div>
      </div>

      {/* Boost Box */}
      {boostBoxVisible && (
        <div className="boost-box">
          <div className="boost-header">
            <button onClick={handleCloseBoostBox}>X</button>
          </div>
          <div className="boost-content">
            <h3>Increase Tap Power</h3>
            <button onClick={increaseTapPower}>
              +1 Tap Power (Cost: {tapPowerCost} Mutabytes)
            </button>
            <h3>Increase HP</h3>
            <button onClick={increaseHP}>
              +500 HP (Cost: {hpIncreaseCost} Mutabytes)
            </button>
          </div>
        </div>
      )}

      {/* Overlay Box for Phants, Trinkets, Earn, Haunts */}
      {overlayVisible && (
        <div className="overlay-box">
          <div className="overlay-content">

            {/* Phants Overlay */}
            {currentOverlay === 'Phants' && (
              <>
                <img
                  src="/assets/phantstext.png"
                  alt="Phants Title"
                  className="overlay-title-img"
                />
                <p className="overlay-description">
                  Collect phantoms and spirits to generate Wraithium Shards and grow your power.
                </p>
                <div className="overlay-scroll">
                  <div className="inside-box">
                    {/* PhantsComponent to handle rendering of Phants */}
                    <PhantsComponent
                      trinkets={trinkets} // Pass the player's trinkets
                      discoveredPhants={discoveredPhants} // Pass discovered phants
                      setDiscoveredPhants={setDiscoveredPhants} // Pass the setter to update discovered phants
                    />
                  </div>
                </div>
              </>
            )}

            {/* Trinkets Overlay */}
            {currentOverlay === 'Trinkets' && (
              <>
                <img
                  src="/assets/trinketstext.png"
                  alt="Trinkets Title"
                  className="overlay-title-img"
                />
                <p className="overlay-description">
                  Collect ancient relics to boost your Mutabytes and unlock hidden powers.
                </p>
                <div className="overlay-scroll">
                  <div className="inside-box">
                    {trinkets.map((trinket) => (
                      <div key={trinket.id} className="trinket-item">
                        <img
                          src={trinket.image}
                          alt={trinket.name}
                          className="trinket-image"
                        />
                        <div className="trinket-info">
                          <div className="name">{trinket.name}</div>
                          <div className="level">Level: {trinket.level}</div>
                          <div className="description">{trinket.description}</div>
                          <button
                            className="purchase-button"
                            onClick={() => handlePurchase(trinket.id)}
                          >
                            Purchase for {trinket.cost} Mutabytes
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Earn Overlay */}
            {currentOverlay === 'Earn' && (
              <>
                <img
                  src="/assets/earntext.png"
                  alt="Earn Title"
                  className="overlay-title-img"
                />
                <p className="overlay-description">
                  Earn Mutabytes by completing challenges and tasks listed below.
                </p>
                <div className="inside-box">
                  <img
                    src="/assets/inside_box_for_assets.png"
                    alt="Earn Asset 1"
                  />
                  <img
                    src="/assets/inside_box_for_assets.png"
                    alt="Earn Asset 2"
                  />
                </div>
              </>
            )}

            {/* Haunts Overlay */}
            {currentOverlay === 'Haunts' && (
              <>
                <img
                  src="/assets/hauntstext.png"
                  alt="Haunts Title"
                  className="overlay-title-img"
                />
                <p className="overlay-description">
                  Summon and manage your Haunts to gain more power.
                </p>
                <div className="inside-box">
                  <img
                    src="/assets/inside_box_for_assets.png"
                    alt="Haunt Asset 1"
                  />
                  <img
                    src="/assets/inside_box_for_assets.png"
                    alt="Haunt Asset 2"
                  />
                </div>
              </>
            )}

            {/* Close Button */}
            <button
              onClick={handleCloseOverlay}
              className="close-overlay-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;