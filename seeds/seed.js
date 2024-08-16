const sequelize = require('../config/connection');
const { User, Discussion, Comment } = require('../models'); 

const userData = [
    {
        "username": "Sal",
        "email": "sal@hotmail.com",
        "password": "password12345"
      },
      {
        "username": "Lernantino",
        "email": "lernantino@gmail.com",
        "password": "password12345"
      },
      {
        "username": "Amiko",
        "email": "amiko2k20@aol.com",
        "password": "password12345"
      },
      {
        "username": "Mara_Jade",
        "email": "mara.jade@example.com",
        "password": "forceuser456"
      },
      {
        "username": "Neo_Anderson",
        "email": "neo@matrixmail.com",
        "password": "redpill123"
      },
      {
        "username": "Trinity84",
        "email": "trinity84@zion.com",
        "password": "matrixlove"
      },
      {
        "username": "HackerMan",
        "email": "hackerman@cyberspace.net",
        "password": "supersecure777"
      },
      {
        "username": "JaneDoe89",
        "email": "jane.doe89@yahoo.com",
        "password": "janepass89"
      },
      {
        "username": "JohnSmith123",
        "email": "john.smith123@gmail.com",
        "password": "smithsecure456"
      },
      {
        "username": "CoolCat2024",
        "email": "coolcat2024@catmail.com",
        "password": "coolpassword2024"
      },
      {
        "username": "RoboCop",
        "email": "robocop@cyberdyne.com",
        "password": "lawman9000"
      },
      {
        "username": "SkyWalker",
        "email": "skywalker@rebellion.org",
        "password": "jedi5678"
      },
      {
        "username": "Leia_Organa",
        "email": "leia.organa@rebellion.org",
        "password": "princess2024"
      },
      {
        "username": "Spartan117",
        "email": "masterchief@unsc.gov",
        "password": "halo777"
      },
      {
        "username": "SolidSnake",
        "email": "solidsnake@foxhound.com",
        "password": "stealthmode999"
      },
      {
        "username": "Ellie_W",
        "email": "ellie.williams@outbreak.com",
        "password": "lastofus456"
      },
      {
        "username": "Joel_M",
        "email": "joel.miller@outbreak.com",
        "password": "clicker123"
      },
      {
        "username": "TombRaider",
        "email": "lara.croft@adventure.net",
        "password": "raider456"
      },
      {
        "username": "DrStrange",
        "email": "dr.strange@sanctumsanctorum.com",
        "password": "sorcery2024"
      },
      {
        "username": "BlackWidow",
        "email": "natasha.romanoff@shield.gov",
        "password": "spy007"
      },
      {
        "username": "TonyStark",
        "email": "tony.stark@starkindustries.com",
        "password": "ironman2024"
      },
      {
        "username": "CaptainRogers",
        "email": "steve.rogers@avengers.com",
        "password": "superSoldier101"
      },
      {
        "username": "Thor_Odinson",
        "email": "thor@asgard.com",
        "password": "thunder2024"
      },
      {
        "username": "Bruce_Wayne",
        "email": "bruce.wayne@wayneenterprises.com",
        "password": "darkknight456"
      },
      {
        "username": "Clark_Kent",
        "email": "clark.kent@dailyplanet.com",
        "password": "kryptonian789"
      },
      {
        "username": "PeterParker",
        "email": "peter.parker@dailybugle.com",
        "password": "spidey123"
      },
      {
        "username": "WonderWoman",
        "email": "diana.prince@amazon.com",
        "password": "lassooftruth"
      },
      {
        "username": "BarryAllen",
        "email": "barry.allen@ccpd.gov",
        "password": "fastestman"
      },
      {
        "username": "Arthur_Curry",
        "email": "arthur.curry@atlantis.com",
        "password": "seaking2024"
      },
      {
        "username": "DianaPrince",
        "email": "diana.prince@themyscira.com",
        "password": "amazonwarrior"
      }
];

