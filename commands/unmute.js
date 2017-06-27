const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'moderation-logs');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to unmute them.').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0xCD9451)
    .setTimestamp()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, `${message.author.avatarURL}`)
    .setDescription(`**User:** ${user} -- ${user.username}#${user.discriminator} (${user.id})\n**Action:** Unmute\n`)
    .setFooter('Unmute','https://images.discordapp.net/avatars/310929237882437633/7640635d9bd12b9aa9729e1266e44561.png?size=1024')
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
      message.channel.sendMessage(`${user}, has been unmuted`)
    });
  }
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'unmute',
  description: 'Unmutes a mentioned user',
  usage: 'unmute [mention]'
};
