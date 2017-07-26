const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'moderation-logs');
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
  user.send(`You have been banned from YoMamma by ${message.author.username}#${message.author.discriminator} for ${reason}. If you feel that this ban was in error or if you would like to appeal this ban, please join our appeal server, https://discord.gg/xCJJ4Gm`).then(member => {
                message.guild.ban(user, {'days':1, 'reason':reason})
                message.channel.sendMessage(`${user} **has been banned**`).catch(console.error)
              });

  const embed = new Discord.RichEmbed()
    .setColor(0xF7524E)
    .setTimestamp()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, `${message.author.avatarURL}`)
    .setDescription(`**User:** ${user} -- ${user.username}#${user.discriminator} (${user.id})\n**Action:** Ban\n**Prune:** 1 day\n**Reason:** ${reason}`)
    .setFooter('Ban','https://images.discordapp.net/avatars/318917523615514645/da4157938a6f91f0ca746a890d1eae16.png?size=1024')
  return client.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban [mention] [reason]'
};
