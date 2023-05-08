import User from '../models/userModel.js';
import GamePlay from '../models/gamePlayModel.js';

export const getUser = async (req, res) => {
  try {
    // Retrieve all game plays from the database and populate the associated user
    const gamePlays = await GamePlay.find().populate('user');
    console.log(gamePlays);
    // Map the game plays to an array of objects that include the user name, game play duration, and score
    const gamePlayData = gamePlays.map(gamePlay => {
      const { user, totalTime,score} = gamePlay;
      return {
        name: user.name,
        duration: totalTime,
        net:score,
      };
    });

    // Send the game play data to the frontend
    res.send(gamePlayData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const addUser = async (req, res) => {
  console.log(req.body);
  const { userId, duration, net } = req.body;
  const newgamePlay = new GamePlay({ user: userId, totalTime: duration,score:net});
  try {
    await newgamePlay.save();
    const { name } = await User.findById(userId);
    res.status(201).json({ name,duration,net});
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};