const discussionData = [
    {
        "movie_id": "tt0034492e",
        "text": "This movie is a classic, but not my favorite.",
        "public_rating": 3
      },
      {
        "movie_id": "tt0034492e",
        "text": "I didn't really connect with the story.",
        "public_rating": 2
      },
      {
        "movie_id": "tt0034492e",
        "text": "Great cinematography, but the plot was slow.",
        "public_rating": 4
      },
      {
        "movie_id": "tt0034492e",
        "text": "I loved the characters, very well developed!",
        "public_rating": 5
      },
      {
        "movie_id": "tt0034492e",
        "text": "A bit overrated in my opinion.",
        "public_rating": 3
      },
      {
        "movie_id": "tt0034492e",
        "text": "The soundtrack really elevated the film.",
        "public_rating": 4
      },
      {
        "movie_id": "tt0462499",
        "text": "This movie blew my mind!",
        "public_rating": 5
      },
      {
        "movie_id": "tt0462499",
        "text": "Too complex for me, got lost halfway.",
        "public_rating": 2
      },
      {
        "movie_id": "tt0462499",
        "text": "The visuals were stunning, but the story was confusing.",
        "public_rating": 3
      },
      {
        "movie_id": "tt0462499",
        "text": "I could watch this over and over again.",
        "public_rating": 5
      },
      {
        "movie_id": "tt0462499",
        "text": "It was okay, but not as good as I expected.",
        "public_rating": 3
      },
      {
        "movie_id": "tt0462499",
        "text": "A masterpiece, no other words needed.",
        "public_rating": 5
      },
      {
        "movie_id": "tt0109686",
        "text": "A must-see, timeless classic.",
        "public_rating": 5
      },
      {
        "movie_id": "tt0109686",
        "text": "The best movie in this genre, hands down.",
        "public_rating": 5
      },
      {
        "movie_id": "tt0109686",
        "text": "Not my cup of tea, but well made.",
        "public_rating": 3
      },
      {
        "movie_id": "tt0109686",
        "text": "I didn't expect to enjoy this as much as I did.",
        "public_rating": 4
      },
      {
        "movie_id": "tt0109686",
        "text": "The acting was phenomenal.",
        "public_rating": 5
      },
      {
        "movie_id": "tt0109686",
        "text": "A little too long for my taste.",
        "public_rating": 3
      },
      {
        "movie_id": "tt0059742",
        "text": "A beautiful film, very touching.",
        "public_rating": 4
      },
      {
        "movie_id": "tt0059742",
        "text": "I cried so much during this movie.",
        "public_rating": 5
      },
      {
        "movie_id": "tt0059742",
        "text": "The ending was a bit disappointing.",
        "public_rating": 3
      },
      {
        "movie_id": "tt0059742",
        "text": "A bit slow in parts, but overall great.",
        "public_rating": 4
      },
      {
        "movie_id": "tt0059742",
        "text": "I didn't expect to be so emotionally invested.",
        "public_rating": 5
      },
      {
        "movie_id": "tt0059742",
        "text": "The performances were incredible!",
        "public_rating": 5
      },
      {
        "movie_id": "tt0096895",
        "text": "The new ones are better, but this is still good.",
        "public_rating": 4
      },
      {
        "movie_id": "tt0096895",
        "text": "I prefer the original over the sequels.",
        "public_rating": 4
      },
      {
        "movie_id": "tt0096895",
        "text": "This movie defined my childhood.",
        "public_rating": 5
      },
      {
        "movie_id": "tt0096895",
        "text": "A bit dated, but still holds up.",
        "public_rating": 3
      },
      {
        "movie_id": "tt0096895",
        "text": "Rewatching this was a blast from the past.",
        "public_rating": 5
      },
      {
        "movie_id": "tt0096895",
        "text": "I didn't like it as much as I thought I would.",
        "public_rating": 2
      }
];

