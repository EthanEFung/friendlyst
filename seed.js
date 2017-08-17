const models = require('./server/db/index');

models.User.sync({
  force: true
}).then(() => {
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
    email: 'mkdai@gmail.com',
    nickname: 'mkdai',
    profilePicture: "https://s.gravatar.com/avatar/4b82a0758d4b828b26866cce14bb747a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmk.png"
  }
  ]).then(() => {
    models.Friend.sync({
      force: true
    }).then(() => {
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
      ]).then(() => {
        models.Post.sync({
          force: true
        }).then(() => {
          models.Post.bulkCreate([{
            message: 'Here we go!',
            image: 'http://friendlyst-profile-images.s3.amazonaws.com/cheesecake.jpeg',
            userId: 4
          },
          {
            message: '@&$#$%@#',
            image: 'http://friendlyst-profile-images.s3.amazonaws.com/pizza.jpeg',
            userId: 1
          },
          {
            message: 'Hmmmm.',
            image: 'http://friendlyst-profile-images.s3.amazonaws.com/sushi.jpeg',
            userId: 2
          },
          {
            message: 'What do we have here?',
            image: 'http://friendlyst-profile-images.s3.amazonaws.com/cheesecake.jpeg',
            userId: 3
          },
          {
            message: '僕は天才だ！',
            image: 'http://friendlyst-profile-images.s3.amazonaws.com/cheesecake.jpeg',
            userId: 1
          },
          {
            message: '本当にどうしよう。。。',
            image: 'http://friendlyst-profile-images.s3.amazonaws.com/cheesecake.jpeg',
            userId: 2
          },
          {
            message: 'как дела?',
            image: 'http://friendlyst-profile-images.s3.amazonaws.com/cheesecake.jpeg',
            userId: 4
          },
          {
            message: 'Fin',
            image: 'http://friendlyst-profile-images.s3.amazonaws.com/cheesecake.jpeg',
            userId: 3
          },
          {
            message: 'There is the tester',
            image: 'http://friendlyst-profile-images.s3.amazonaws.com/cheesecake.jpeg',
            userId: 5
          }
          ]).then(() => {
            models.UserComment.sync({
              force: true
            }).then(() => {
              models.UserComment.bulkCreate([
              {
                userComment: "We're presenting RIGHT NOW???",
                userId: 3,
                postId: 1
              },
              {
                userComment: 'Yes Sir',
                userId: 4,
                parentId: 1
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
              ]).then(() => {
                models.Like.sync({
                  force: true
                }).then(() => {
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
                  ]).then(() => {
                    models.Message.sync({
                      force: true
                    }).then(() => {
                      models.Event.sync({
                        force: true
                      }).then(() => {
                        models.Event.bulkCreate([
                        {
                          name: `Ashley's birthday bash`,
                          date: new Date(2017, 7, 18),
                          location: `A hip bar`,
                          description: `Join us for Ashley's awesome birthday bash.  After a long day of adulting, you can expect to get loose!`
                        },
                        {
                          name: `Sam's birthday bash`,
                          date: new Date(2017, 7, 18),
                          location: `At his home`,
                          description: `Join us for Sam's awesome birthday bash.  After a long day of adulting, you can expect to rest!`
                        },
                        {
                          name: `David's birthday bash`,
                          date: new Date(2017, 7, 18),
                          location: `A coffee shop`,
                          description: `Join us for David's awesome birthday bash. Come chill with us!`
                        },
                        {
                          name: `Alex's birthday bash`,
                          date: new Date(2017, 7, 18),
                          location: `UltraZone`,
                          description: `Join us for Alex's awesome birthday bash.  You can expect to get loose!`
                        },
                        ])
                      }).catch(err => console.log(`Error seeding the Events table: ${err}`))
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
/*
  .catch(err => console.log(`Error creating post data! ${err}`)).then(() => {
  .catch(err => console.log(`Error seeding db! ${err}`))
  .catch(err => console.log(`Error creating friend data! ${err}`))
  })
  })
  
  })
  .catch(err => console.log(`Error seeding db! ${err}`))

*/