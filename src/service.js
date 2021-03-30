import { db } from './firebase';
import { getCurrentUser } from './utils';
// export const videos = [
//     {

//         'id': "31ee4649-83c3-4e7c-900e-41a96cbe018e",
//         'url': 'https://firebasestorage.googleapis.com/v0/b/fir-5612c.appspot.com/o/videos%2FBullfinch%20-%202797.mp4?alt=media&token=8ffd149e-8517-4928-85c8-82c91c5c5516',
//         'title': 'Konfuz - Ратата/Ratatatata',
//         'author': 'Nikola Iliev',
//         'authorId': '1',
//         'duration': '00:11',
//         'comments': [
//             {
//                 'user': 'Julia Callaghan',
//                 'comment': 'this playlist is good!'
//             },
//             {
//                 'user': 'Misbah Townsend',
//                 'comment': 'Thank you, I LOVE THE MUSIC is perfect'
//             },
//             {
//                 'user': 'Tymoteusz Lucero',
//                 'comment': 'So cool!!!'
//             }
//         ],
//         'likes': 1242,
//         'dislikes': 354,
//         'views': 325
//     }
// ]
export const videos = [
    {

        'id': "31ee4649-83c3-4e7c-900e-41a96cbe018e",
        'url': 'https://firebasestorage.googleapis.com/v0/b/fir-5612c.appspot.com/o/videos%2FBullfinch%20-%202797.mp4?alt=media&token=8ffd149e-8517-4928-85c8-82c91c5c5516',
        'title': 'Ptichka',
        'author': 'Nikola Iliev',
        'authorId': '1',
        'duration': '00:11',
        'comments': [
            {
                'user': 'Julia Callaghan',
                'comment': 'this playlist is good!'
            },
            {
                'user': 'Misbah Townsend',
                'comment': 'Thank you, I LOVE THE MUSIC is perfect'
            },
            {
                'user': 'Tymoteusz Lucero',
                'comment': 'So cool!!!'
            }
        ],
        'likes': 1242,
        'dislikes': 354,
        'views': 325
    }
]
// export const videos = [
//     {
//         'id': "31ee4649-83c3-4e7c-900e-41a96cbe018e",
//         'url': 'https://v.ftcdn.net/04/18/07/01/240_F_418070104_TXXlp63Lf6e1cVxsQbS4caLA2NbpSdvm_ST.mp4',
//         'title': 'Konfuz - Ратата/Ratatatata',
//         'author': 'Nikola Iliev',
//         'authorId': '1',
//         'duration': '00:11',
//         'comments': [
//             {
//                 'user': 'Julia Callaghan',
//                 'comment': 'this playlist is good!'
//             },
//             {
//                 'user': 'Misbah Townsend',
//                 'comment': 'Thank you, I LOVE THE MUSIC is perfect'
//             },
//             {
//                 'user': 'Tymoteusz Lucero',
//                 'comment': 'So cool!!!'
//             }
//         ],
//         'likes': 1242,
//         'dislikes': 354,
//         'views': 325
//     },
//     {
//         'id': "f1649485-6650-474a-91ac-adfb753a8ac7",
//         'url': 'https://v.ftcdn.net/04/19/27/81/240_F_419278143_28u7vSShiLOEUW5cNkxU5H6oLmnmGen9_ST.mp4',
//         'author': 'Marina Damyanova',
//         'authorId': '2',
//         'title': 'Prisoner-Miley Cyrus, Dua Lipa',
//         'duration': '00:19',
//         'comments': [
//             {
//                 'user': 'Haroon Fenton',
//                 'comment': 'Nice Mix 😎😎😎'
//             },
//             {
//                 'user': 'EVIRUsal',
//                 'comment': 'Nice video'
//             },
//             {
//                 'user': 'Arandeep Hail',
//                 'comment': 'lol yummy song is my fav'
//             },
//             {
//                 'user': 'Bob Gardner',
//                 'comment': 'I hope you have a nice day'
//             },
//             {
//                 'user': 'Julia Callaghan',
//                 'comment': 'this playlist is good!'
//             },
//             {
//                 'user': 'Misbah Townsend',
//                 'comment': 'Thank you, I LOVE THE MUSIC is perfect'
//             },
//             {
//                 'user': 'Tymoteusz Lucero',
//                 'comment': 'So cool!!!'
//             },
//             {
//                 'user': 'Noor Espinoza',
//                 'comment': 'I am addicted to it.'
//             },
//             {
//                 'user': 'Kaisha Mcpherson',
//                 'comment': 'Love it'
//             },
//             {
//                 'user': 'Zack Petersen',
//                 'comment': 'Wow these songs are def the best songs'
//             },
//             {
//                 'user': 'Sarah-Jayne Whiteley',
//                 'comment': 'You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s nobody listening, and live like it’s heaven on earth.” ― William W. Purkey'
//             },
//             {
//                 'user': 'Kishan Harrell',
//                 'comment': 'HOPE CAN SOMEONE SEE THIS AND CHANGE MY LIFE LOVE YOU ALL'
//             },
//             {
//                 'user': 'Stanislaw Morton',
//                 'comment': 'The music is SO good and not so understandable that people can not find it.'
//             },
//             {
//                 'user': 'Kristy Middleton',
//                 'comment': 'A Grammy winning song!'
//             }

