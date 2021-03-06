const {MessageEmbed}= require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");




module.exports = async (member) => {
  let client = global.client;
  let ayarlar = db.get("ayar") || {};
  let jaildekiler = jdb.get("jail") || [];
  let tempjaildekiler = jdb.get("tempjail") || [{id: null}];
  let muteliler = jdb.get("mute") || [];
  let tempmute = jdb.get("tempmute") || [{id: null}];
  let seslimute = jdb.get("tempsmute") || [{id: null}];
const moment = require('moment')
  let yasakTaglilar = jdb.get("yasakTaglilar") || [];
const guild = client.guilds.cache.get("847805502862655529");
    


  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  if (ayarlar.yasakTaglar && !ayarlar.yasakTaglar.some(tag => member.user.username.includes(tag)) && yasakTaglilar.some(x => x.includes(member.id))) await jdb.set('yasakTaglilar', yasakTaglilar.filter(x => !x.includes(member.id)));
  if(jaildekiler.some(x => x.includes(member.id)) || tempjaildekiler.some(x => x.id === member.id)){
    if(ayarlar.jailRolu) member.roles.set([ayarlar.jailRolu]).catch();
  } else if (ayarlar.yasakTaglar && ayarlar.yasakTaglar.some(tag => member.user.username.includes(tag))) {
    if(ayarlar.jailRolu) member.roles.set([ayarlar.jailRolu]).catch();
    if (!yasakTaglilar.some(id => id.includes(member.id))) jdb.push('yasakTaglilar', `y${member.id}`);
    member.send(`**${member.guild.name}** adlı sunucumuzun yasaklı taglarından birine sahip olduğun için jaile atıldın! Tagı bıraktığın zaman jailden çıkabilirsin.`).catch();
  } else if (guvenilirlik) {
    if(ayarlar.fakeHesapRolu) member.roles.set([ayarlar.fakeHesapRolu]).catch();
    if(ayarlar.fakeHesapLogKanali && member.guild.channels.cache.has(ayarlar.fakeHesapLogKanali)) return member.guild.channels.cache.get(ayarlar.teyitKanali).send(new MessageEmbed().setAuthor(member.guild.name, member.guild.iconURL({dynamic: true})).setDescription(`${member} üyesi sunucuya katıldı fakat hesabı ${member.client.tarihHesapla(member.user.createdAt)} açıldığı için jaile atıldı!`).setTimestamp().setFooter("YASHINU ❤️ ALOSHA"));
  } else if(ayarlar.teyitsizRolleri) member.roles.add(ayarlar.teyitsizRolleri).catch();
  if(tempmute.some(x => x.id === member.id) || muteliler.some(x => x.includes(member.id))) member.roles.add(ayarlar.muteRolu).catch();
  if(seslimute.some(x => x.id === member.id) && member.voice.channel) member.voice.setMute(true).catch();
  

if(ayarlar.teyitKanali && member.guild.channels.cache.has(ayarlar.teyitKanali)) member.guild.channels.cache.get(ayarlar.teyitKanali).send(`

<a:resurection_elmas:853410236873048114> **${member}  Dark Sunucumuza Hoşgeldin**  Seninle beraber \`${guild.memberCount}\` kişi olduk!

<a:resurection_elmas:853410236873048114>  Hesabın \`${moment(member.user.createdTimestamp).format("LLL")}\` tarihinde oluşturulmuş. <a:resurection_batik:853360740660019230>


<a:resurection_elmas:853410236873048114> Sunucumuzun <#847805504444563504> kanalını okumayı unutma! Kuralları okumuş olarak cezai işlem uygulanacaktır!


<a:resurection_elmas:853410236873048114> Kayıt için **V.Confirmed** Odalarına geçebilirsiniz <@&852972599692755004> Sizinle İlgilenicektir.

`)



  if(ayarlar.ikinciTag) member.setNickname(`${ayarlar.ikinciTag} ${member.displayName}`).catch();
  else if(ayarlar.tag) member.setNickname(`${ayarlar.tag} ${member.displayName}`).catch();
  if(ayarlar.teyitKanali && member.guild.channels.cache.has(ayarlar.teyitKanali)) member.guild.channels.cache.get(ayarlar.teyitKanali).send
}
module.exports.configuration = {
  name: "guildMemberAdd"
}