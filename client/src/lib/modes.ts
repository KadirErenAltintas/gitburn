/**
 * Fun Mode system for GitBurn
 * Generates different tones for the same data
 */

export type FunMode = "normal" | "roast" | "motivational";
export type ModeLocale = "en" | "tr";

export interface ModeMessages {
  insight: string;
  summary: string;
  roast: string;
}

/**
 * Generate messages based on fun mode
 */
export function generateModeMessages(
  score: number,
  personality: string,
  signals: string[],
  mode: FunMode,
  locale: ModeLocale = "en"
): ModeMessages {
  if (mode === "roast") {
    return generateRoastMessages(score, personality, signals, locale);
  } else if (mode === "motivational") {
    return generateMotivationalMessages(score, personality, signals, locale);
  } else {
    return generateNormalMessages(score, personality, signals, locale);
  }
}

/**
 * Normal mode - balanced, informative tone
 */
function generateNormalMessages(
  score: number,
  personality: string,
  signals: string[],
  locale: ModeLocale
): ModeMessages {
  if (locale === "tr") {
    let insight = `**${personality}** tespit edildi!\n\n`;
    if (score >= 80) {
      insight += "Fazla yukleniyor olabilirsin. Aktivite pattern'lerin surdurulebilir gorunmuyor. Molalari planlamayi dusun.";
    } else if (score >= 60) {
      insight += "Yogun calisiyorsun. Tutku guzel ama dinlenme ve ozel hayat dengesini koruman gerekiyor.";
    } else if (score >= 40) {
      insight += "Ritmin orta seviyede. Genel denge fena degil, ama optimize edilecek alanlar var.";
    } else {
      insight += "Saglikli bir is-yasam dengesi gorunuyor. Aliskanliklarin uzun vadede daha surdurulebilir.";
    }

    let summary = "";
    if (score >= 80) {
      summary = "GitHub aktiviten kritik tuketim sinyalleri veriyor. Gece/gece sonu yogunlugu ve az dinlenme uzun vadede riskli.";
    } else if (score >= 60) {
      summary = "Yogun calisma ve sinirli mola pattern'i var. Uretkenlik guzel ama surdurulebilirlik icin dinlenme gerekli.";
    } else if (score >= 40) {
      summary = "Genel olarak dengeli bir tempo var. Pattern'lerini takip etmeye devam edip gerekirse ayarlama yap.";
    } else {
      summary = "Dengeli bir calisma temposu gorunuyor. Bu sekilde devam etmek uzun vadede en guvenli yol.";
    }

    let roast = "";
    if (score >= 80) roast = "Uyku duzenin log dosyasinda kayip gibi. Commit grafikleri her seyi anlatiyor.";
    else if (score >= 60) roast = "Commitlerin saat dilimi var: 03:00. Biraz uyku sart.";
    else if (score >= 40) roast = "Idare ediyorsun. Ne cok iyi ne kotu. Tam orta karar.";
    else roast = "Is-yasam dengesini bulmussun. Lutfen digerlerine de anlat.";

    return { insight, summary, roast };
  }

  let insight = `**${personality}** detected!\n\n`;

  if (score >= 80) {
    insight += `You may be overworking and approaching burnout. Your GitHub activity shows patterns of unsustainable work. Consider taking breaks and setting healthier boundaries.`;
  } else if (score >= 60) {
    insight += `You're working intensely. While passion is great, make sure you're balancing work with rest and personal time. Consider setting boundaries on your work hours.`;
  } else if (score >= 40) {
    insight += `Your work pattern is moderate. You're maintaining a reasonable balance, though there's room for optimization. Keep monitoring your habits.`;
  } else {
    insight += `You're maintaining a healthy work-life balance. Your coding habits suggest sustainable productivity without excessive overwork.`;
  }

  let summary = "";
  if (score >= 80) {
    summary = `Your GitHub activity shows critical burnout indicators. The combination of late-night work, weekend activity, and no rest days suggests you're pushing yourself too hard. Please prioritize your health and well-being. Take breaks, set boundaries, and consider talking to someone about managing your workload.`;
  } else if (score >= 60) {
    summary = `Your GitHub activity shows patterns of intense work with limited breaks. While your productivity is impressive, be mindful of sustainability. Regular rest is crucial for long-term performance and well-being.`;
  } else if (score >= 40) {
    summary = `You maintain a reasonably balanced coding schedule. Your activity shows moderate intensity with some rest periods. Continue monitoring your patterns and make adjustments if needed.`;
  } else {
    summary = `You maintain a healthy coding schedule with consistent rest periods. Your GitHub activity shows sustainable productivity patterns. Keep up the good work and continue prioritizing work-life balance.`;
  }

  let roast = "";
  if (score >= 80) {
    roast = `Your sleep schedule doesn't exist. Your GitHub commit history is proof.`;
  } else if (score >= 60) {
    roast = `Your commits have a timezone. It's 3 AM. Go to bed.`;
  } else if (score >= 40) {
    roast = `You're doing okay. Not great, not terrible. Pretty mid, honestly.`;
  } else {
    roast = `You have a work-life balance. Teach us your ways.`;
  }

  return { insight, summary, roast };
}