//         ],
//         'likes': 243,
//         'dislikes': 12,
//         'views': 325
//     },
//     {
//         'id': "0f106e12-1888-4d73-92ed-d2fd6bb435ce",
//         'url': 'https://v.ftcdn.net/04/20/96/20/240_F_420962031_RUNOpWPDOXQGNsXBiBRxG4k8KW0zCh1U_ST.mp4',
//         'author': 'Bat Georgi',
//         'authorId': '3',
//         'title': 'Dance monkey - TONES AND I',
//         'duration': '00:24',
//         'comments': [],
//         'likes': 9394,
//         'dislikes': 2345,
//         'views': 325
//     },
//     {
//         'id': "598903ef-d5af-45fa-be3a-be33ab18e1f1",
//         'url': 'https://v.ftcdn.net/04/19/44/64/240_F_419446488_OU83I1d47vEZGvm6WbUIe5P9HIchEPLT_ST.mp4',
//         'author': 'Nikola Iliev',
//         'authorId': '1',
//         'title': 'Head & Heart - Joel Corry x MNEK',
//         'duration': '00:19',
//         'comments': [],
//         'likes': 1242,
//         'dislikes': 304,
//         'views': 325
//     },
//     {
//         'id': "16503dfe-e3d7-48b0-809a-819f38152c3d",
//         'url': 'https://v.ftcdn.net/04/19/96/73/240_F_419967302_9uoMGRSa02VKGGmXbvAuECMLNcQLoGVo_ST.mp4',
//         'author': 'Marina Damyanova',
//         'authorId': '2',
//         'title': 'Whatever It Takes - Imagine Dragons',
//         'duration': '00:13',
//         'comments': [],
//         'likes': 359,
//         'dislikes': 125,
//         'views': 325
//     },
//     {
//         'id': "c3d727c2-5708-4b3f-b4fe-a9031eed3dd3",
//         'url': 'https://v.ftcdn.net/04/18/54/93/240_F_418549315_uk2V1ffWGPrd3MpNR8lSCZbuWWDKbKGL_ST.mp4',
//         'author': 'Bat Georgi',
//         'authorId': '3',
//         'title': 'Hozier - Take Me To Church',
//         'duration': '00:15',
//         'comments': [
//             {
//                 'user': 'Zack Petersen',
//                 'comment': 'Wow these songs are def the best songs'
//             },
//             {
//                 'user': 'Sarah-Jayne Whiteley',
//                 'comment': 'You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s nobody listening, and live like it’s heaven on earth.” ― William W. Purkey'
//             },
//             {
//                 'user': 'Kishan Harrell',
//                 'comment': 'HOPE CAN SOMEONE SEE THIS AND CHANGE MY LIFE LOVE YOU ALL'
//             },
//             {
//                 'user': 'Stanislaw Morton',
//                 'comment': 'The music is SO good and not so understandable that people can not find it.'
//             }
//         ],
//         'likes': 2435,
//         'dislikes': 254,
//         'views': 325
//     },
//     {
//         'id': "a5e16ccb-9027-49c0-82d2-13642745d966",
//         'url': 'https://v.ftcdn.net/04/17/62/53/240_F_417625375_w740Mn96YYGVo3WshOVnTpOIwho7wKMi_ST.mp4',
//         'author': 'Nikola Iliev',
//         'authorId': '1',
//         'title': 'Roses - SAINt JHN',
//         'duration': '00:20',
//         'comments': [],
//         'likes': 884,
//         'dislikes': 213,
//         'views': 325
//     },
//     {
//         'id': "be670dcb-2efb-439f-a219-b27c5345e555",
//         'url': 'https://v.ftcdn.net/04/17/38/10/240_F_417381044_C0SuNTQFvpYIhq24iD2rc0b8JszkVFOY_ST.mp4',
//         'author': 'Marina Damyanova',
//         'authorId': '2',
//         'title': 'Breaking Me - Topic, A7S',
//         'duration': '00:10',
//         'comments': [],
//         'likes': 9494,
//         'dislikes': 2345,
//         'views': 325
//     },
//     {
//         'id': "d317f213-99b7-4a6e-bf14-35e6baf562a4",
//         'url': 'https://v.ftcdn.net/04/16/78/14/240_F_416781486_iXZ3iKivZQdhj20tLeGx3TU7yMIdw9NU_ST.mp4',
//         'author': 'Bat Georgi',
//         'authorId': '3',
//         'title': 'Me Provocas - Dynoro & Fumaratto',
//         'duration': '00:09',
//         'comments': [
//             {
//                 'user': 'Misbah Townsend',
//                 'comment': 'Thank you, I LOVE THE MUSIC is perfect'
//             },
//             {
//                 'user': 'Tymoteusz Lucero',
//                 'comment': 'So cool!!!'
//             }
//         ],
//         'likes': 945,
//         'dislikes': 123,
//         'views': 325
//     },
//     {
//         'id': "a33d1a12-043e-41bb-abdb-27ad60f5d0d6",
//         'url': 'https://v.ftcdn.net/04/19/39/24/240_F_419392479_vedPYtzG86LkqXfNTxso1ztGMf6hT7FE_ST.mp4',
//         'author': 'Nikola Iliev',
//         'authorId': '1',
//         'title': 'Wake Me Up - Avicii',
//         'duration': '00:13',
//         'comments': [],
//         'likes': 2145,
//         'dislikes': 754,
//         'views': 325
//     },
//     {
//         'id': "201f662d-de08-49c0-9d9c-9b54a2a652dc",
//         'url': 'https://v.ftcdn.net/04/19/20/22/240_F_419202226_lcYL9FwpCEZXaNTElmLwIlhNget3Sfa4_ST.mp4',
//         'author': 'Marina Damyanova',
//         'authorId': '2',
//         'title': 'Memories - Maroon 5',
//         'duration': '00:14',
//         'comments': [{
//             'user': 'Haroon Fenton',
//             'comment': 'Nice Mix 😎😎😎'
//         },
//         {
//             'user': 'EVIRUsal',
//             'comment': 'Nice video'
//         },
//         {
//             'user': 'Arandeep Hail',
//             'comment': 'lol yummy song is my fav'
//         },
//         ],
//         'likes': 8385,
//         'dislikes': 1435,
//         'views': 325
//     },
//     {
//         'id': "37da9b99-613a-4b14-9cc6-2cd65ca04ac7",
//         'url': 'https://v.ftcdn.net/04/17/68/11/240_F_417681108_RlVthyQkjZrEe5jH74LAHFDSRm0SA5RR_ST.mp4',
//         'author': 'Bat Georgi',
//         'authorId': '3',
//         'title': 'Mood - 24kGoldn, Iann Dior',
//         'duration': '00:09',
//         'comments': [],
//         'likes': 3944,
//         'dislikes': 1245,
//         'views': 325
//     },
//     {
//         'id': "8901b7ed-c448-4133-a9e0-f9139e07eca4",
//         'url': 'https://v.ftcdn.net/04/16/30/98/240_F_416309869_bLUsSEs5Gac0IZXgXzlCCgsHX7KxIdFk_ST.mp4',
//         'author': 'Marina Damyanova',
//         'authorId': '2',
//         'title': 'Deep House Mix 2021 - TSG',
//         'duration': '00:08',
//         'comments': [
//             {
//                 'user': 'Misbah Townsend',
//                 'comment': 'Thank you, I LOVE THE MUSIC is perfect'
//             },
//             {
//                 'user': 'Tymoteusz Lucero',
//                 'comment': 'So cool!!!'
//             }
//         ],
//         'likes': 5678,
//         'dislikes': 124,
//         'views': 325
//     },
//     {
//         'id': "ab0dfcc5-d9bc-4e1d-aa36-2236d7f1cdfb",
//         'url': 'https://v.ftcdn.net/04/18/43/47/240_F_418434766_4cnb4EA1C7eEHUhF03bl9cKR2iS4c5DX_ST.mp4',
//         'author': 'Nikola Iliev',
//         'authorId': '1',
//         'title': 'Autumn-Winter Fashion 2020 - Mascota',
//         'duration': '00:08',
//         'comments': [],
//         'likes': 3567,
//         'dislikes': 1234,
//         'views': 325
//     },
//     {
//         'id': "41fb79e7-6a5b-496c-9618-75f185745783",
//         'url': 'https://v.ftcdn.net/04/18/15/61/240_F_418156122_yIbRLW1d3sI1kakQNbgOXw8S0ebGu8Ci_ST.mp4',
//         'author': 'Bat Georgi',
//         'authorId': '3',
//         'title': 'Forbidden Voices - Martin Garrix',
//         'duration': '00:09',
//         'comments': [],
//         'likes': 4678,
//         'dislikes': 2467,
//         'views': 325
//     },
//     {
//         'id': "58684c43-0a87-4575-8941-b3e04e7bb3cd",
//         'url': 'https://v.ftcdn.net/04/17/13/43/240_F_417134324_1dhtOPGDjyHP3o1670SK5Ke8sg2Pv8Kn_ST.mp4',
//         'author': 'Marina Damyanova',
//         'authorId': '2',
//         'title': 'Zaidi - Mascota & D-Trax feat. Poli Hubavenska',
//         'duration': '00:11',
//         'comments': [
//             {
//                 'user': 'Noor Espinoza',
//                 'comment': 'I am addicted to it.'
//             },
//             {
//                 'user': 'Kaisha Mcpherson',
//                 'comment': 'Love it'
//             },
//             {
//                 'user': 'Zack Petersen',
//                 'comment': 'Wow these songs are def the best songs'
//             },
//             {
//                 'user': 'Sarah-Jayne Whiteley',
//                 'comment': 'You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s nobody listening, and live like it’s heaven on earth.” ― William W. Purkey'
//             },
//             {
//                 'user': 'Kishan Harrell',
//                 'comment': 'HOPE CAN SOMEONE SEE THIS AND CHANGE MY LIFE LOVE YOU ALL'
//             },
//             {
//                 'user': 'Stanislaw Morton',
//                 'comment': 'The music is SO good and not so understandable that people can not find it.'
//             }
//         ],
//         'likes': 12456,
//         'dislikes': 7686,
//         'views': 325
//     },
// ];

