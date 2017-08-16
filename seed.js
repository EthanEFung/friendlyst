const models = require('./server/db/index');

models.User.sync({
    force: true
  })
  .then(() => {
    models.User.bulkCreate([{
        email: 'joejoe@gmail.com',
        nickname: 'joejoe',
        profilePicture: "https://avatars3.githubusercontent.com/u/25360287?v=4&s=400"
      },
      {
        email: 'james@gmail.com',
        nickname: 'james',
        profilePicture: "https://avatars2.githubusercontent.com/u/30710715?v=4&s=200"
      },
      {
        email: 'taeminpak@gmail.com',
        nickname: 'taeminpak',
        profilePicture: "https://scontent-dft4-3.xx.fbcdn.net/v/t1.0-1/c9.0.160.160/p160x160/1236123_10202181547725371_1279259312_n.jpg?oh=d6e3a3b1db3988c47bc10944293de23c&oe=59EB09BA"
      },
      {
        email: 'kevin@gmail.com',
        nickname: 'kevin',
        profilePicture: "https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/19366468_10100764456410460_270583895771912490_n.jpg?oh=20a818a4fa156b1a4e7b4424589ff832&oe=59F19DE8"
      },
      {
        email: 'tester@gmail.com',
        nickname: 'tester',
        profilePicture: "https://s.gravatar.com/avatar/8c3fe1ad25e6d5f47512ea7365419966?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png"
      }
    ])
  })
  .then(() => {
    models.Friend.sync({
        force: true
      })
      .then(() => {
        models.Friend.bulkCreate([{
            userId: 1,
            buddyId: 2
          },
          {
            userId: 1,
            buddyId: 3
          },
          {
            userId: 1,
            buddyId: 4
          },
          {
            userId: 2,
            buddyId: 1
          },
          {
            userId: 2,
            buddyId: 3
          },
          {
            userId: 2,
            buddyId: 4
          },
          {
            userId: 3,
            buddyId: 1
          },
          {
            userId: 3,
            buddyId: 2
          },
          {
            userId: 3,
            buddyId: 4
          },
          {
            userId: 4,
            buddyId: 1
          },
          {
            userId: 4,
            buddyId: 2
          },
          {
            userId: 4,
            buddyId: 3
          },
          {
            userId: 5,
            buddyId: 1
          },
          {
            userId: 5,
            buddyId: 2
          },
          {
            userId: 5,
            buddyId: 3
          },
          {
            userId: 5,
            buddyId: 4
          }
        ])
      })
      .catch(err => console.log(`Error creating friend data! ${err}`))
  })
  .then(() => {
    models.Post.sync({
        force: true
      })
      .then(() => {
        models.Post.bulkCreate([{
            message: 'Here we go!',
            userId: 4
          },
          {
            message: '@&$#$%@#',
            userId: 1
          },
          {
            message: 'Hmmmm.',
            userId: 2
          },
          {
            message: 'What do we have here?',
            userId: 3
          },
          {
            message: '僕は天才だ！',
            userId: 1
          },
          {
            message: '本当にどうしよう。。。',
            userId: 2
          },
          {
            message: 'как дела?',
            userId: 4
          },
          {
            message: 'Fin',
            userId: 3
          },
          {
            message: 'There is the tester',
            userId: 5
          }
        ])
      })
      .catch(err => console.log(`Error creating post data! ${err}`))
  })
  .then(() => {
    models.UserComment.sync({force: true})
    .then(() => {
        models.UserComment.bulkCreate([
          {
            userComment: "We're presenting RIGHT NOW???",
            userId: 3,
            postId: 1
          },
          {
            userComment: 'Yes Sir',
            userId: 4,
            postId: 1
          },
          {
            userComment: 'But Hack Reactor is not open right now',
            userId: 1,
            postId: 1
          },
          {
            userComment: 'I already brought my laptop?',
            userId: 2,
            postId: 1
          },
          {
            userComment: 'Priviet',
            userId: 4,
            postId: 7
          },
          {
            userComment: '*(#&$^(@*#^$(&#)',
            userId: 3,
            postId: 2
          },
          {
            userComment: 'I have no idea what I just said!',
            userId: 2,
            postId: 6
          }
        ])
      })
  })
  .then(() => {
    models.Like.sync({force: true})
    .then(() => {
      models.Like.bulkCreate([
        {
          postId: 1,
          userId: 1,
        },
        {
          postId: 1,
          userId: 2,
        },
        {
          postId: 1,
          userId: 3,
        },
        {
          postId: 1,
          userId: 4,
        },
        {
          postId: 2,
          userId: 1,
        },
        {
          postId: 2,
          userId: 2,
        },
        {
          postId: 3,
          userId: 3,
        },
        {
          postId: 3,
          userId: 4,
        }
      ])
    })
  })
  .then(() => {
    models.Message.sync({
      force: true
    })
  })
  .catch(err => console.log(`Error seeding db! ${err}`))