/**
 * Roast mode - harsh, funny, brutally honest
 */
function generateRoastMessages(
  score: number,
  personality: string,
  signals: string[],
  locale: ModeLocale
): ModeMessages {
  if (locale === "tr") {
    let insight = `**${personality}** tespit edildi! 💀\n\n`;
    if (score >= 80) insight += "GitHub grafigin acil durum sinyali veriyor. Bu hustle degil, klavye uzerinden kendini yakma speedrun'i.";
    else if (score >= 60) insight += "Kendini uretkenlik makinesi saniyorsun ama burnout speedrun acmissin. Biraz fren yap.";
    else if (score >= 40) insight += "Cok kotu degil ama pek parlak da degil. Orta kalite bir dizi gibi gidiyor.";
    else insight += "Bu nadir bir durum: hayatin dengede. Bozma.";

    let summary = "";
    if (score >= 80) summary = "Aktivite desenin korku filmi gibi: gece commitleri, hafta sonu mesaisi, az dinlenme.";
    else if (score >= 60) summary = "Sert grind var ama duvara yaklasiyorsun. Dusmeden once hiz kes.";
    else if (score >= 40) summary = "Ne iyi ne kotu. Is-yasam dengesinde bir ust seviyeye cikma zamani.";
    else summary = "Gercekten dengeli gidiyorsun. Cogu gelistirici bu huzuru gormuyor.";

    let roast = "";
    if (score >= 80) roast = "Commit saatlerin korku filmi gibi. 03:00, 04:00... Masayi banyoya tasimaya ramak kalmis.";
    else if (score >= 60) roast = "Hafta sonu calismayi kisilik ozelligi yapmissin. Spoiler: degil.";
    else if (score >= 40) roast = "Iyisin. Asiri derecede duzgun ve sikici bir sekilde.";
    else roast = "Kodun sifresini cozmussun. Nadir bir unicorn vakasi.";

    return { insight, summary, roast };
  }

  let insight = `**${personality}** detected! 💀\n\n`;

  if (score >= 80) {
    insight += `Listen, your GitHub graph looks like a cry for help. You're coding at times when normal humans are sleeping. This isn't hustle—this is self-sabotage with a keyboard.`;
  } else if (score >= 60) {
    insight += `You think you're a productivity machine, but you're actually just a burnout speedrun. Your weekend commits are screaming "I have no hobbies." Fix it.`;
  } else if (score >= 40) {
    insight += `You're not terrible, but you're not exactly winning at life either. Your commit graph is like a mediocre Netflix show—watchable but forgettable.`;
  } else {
    insight += `Okay, you actually have your life together. This is rare. Don't mess it up.`;
  }

  let summary = "";
  if (score >= 80) {
    summary = `Your GitHub activity is a horror movie. Late-night commits, weekend work, zero rest days—you're basically a developer zombie. Seek help immediately.`;
  } else if (score >= 60) {
    summary = `You're grinding hard, but grinding yourself into dust. Your productivity is impressive, but your burnout trajectory is more impressive. Slow down before you crash.`;
  } else if (score >= 40) {
    summary = `You're coasting. Not bad, not good. If this were a video game, you'd be on normal difficulty. Consider leveling up your work-life balance.`;
  } else {
    summary = `You're actually living the dream. Balanced work, regular breaks, a life outside of code. Most developers will never know this peace. Cherish it.`;
  }

  let roast = "";
  if (score >= 80) {
    roast = `Your commits are timestamped like a horror movie. 3 AM? 4 AM? At this point, just move your desk to the bathroom.`;
  } else if (score >= 60) {
    roast = `You code on weekends like it's a personality trait. Spoiler: it's not. It's a cry for help.`;
  } else if (score >= 40) {
    roast = `You're fine. Aggressively, boringly fine.`;
  } else {
    roast = `You've cracked the code (pun intended). You're basically a unicorn in the dev world.`;
  }

  return { insight, summary, roast };
}

/**
 * Motivational mode - encouraging, supportive, growth-focused
 */
