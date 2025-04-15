const Message = require("../models/Message");
const User = require("../models/User");

exports.sendMessage = async (req, res) => {
  const { receiver, content } = req.body;
  try {
    const message = await Message.create({
      sender: req.user._id,
      receiver,
      content,
      timestamp: new Date(),
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message" });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    const userIds = [
      ...new Set(
        messages.map((msg) =>
          msg.sender.toString() === userId.toString()
            ? msg.receiver.toString()
            : msg.sender.toString()
        )
      ),
    ];

    const users = await User.find({ _id: { $in: userIds } }).select("name email");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to get conversations" });
  }
};

exports.getMessagesWithUser = async (req, res) => {
  const userId = req.user._id;
  const otherUserId = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to get messages" });
  }
};
