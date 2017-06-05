import CentriamColumnConfig from '../centriamTable/CentriamColumnConfig.js';
import CentriamTableCell from '../centriamTable/CentriamTableCell.js';
import {D, BAB} from 'supportingTestClasses.js';


/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 * NOTE: NOTHING IN THIS FILE IS USED FOR THE APPLICATION. THIS IS TEST DATA
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */




class CharacterClass {
  constructor({name, parentClass, hd, bab}){
      this.name = name;
      this.parentClass = parentClass;
      this.hd = hd;
      this.bab = bab;
  }
}

var barbarianSubClasses = [
    "Armored Hulk",
    "Breaker",
    "Brutal Pugilist",
    "Dreadnought",
    "Burn Rider",
    "Drunken Brute",
    "Drunken Rager",
    "Elemental Kin",
    "Fearsome Defender",
    "Flesheater",
    "Hurler",
    "Invulnerable Rager",
    "Jungle Rager",
    "Liberator",
    "Mad Dog",
    "Mooncursed",
    "Mounted Fury",
    "Pack Rager",
    "Primal Hunter",
    "Raging Cannibal",
    "Savage Barbarian",
    "Savage Technologist",
    "Scarred Rager",
    "Sea Reaver",
    "Superstitious",
    "Titan Mauler(see errata)",
    "Totem Warrior  (see errata)",
    "True Primitive",
    "Untamed Rager",
    "Urban Barbarian",
    "Wild Rager",
    "Feral Gnasher (Goblin)",
    "Hateful Rager  (Half-orc)",
    "Serene Barbarian",
    "Flaming Crab Games",
    "Berserker",
    "Mutagenic Rager",
    "Bedlam Seeker",
    "Totemic Sage",
    "Savage Tactician",
    "Henge Emishi (Hengeyokai)",
    "Jotunkin",
    "Blacksnake",
    "Cloakfighter",
    "Harrier",
    "Physical Exemplar",
    "Spellhammer",
    "Weapon Champion",
    "Youxia",
];

const barbarian = new CharacterClass({
    name: "Barbarian",
    parentClass: null,
    hd: D.D12,
    bab: BAB.HIGH
});



const bard = new CharacterClass({
    name: "Bard",
    parentClass: null,
    hd: D.D8,
    bab: BAB.MEDIUM
});

bardSubClasses = [
    "Animal Speaker",
    "Arbiter",
    "Arcane Duelist",
    "Archaeologist",
    "Arcane Healer",
    "Archivist",
    "Arrowsong Minstrel",
    "Buccaneer",
    "Celebrity",
    "Court Bard",
    "Court Fool",
    "Daredevil",
    "Demagogue",
    "Dervish Dancer",
    "Dervish of Dawn",
    "Detective",
    "Dirge Bard",
    "Diva",
    "Duettist",
    "Faith Singer",
    "Flame Dancer",
    "Geisha",
    "Hoaxer",
    "Impervious Messenger",
    "Juggler",
    "Lotus Geisha",
    "Magician",
    "Masked Performer",
    "Mute Musician",
    "Negotiator",
    "Phrenologist",
    "Provocatuer",
    "Ringleader",
    "Sandman",
    "Savage Skald",
    "Sea Singer",
    "Silver Balladeer",
    "Solacer",
    "Songhealer",
    "Sorrowsoul",
    "Sound Striker",
    "Street Performer",
    "Studious Librarian",
    "Thundercaller",
    "Voice of the Wild",
    "Wit",
    "Masterpieces*",
    "Dragon Herald (Kobold)",
    "Dragon Yapper (Kobold)",
    "Prankster (Gnome)",
    "Shadow Puppeteer (Wayang)",
    "Watersinger (Undine)",
    "Bardic Weapon",
    "Violent Performance",
    "Serenader",
    "Weird Musician",
    "Gypsy",
    "Soul Muse",
    "Moso",
    "Singer of Wisdom",
    "Umbral Weaver",
    "Blacksnake",
    "Cloakfighter",
    "Harrier",
    "Physical Exemplar",
    "Spellhammer",
    "Weapon Champion",
    "Youxia",
  ];


let data = [
    barbarian,
    bard
];

data = data.concat(
    bardSubClasses.map(function(className) {
        return new CharacterClass({
            name: className,
            parentClass: bard,
            hd: bard.hd,
            bab: bard.bab
        })
    }),
    barbarianSubClasses.map(function(className){
        return new CharacterClass({
            name: className,
            parentClass: barbarian,
            hd: barbarian.hd,
            bab: barbarian.bab
        });
    })
);


let columns = [
    new CentriamColumnConfig({
        key: "name",
        label: "Name",
    }),
    new CentriamColumnConfig({
        key: "parentClass",
        label: "Subclass of",
    }),
    new CentriamColumnConfig({
        key: "Hit Die Size",
        label: "hd",
        formattingFunction: function(data){return data.val;}
    }),
    new CentriamColumnConfig({
        key: "bab",
        label: "Base Attack Bonus",
        formattingFunction: function(data){return data.val;}
    })
];


export {data, columns}