function generateMotivationalMessages(
  score: number,
  personality: string,
  signals: string[],
  locale: ModeLocale
): ModeMessages {
  if (locale === "tr") {
    let insight = `**${personality}** tespit edildi! 🌟\n\n`;
    if (score >= 80) insight += "Kodlama tutkusu cok guclu, ama sen makine degilsin. Surdurulebilir aliskanliklar kurmak simdi en dogru adim.";
    else if (score >= 60) insight += "Ciddi emek veriyorsun ve bu cok degerli. Simdi bu enerjiyi daha dengeli rutine cevirme zamani.";
    else if (score >= 40) insight += "Iyi gidiyorsun. Calisan bir ritim yakalamissin; kucuk iyilestirmelerle daha da guclenebilirsin.";
    else insight += "Harika gidiyorsun. Hirs ve oz-bakim dengesini cok iyi kurmussun.";

    let summary = "";
    if (score >= 80) summary = "Yuksek adanmislik var. Bir sonraki adim bunu saglikli ve surdurulebilir bir duzene cevirmek.";
    else if (score >= 60) summary = "Emek net sekilde gorunuyor. Dinlenme bloklari ekleyerek hem performansi hem mutlulugu artirabilirsin.";
    else if (score >= 40) summary = "Dengeyi guzel yonetiyorsun. Bu temeli koruyup aliskanliklarini rafine etmeye devam et.";
    else summary = "Ideal ritmi bulmussun. Uzun vadeli ve saglikli gelisim icin guclu bir temel.";

    let roast = "";
    if (score >= 80) roast = "Adanmisligin ilham verici. Simdi bunu oz-bakimla destekle.";
    else if (score >= 60) roast = "Dogru yoldasin. Biraz daha dinlenme ekle, etkisi buyuk olur.";
    else if (score >= 40) roast = "Gayet iyi gidiyorsun. Devam.";
    else roast = "Rol model gibisin. Bu dengeyi koru.";

    return { insight, summary, roast };
  }

  let insight = `**${personality}** detected! 🌟\n\n`;

  if (score >= 80) {
    insight += `Your passion for coding is incredible, but remember: you're not a machine. Your well-being is just as important as your code. This is an opportunity to build sustainable habits that will serve you for decades to come.`;
  } else if (score >= 60) {
    insight += `You're putting in serious effort, and that dedication is admirable! You're clearly driven and committed. Now's the time to channel that energy into building habits that keep you energized long-term.`;
  } else if (score >= 40) {
    insight += `You're doing well! You've found a rhythm that works, and you're maintaining it. Keep building on this foundation—small improvements can lead to big results.`;
  } else {
    insight += `You're crushing it! You've mastered the balance between ambition and self-care. Your approach is a model for sustainable success. Keep inspiring others with your example.`;
  }

  let summary = "";
  if (score >= 80) {
    summary = `Your GitHub activity shows incredible dedication. You're clearly passionate about your work. The next step is channeling that passion into sustainable practices. Take breaks, rest, and remember that your best work comes when you're well-rested and healthy. You've got this!`;
  } else if (score >= 60) {
    summary = `You're putting in the work, and it shows! Your activity level demonstrates real commitment. Now focus on adding rest and recovery to your routine. You'll be even more productive and happier for it.`;
  } else if (score >= 40) {
    summary = `You're maintaining a solid balance! You're productive without sacrificing your well-being. This is the sweet spot. Keep refining your habits and you'll continue to grow.`;
  } else {
    summary = `You've found the ideal rhythm! Your sustainable approach to coding is something to be proud of. You're building a career that will last, and that's the real win.`;
  }

  let roast = "";
  if (score >= 80) {
    roast = `Your commitment is inspiring. Now channel it into self-care. Future you will thank present you.`;
  } else if (score >= 60) {
    roast = `You're on the right track. Add more rest, and you'll be unstoppable.`;
  } else if (score >= 40) {
    roast = `You're doing great. Keep it up!`;
  } else {
    roast = `You're a role model. Keep leading by example.`;
  }

  return { insight, summary, roast };
}

/**
 * Get mode label for UI
 */
export function getModeLabelAndEmoji(
  mode: FunMode,
  locale: ModeLocale = "en"
): { label: string; emoji: string } {
  const labels =
    locale === "tr"
      ? {
          roast: "Roast Modu",
          motivational: "Motivasyon Modu",
          normal: "Normal Mod",
        }
      : {
          roast: "Roast Mode",
          motivational: "Motivational Mode",
          normal: "Normal Mode",
        };

  switch (mode) {
    case "roast":
      return { label: labels.roast, emoji: "🔥" };
    case "motivational":
      return { label: labels.motivational, emoji: "💪" };
    default:
      return { label: labels.normal, emoji: "📊" };
  }
}
