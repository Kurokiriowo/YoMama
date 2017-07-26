const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let reason = args.slice(2).join(' ');
  let duration = message.content.split(' ')[2];
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'moderation-logs');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
  if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0xBBB5AE)
    .setTimestamp()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, `${message.author.avatarURL}`)
    .setDescription(`**User:** ${user} -- ${user.username}#${user.discriminator} (${user.id})\n**Action:** Mute\n**Reason:** ${reason}\n**Duration:** ${duration} hour(s)`)
    .setFooter('Mute','https://images.discordapp.net/avatars/318917523615514645/da4157938a6f91f0ca746a890d1eae16.png?size=1024')
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.reply('This user is already muted.')
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      client.channels.get(modlog.id).sendEmbed(embed).then(member => {
                    message.channel.sendMessage(`${user} **has been muted**`).catch(console.error)
                  });
    });
      user.send(`You have been muted in YoMamma by ${message.author.username}#${message.author.discriminator}, ${reason} for ${duration} hour(s). If you feel that this mute was in error or if you would like to appeal this mute, please join our appeal server, https://discord.gg/xCJJ4Gm`)
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'mute',
  description: 'Mutes a mentioned user',
  usage: 'mute [mention] [duration in hours] [reason] '
};
