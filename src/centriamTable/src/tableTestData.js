import CentriamColumnConfig from './centriamTable/CentriamColumnConfig.js';
import CentriamTableCell from './centriamTable/CentriamTableCell.js';
import RankCell from './sample_extensions/RankCell.js';
import TeacherCell from './sample_extensions/TeacherCell.js';
import FavoriteCell from './sample_extensions/FavoriteCell.js';



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
 *
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

class Favorites{
    constructor({food, technique, color}){
        this.food = food;
        this.technique = technique;
        this.color = color;
    }


}


class Character {
    constructor({name, dream, rank, quote, teacher, favorites}){
        this.name = name;
        this.dream = dream;
        this.rank = rank;
        this.teacher = teacher;
        this.quote = quote;
        this.favorites = favorites;
    }
}

var jiraiya = new Character({
    name: 'Jiraya',
    dream: 'To see an Icha Icha movie',
    rank: 'Jonin',
    favoriteFood: 'Fried Chicken',
    quote: null,
    teacher: null,
    favorites: new Favorites({
        food: 'Karaage',
        technique: 'Summoning',
        color: 'Red'
    })
});

var minato = new Character({
    name: 'Minato',
    dream: 'To win the war',
    rank: 'Hokage',
    quote: null,
    teacher: jiraiya,
    favorites: new Favorites({
        food: 'Ramen',
        technique: 'Hirashin',
        color: 'Yellow'
    })
});

var kakashi = new Character({
    name: 'Kakashi Hatake',
    dream: 'Not your business',
    rank: 'Jonin',
    favoriteFood: '',
    quote: 'Maa... Maa...',
    teacher: minato,
    favorites: new Favorites({
        food: 'Miso Soup',
        technique: 'Chidori',
        color: 'Orange'
    })
});


var naruto = new Character({
        name: 'Naruto Uzumaki',
        dream: 'Be Hokage',
        rank: 'Genin',
        favoriteFood: 'Ramen',
        quote: 'Believe it!',
        teacher: kakashi,
        favorites: new Favorites({
            food: 'Ramen',
            technique: 'Rasengan',
            color: 'Orange'
        }),
    });

var sasuke = new Character({
    name: 'Sasuke Uchiha',
    dream: 'Kill a certain man',
    rank: 'Genin',
    quote: 'Hn...',
    teacher:  kakashi,
    favorites: new Favorites({
        food: 'Tomatoes',
        technique: 'Chidori',
        color: 'Blue'
    })
});

var sakura = new Character({
    name: 'Sakura Haruno',
    dream: 'Get Sasuke',
    rank: 'Chunin',
    quote: 'Shannaro!',
    teacher: kakashi,
    favorites: new Favorites({
        food: 'Dumplings',
        technique: 'Punching the Ground',
        color: 'Pink'
    })
});

var kurenai = new Character({
    name: 'Kurenai Yuuhei',
    dream: null,
    teacher: null,
    rank: 'Jonin',
    quote: null,
    favorites: new Favorites({
        food: 'Takowasa',
        technique: 'Crimson Leaf Dream',
        color: 'Red'
    })
});

var hinata = new Character({
    name: 'Hinata Hyūga',
    dream: 'To unite her family',
    rank: 'Chunin',
    quote: null,
    teacher: kurenai,
    favorites: new Favorites({
        food: 'Cinnamon Buns',
        technique: 'Twin lion fists',
        color: 'Dark Purple'
    })
});

var kiba = new Character({
    name: "Kiba Inuzuka",
    dream: null,
    rank: 'Chunin',
    quote: null,
    teacher: kurenai,
    favorites: new Favorites({
        food: 'Meat',
        technique: "Gatsuuga",
        color: 'Red'
    })
});


var shino = new Character({
    name: "Shino Aburame",
    dream: null,
    rank: 'Chunin',
    quote: null,
    teacher: kurenai,
    favorites: new Favorites({
        food: 'Salad',
        technique: "Kikachu",
        color: 'Grey'
    })
});

var asuma = new Character({
    name: "Asuma Sarutobi",
    dream: null,
    rank: 'Jonin',
    quote: null,
    teacher: null,
    favorites: new Favorites({
        food: 'Sasuage with soba',
        technique: "Ash Explosion",
        color: 'Red'
    })
});

var shikamaru = new Character({
    name: "Shikamaru Nara",
    dream: null,
    rank: 'Jonin',
    quote: 'Troublesome...',
    teacher: asuma,
    favorites: new Favorites({
        food: 'Mackerel',
        technique: "Shadow possession",
        color: 'Black'
    })
});


var choji = new Character({
    name: "Choji Akamichi",
    dream: null,
    rank: 'Chunin',
    quote: null,
    teacher: asuma,
    favorites: new Favorites({
        food: 'Everything',
        technique: "Body Expansion",
        color: 'Blue'
    })
});

var ino = new Character({
    name: "Ino Yamanaka",
    dream: null,
    rank: 'Chunin',
    quote: null,
    teacher: asuma,
    favorites: new Favorites({
        food: 'Salad',
        technique: "Mind switch",
        color: 'Blue'
    })
});

let data = [
    naruto,
    jiraiya,
    kakashi,
    minato,
    sasuke,
    sakura,
    kurenai,
    hinata,
    shino,
    kiba,
    asuma,
    shikamaru,
    choji,
    ino
];


let columns = [
    new CentriamColumnConfig({
        key: 'name',
        label: 'Name',
        displayComponent: CentriamTableCell,
        minWidth: 50,
        growth: 2,
    }),
    new CentriamColumnConfig({
        key: 'dream',
        label: 'Dream',
        displayComponent: CentriamTableCell,
        minWidth: 50,
        growth: 1,
    }),
    new CentriamColumnConfig({
        key: 'rank',
        label: 'Rank',
        displayComponent: RankCell,
        minWidth: 50,
        growth: 2,
    }),
    new CentriamColumnConfig({
        key: 2,
        propKey: 'favorites',
        label: 'Favorite Food',
        displayComponent: FavoriteCell,
        minWidth: 50,
        growth: 1,
        additionalConfig: {
            favoriteKey: 'food'
        }
    }),
    new CentriamColumnConfig({
        key: 1,
        propKey: 'favorites',
        label: 'Signature Technique',
        displayComponent: FavoriteCell,
        minWidth: 50,
        growth: 2,
        additionalConfig: {
            favoriteKey: 'technique'
        }
    }),
    new CentriamColumnConfig({
        key: 'quote',
        label: 'Quote',
        displayComponent: CentriamTableCell,
        minWidth: 50,
        growth: 5,
    }),
    new CentriamColumnConfig({
        key: 'teacher',
        label: 'Teacher',
        displayComponent: TeacherCell,
        minWidth: 50,
        growth: 2,
    })
];


let data2 = [
    {name: "A", value: 2},
    {name: "D", value: 3},
    {name: "C", value: 4},
    {name: "B", value: 1}
];

let columns2 = [
    new CentriamColumnConfig({
        key: 'name',
        label: 'name',
        displayComponent: CentriamTableCell,
        minWidth: 50,
        growth: 2,
    }),
    new CentriamColumnConfig({
        key: 'value',
        label: 'value',
        displayComponent: CentriamTableCell,
        minWidth: 50,
        growth: 5,
    })
];

export {data, data2, columns, columns2}