export const users = [
    {
        'name': 'Nikola Iliev',
        'email': 'kolyo@gmail.com',
        'userId': '1',
        'videos': [
            "31ee4649-83c3-4e7c-900e-41a96cbe018e", "598903ef-d5af-45fa-be3a-be33ab18e1f1", "a5e16ccb-9027-49c0-82d2-13642745d966", "a33d1a12-043e-41bb-abdb-27ad60f5d0d6", "ab0dfcc5-d9bc-4e1d-aa36-2236d7f1cdfb"
        ],
        'history': ["f1649485-6650-474a-91ac-adfb753a8ac7",],
        'liked': ["be670dcb-2efb-439f-a219-b27c5345e555", "201f662d-de08-49c0-9d9c-9b54a2a652dc",],
        'dislaked': ["8901b7ed-c448-4133-a9e0-f9139e07eca4", "58684c43-0a87-4575-8941-b3e04e7bb3cd"]
    },
    {
        'name': 'Marina Damyanova',
        'email': 'marina@gmail.com',
        'userId': '2',
        'videos': [
            "f1649485-6650-474a-91ac-adfb753a8ac7", "16503dfe-e3d7-48b0-809a-819f38152c3d", "be670dcb-2efb-439f-a219-b27c5345e555", "201f662d-de08-49c0-9d9c-9b54a2a652dc", "8901b7ed-c448-4133-a9e0-f9139e07eca4", "58684c43-0a87-4575-8941-b3e04e7bb3cd"
        ],
        'history': ["0f106e12-1888-4d73-92ed-d2fd6bb435ce", "c3d727c2-5708-4b3f-b4fe-a9031eed3dd3",],
        'liked': ["d317f213-99b7-4a6e-bf14-35e6baf562a4", "37da9b99-613a-4b14-9cc6-2cd65ca04ac7",],
        'dislaked': ["41fb79e7-6a5b-496c-9618-75f185745783"]
    },
    {
        'name': 'Bat Georgi',
        'email': 'gosho@gmail.com',
        'userId': '3',
        'videos': [
            "0f106e12-1888-4d73-92ed-d2fd6bb435ce", "c3d727c2-5708-4b3f-b4fe-a9031eed3dd3", "d317f213-99b7-4a6e-bf14-35e6baf562a4", "37da9b99-613a-4b14-9cc6-2cd65ca04ac7", "41fb79e7-6a5b-496c-9618-75f185745783"
        ],
        'history': ["31ee4649-83c3-4e7c-900e-41a96cbe018e", "598903ef-d5af-45fa-be3a-be33ab18e1f1",],
        'liked': ["be670dcb-2efb-439f-a219-b27c5345e555", "201f662d-de08-49c0-9d9c-9b54a2a652dc",],
        'dislaked': ["8901b7ed-c448-4133-a9e0-f9139e07eca4",]
    }
];

export function getAllVideos() {
    return new Promise((res, rej) => {
        res(videos);
    });
}



export function getVideo(id) {
    return new Promise((res, rej) => {
        res(videos.find(el => el.id === id));
    });
}

export function getUser(id) {
    return new Promise((res, rej) => {
        res(users.find(el => el.userId === id));
    });
}

export function getUserVideos(arr) {
    const filtered = videos.filter(video => arr.includes(video.id));
    return new Promise((res, rej) => {
        res(filtered);
    });
}

export function pushToWatched(id) {
    // find current user in firebase and push the id in the history array
}

export function pushToLiked(id) {
    // find current user in firebase and push the id in the liked array
}