const commentData = [
    {
        "text": "I totally agree with you!",
        "discussion_id": 1
    },
    {
        "text": "This movie changed my life.",
        "discussion_id": 1
    },
    {
        "text": "I don't understand the hate for this movie.",
        "discussion_id": 2
    },
    {
        "text": "The plot twist was mind-blowing.",
        "discussion_id": 2
    },
    {
        "text": "Not sure I agree, but you make a good point.",
        "discussion_id": 3
    },
    {
        "text": "The director did an amazing job.",
        "discussion_id": 3
    },
    {
        "text": "I found the pacing a bit slow.",
        "discussion_id": 4
    },
    {
        "text": "The acting was top-notch.",
        "discussion_id": 4
    },
    {
        "text": "You're crazy, this movie is a masterpiece.",
        "discussion_id": 5
    },
    {
        "text": "I could watch this movie over and over again.",
        "discussion_id": 5
    },
    {
        "text": "This is the worst movie I've ever seen.",
        "discussion_id": 6
    },
    {
        "text": "I fell asleep halfway through.",
        "discussion_id": 6
    },
    {
        "text": "The cinematography was stunning.",
        "discussion_id": 7
    },
    {
        "text": "You're wrong, the ending was perfect.",
        "discussion_id": 7
    },
    {
        "text": "This movie deserves all the awards.",
        "discussion_id": 8
    },
    {
        "text": "I wish I could unsee this movie.",
        "discussion_id": 8
    },
    {
        "text": "The soundtrack was incredible.",
        "discussion_id": 9
    },
    {
        "text": "I can't believe you didn't like this movie!",
        "discussion_id": 9
    },
    {
        "text": "This movie was way ahead of its time.",
        "discussion_id": 10
    },
    {
        "text": "I had high hopes, but it was disappointing.",
        "discussion_id": 10
    },
    {
        "text": "The visual effects were groundbreaking.",
        "discussion_id": 11
    },
    {
        "text": "This is a must-watch for everyone.",
        "discussion_id": 11
    },
    {
        "text": "I don't think you understood the movie.",
        "discussion_id": 12
    },
    {
        "text": "This movie was a waste of time.",
        "discussion_id": 12
    },
    {
        "text": "I can't stop thinking about this movie.",
        "discussion_id": 13
    },
    {
        "text": "You're being too harsh, it wasn't that bad.",
        "discussion_id": 13
    },
    {
        "text": "The dialogue was so well-written.",
        "discussion_id": 14
    },
    {
        "text": "I laughed so hard during this movie.",
        "discussion_id": 14
    },
    {
        "text": "This movie was emotionally draining.",
        "discussion_id": 15
    },
    {
        "text": "You missed the whole point of the movie.",
        "discussion_id": 15
    },
    {
        "text": "The cast was perfectly chosen.",
        "discussion_id": 16
    },
    {
        "text": "This movie is a hidden gem.",
        "discussion_id": 16
    },
    {
        "text": "You're way off base with your comment.",
        "discussion_id": 17
    },
    {
        "text": "The story was very engaging.",
        "discussion_id": 17
    },
    {
        "text": "I couldn't connect with the characters.",
        "discussion_id": 18
    },
    {
        "text": "This movie will be a classic for years to come.",
        "discussion_id": 18
    },
    {
        "text": "The special effects were amazing.",
        "discussion_id": 19
    },
    {
        "text": "I expected more from the plot.",
        "discussion_id": 19
    },
    {
        "text": "The action scenes were intense.",
        "discussion_id": 20
    },
    {
        "text": "The ending was a letdown.",
        "discussion_id": 20
    },
    {
        "text": "I love the lead actor's performance.",
        "discussion_id": 21
    },
    {
        "text": "This movie was too predictable.",
        "discussion_id": 21
    },
    {
        "text": "The sequel was much better.",
        "discussion_id": 22
    },
    {
        "text": "I can't believe this movie is so underrated.",
        "discussion_id": 22
    },
    {
        "text": "The pacing was perfect for this genre.",
        "discussion_id": 23
    },
    {
        "text": "This movie was visually stunning.",
        "discussion_id": 23
    },
    {
        "text": "I didn't like the character development.",
        "discussion_id": 24
    },
    {
        "text": "This movie had so many plot holes.",
        "discussion_id": 24
    },
    {
        "text": "The humor in this movie was spot on.",
        "discussion_id": 25
    },
    {
        "text": "The villains were underwhelming.",
        "discussion_id": 25
    },
    {
        "text": "This movie was overhyped.",
        "discussion_id": 26
    },
    {
        "text": "I loved every minute of this movie.",
        "discussion_id": 26
    },
    {
        "text": "The soundtrack was unforgettable.",
        "discussion_id": 27
    },
    {
        "text": "This movie was way too long.",
        "discussion_id": 27
    },
    {
        "text": "I would recommend this movie to everyone.",
        "discussion_id": 28
    },
    {
        "text": "The cinematography was breathtaking.",
        "discussion_id": 28
    },
    {
        "text": "The ending left me wanting more.",
        "discussion_id": 29
    },
    {
        "text": "This movie was a complete waste of time.",
        "discussion_id": 29
    },
    {
        "text": "The lead actor carried this movie.",
        "discussion_id": 30
    },
    {
        "text": "The script was poorly written.",
        "discussion_id": 30
    },
    {
        "text": "I didn't expect to like this movie as much as I did.",
        "discussion_id": 1
    },
    {
        "text": "This movie was a pleasant surprise.",
        "discussion_id": 1
    },
    {
        "text": "The visuals were stunning but the story lacked depth.",
        "discussion_id": 2
    },
    {
        "text": "The movie's message was powerful.",
        "discussion_id": 2
    },
    {
        "text": "The acting was mediocre at best.",
        "discussion_id": 3
    },
    {
        "text": "I think this movie is overrated.",
        "discussion_id": 3
    },
    {
        "text": "This movie was pure entertainment.",
        "discussion_id": 4
    },
    {
        "text": "The dialogue felt forced and unnatural.",
        "discussion_id": 4
    },
    {
        "text": "This is the best movie I've seen all year.",
        "discussion_id": 5
    },
    {
        "text": "I don't understand why this movie is so popular.",
        "discussion_id": 5
    },
    {
        "text": "The action scenes were top-notch.",
        "discussion_id": 6
    },
    {
        "text": "This movie had so much potential, but it fell flat.",
        "discussion_id": 6
    },
    {
        "text": "The characters were well-developed.",
        "discussion_id": 7
    },
    {
        "text": "The plot was confusing and hard to follow.",
        "discussion_id": 7
    },
    {
        "text": "This movie is a must-watch for fans of the genre.",
        "discussion_id": 8
    },
    {
        "text": "I was bored the entire time.",
        "discussion_id": 8
    },
    {
        "text": "The pacing was perfect, not too slow, not too fast.",
        "discussion_id": 9
    },
    {
        "text": "I expected more from the storyline.",
        "discussion_id": 9
    },
    {
        "text": "This movie had me on the edge of my seat.",
        "discussion_id": 10
    },
    {
        "text": "The special effects were underwhelming.",
        "discussion_id": 10
    },
    {
        "text": "This movie was an emotional rollercoaster.",
        "discussion_id": 11
    },
    {
        "text": "The plot was too predictable.",
        "discussion_id": 11
    },
    {
        "text": "I love how the movie ended.",
        "discussion_id": 12
    },
    {
        "text": "This movie was a huge letdown.",
        "discussion_id": 12
    },
    {
        "text": "The chemistry between the leads was amazing.",
        "discussion_id": 13
    },
    {
        "text": "The story was too convoluted.",
        "discussion_id": 13
    },
    {
        "text": "This movie is an instant classic.",
        "discussion_id": 14
    },
    {
        "text": "I couldn't get into the storyline.",
        "discussion_id": 14
    }
];

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables
    console.log('Database synced');

    await User.bulkCreate(userData, { individualHooks: true });
    console.log('Users seeded');

    await Discussion.bulkCreate(discussionData);
    console.log('Discussions seeded');

    await Comment.bulkCreate(commentData);
    console.log('Comments seeded');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();