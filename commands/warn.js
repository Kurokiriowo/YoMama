const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'moderation-logs');
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  const embed = new Discord.RichEmbed()
  .setColor(0xD8DA6B)
  .setTimestamp()
  .setAuthor(`${message.author.username}#${message.author.discriminator}`, `${message.author.avatarURL}`)
  .setDescription(`**User:** ${user} -- ${user.username}#${user.discriminator} (${user.id})\n**Action:** Warning\n**Reason:** ${reason}`)
  .setFooter('Warning','https://images.discordapp.net/avatars/310929237882437633/7640635d9bd12b9aa9729e1266e44561.png?size=1024')
  return client.channels.get(modlog.id).sendEmbed(embed).then(member => {
                user.send(`You have been issued a warning in The Social Annex, ${reason}`)
                message.channel.sendMessage(`${user}, **Know Your Place**`).catch(console.error)
              });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'warn',
  description: 'Issues a warning to the mentioned user.',
  usage: 'warn [mention] [reason]'
};
