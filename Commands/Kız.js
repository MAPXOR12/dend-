const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");

module.exports.execute = async (client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Lzoyn ❤️").setColor(client.randomColor()).setTimestamp();
  if((!ayar.erkekRolleri && !ayar.kizRolleri) || !ayar.teyitciRolleri) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipRolu)) return message.channel.send(embed.setDescription(`Kayıt komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  args = args.filter(a => a !== "" && a !== " ").splice(1);
  let yazilacakIsim;
  if (db.get(`ayar.isim-yas`)) {
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(embed.setDescription("Geçerli bir isim ve yaş belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    yazilacakIsim = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
  } else {
    let isim = args.join(' ');
    if(!isim) return message.channel.send(embed.setDescription("Geçerli bir isim belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    yazilacakIsim = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
  };
      if (ayar.teyitsizRolleri && ayar.teyitsizRolleri.some(rol => uye.roles.cache.has(rol))) kdb.add(`teyit.${message.author.id}.kiz`, 1);
      await uye.roles.set(ayar.kizRolleri || []).catch();
    uye.setNickname(`${yazilacakIsim}`).catch();
    if(ayar.tag && uye.user.username.includes(ayar.tag)) uye.roles.add(ayar.ekipRolu).catch();

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`**Kayıt Başarılı <a:bonay2:847186647589060649>**

<a:elms:847189533644685324> **Kullanıcının İsmi :**  \`${yazilacakIsim} \` 
 
<a:elms:847189533644685324> **Kullanıcının Cinsiyeti :** : \`Kadın\`

<a:elms:847189533644685324> **Verilen Roller:** <@&847053859629301765>

<a:elms:847189533644685324> **Yetkili :** ${message.author}`)

.setFooter('Lzoyn Was Here')
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setImage("https://media.discordapp.net/attachments/608711473652563968/834012334309376030/image0.gif")    
.setTimestamp()

message.channel.send(arwEmbed)
client.channels.cache.get("847053860040474633").send(`${uye} Aramıza Katılan Bİr Prenses Var. Hoşgeldin <a:byuvarlanma:847186670536491078>`)

};
module.exports.configuration = {
  name: "kız",
  aliases: ["kız", "k", "woman", "girl"],
  usage: "kız [üye] [isim] [yaş]",
  description: "Belirtilen üyeyi kız olarak kaydeder."
};