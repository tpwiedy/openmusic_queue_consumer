require('dotenv').config();

const amqp = require('amqplib');
const PlaylistsService = require('./PlaylistsService');
const SongsService = require('./SongsService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  const songsService = new SongsService();
  const playlistsService = new PlaylistsService(songsService);
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  channel.consume('export:playlists', listener.listen, { noAck: true });
};

init();
