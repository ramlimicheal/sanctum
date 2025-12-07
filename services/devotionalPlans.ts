// Curated Devotional Reading Plans
import { DevotionalPlan } from '@/types';

export const DEVOTIONAL_PLANS: DevotionalPlan[] = [
  {
    id: 'faith-foundations',
    title: 'Foundations of Faith',
    description: 'A 7-day journey through the core truths of Christianity. Perfect for new believers or those seeking to strengthen their foundation.',
    duration: 7,
    category: 'faith',
    coverImage: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80',
    days: [
      {
        day: 1,
        title: 'God\'s Unconditional Love',
        scripture: { text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', reference: 'John 3:16' },
        reflection: 'God\'s love is not based on our performance or worthiness. It is a gift freely given, demonstrated through the ultimate sacrifice of His Son. Today, meditate on the depth of this love that reaches you exactly where you are.',
        prayer: 'Father, help me grasp the width, length, height, and depth of Your love. Let this truth transform how I see myself and others. Amen.',
        actionStep: 'Write down three ways God has shown His love to you this week.'
      },
      {
        day: 2,
        title: 'Grace That Saves',
        scripture: { text: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.', reference: 'Ephesians 2:8-9' },
        reflection: 'Salvation cannot be earned through good deeds or religious rituals. It is a gift of grace received through faith. This frees us from the burden of trying to be "good enough" and allows us to rest in Christ\'s finished work.',
        prayer: 'Lord, thank You for the gift of grace. Help me to stop striving and simply receive what You have freely given. Amen.',
        actionStep: 'Identify one area where you\'ve been trying to earn God\'s approval and surrender it to Him.'
      },
      {
        day: 3,
        title: 'The Power of the Cross',
        scripture: { text: 'But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.', reference: 'Isaiah 53:5' },
        reflection: 'The cross is where justice and mercy meet. Jesus took upon Himself the punishment we deserved so that we could receive the peace and healing we don\'t deserve. This exchange is the heart of the Gospel.',
        prayer: 'Jesus, I am humbled by Your sacrifice. Help me never to take the cross for granted. May its power transform every area of my life. Amen.',
        actionStep: 'Spend 5 minutes in silence, contemplating what Jesus endured for you.'
      },
      {
        day: 4,
        title: 'New Creation in Christ',
        scripture: { text: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!', reference: '2 Corinthians 5:17' },
        reflection: 'In Christ, you are not just improved—you are made entirely new. Your past mistakes, failures, and shame do not define you. Your identity is now rooted in who Christ says you are.',
        prayer: 'Father, help me to live from my new identity rather than my old patterns. Remind me daily that I am a new creation. Amen.',
        actionStep: 'Write "I am a new creation" on a note and place it where you\'ll see it daily.'
      },
      {
        day: 5,
        title: 'The Holy Spirit Within',
        scripture: { text: 'Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God?', reference: '1 Corinthians 6:19' },
        reflection: 'God doesn\'t just save us and leave us alone. He comes to dwell within us through His Spirit. This means you have access to divine wisdom, comfort, and power every moment of every day.',
        prayer: 'Holy Spirit, make me aware of Your presence within me. Guide my thoughts, words, and actions today. Amen.',
        actionStep: 'Throughout the day, pause three times to acknowledge the Spirit\'s presence within you.'
      },
      {
        day: 6,
        title: 'Walking by Faith',
        scripture: { text: 'For we live by faith, not by sight.', reference: '2 Corinthians 5:7' },
        reflection: 'Faith is trusting God even when circumstances don\'t make sense. It\'s choosing to believe His promises over our fears. Faith grows as we step out and experience God\'s faithfulness.',
        prayer: 'Lord, increase my faith. Help me to trust You more than my circumstances. Give me courage to step out in faith today. Amen.',
        actionStep: 'Identify one area where God is calling you to trust Him more and take a small step of faith.'
      },
      {
        day: 7,
        title: 'Called to Purpose',
        scripture: { text: 'For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.', reference: 'Ephesians 2:10' },
        reflection: 'You are not an accident. God created you with intention and purpose. There are good works He has specifically prepared for you—not to earn salvation, but as an expression of it.',
        prayer: 'Father, reveal the good works You have prepared for me. Help me to walk in the purpose for which I was created. Amen.',
        actionStep: 'Ask God to show you one way you can serve someone today and act on it.'
      }
    ]
  },
  {
    id: 'prayer-life',
    title: 'Deepening Your Prayer Life',
    description: 'Learn to pray with power and intimacy. This 7-day plan will transform your conversations with God.',
    duration: 7,
    category: 'prayer',
    coverImage: 'https://images.unsplash.com/photo-1445633629932-0029acc44e88?w=800&q=80',
    days: [
      {
        day: 1,
        title: 'Prayer as Relationship',
        scripture: { text: 'Call to me and I will answer you and tell you great and unsearchable things you do not know.', reference: 'Jeremiah 33:3' },
        reflection: 'Prayer is not a religious duty but an invitation to relationship. God desires to speak with you, share His heart, and reveal His plans. Approach prayer as a conversation with your loving Father.',
        prayer: 'Father, I want to know You more. Teach me to pray not out of obligation but out of love. Open my ears to hear Your voice. Amen.',
        actionStep: 'Set aside 10 minutes today to simply talk to God as you would a close friend.'
      },
      {
        day: 2,
        title: 'The Lord\'s Prayer Pattern',
        scripture: { text: 'This, then, is how you should pray: "Our Father in heaven, hallowed be your name..."', reference: 'Matthew 6:9' },
        reflection: 'Jesus gave us a model for prayer that covers worship, surrender, provision, forgiveness, and protection. This pattern helps us pray comprehensively and keeps our prayers God-centered.',
        prayer: 'Our Father in heaven, hallowed be Your name. Your kingdom come, Your will be done on earth as it is in heaven. Amen.',
        actionStep: 'Pray through the Lord\'s Prayer slowly, expanding each phrase with your own words.'
      },
      {
        day: 3,
        title: 'Praying with Faith',
        scripture: { text: 'Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.', reference: 'Mark 11:24' },
        reflection: 'Faith-filled prayer expects God to act. It\'s not about positive thinking but about trusting in God\'s character and promises. When we pray according to His will, we can have confidence He hears us.',
        prayer: 'Lord, increase my faith. Help me to pray with expectation, trusting in Your goodness and power. Amen.',
        actionStep: 'Write down a prayer request and pray over it with bold faith, thanking God in advance.'
      },
      {
        day: 4,
        title: 'Listening in Prayer',
        scripture: { text: 'Be still, and know that I am God.', reference: 'Psalm 46:10' },
        reflection: 'Prayer is a two-way conversation. Often we do all the talking and miss what God wants to say. Learning to be still and listen is essential to a deep prayer life.',
        prayer: 'Lord, quiet my mind and heart. I want to hear Your voice. Speak, for Your servant is listening. Amen.',
        actionStep: 'Spend 5 minutes in complete silence, simply listening for God\'s voice.'
      },
      {
        day: 5,
        title: 'Persistent Prayer',
        scripture: { text: 'Then Jesus told his disciples a parable to show them that they should always pray and not give up.', reference: 'Luke 18:1' },
        reflection: 'Some prayers require persistence. Jesus taught that we should keep asking, seeking, and knocking. Persistent prayer is not about changing God\'s mind but about aligning our hearts with His timing.',
        prayer: 'Father, give me perseverance in prayer. Help me not to give up but to trust Your perfect timing. Amen.',
        actionStep: 'Revisit a prayer you\'ve stopped praying and commit to pray for it daily this week.'
      },
      {
        day: 6,
        title: 'Praying Scripture',
        scripture: { text: 'Take the helmet of salvation and the sword of the Spirit, which is the word of God.', reference: 'Ephesians 6:17' },
        reflection: 'Praying God\'s Word back to Him is powerful because we know we\'re praying according to His will. Scripture gives us language for our prayers and reminds us of His promises.',
        prayer: 'Lord, Your Word is a lamp to my feet. Help me to hide it in my heart and pray it with power. Amen.',
        actionStep: 'Choose a verse and turn it into a personal prayer for your situation.'
      },
      {
        day: 7,
        title: 'Praying Without Ceasing',
        scripture: { text: 'Rejoice always, pray continually, give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.', reference: '1 Thessalonians 5:16-18' },
        reflection: 'Prayer doesn\'t have to be formal or lengthy. We can maintain an ongoing conversation with God throughout our day—in the car, at work, while cooking. This is the lifestyle of prayer.',
        prayer: 'Lord, help me to practice Your presence throughout my day. May my life become a continuous prayer. Amen.',
        actionStep: 'Set three alarms today as reminders to pause and pray briefly.'
      }
    ]
  },
  {
    id: 'overcoming-anxiety',
    title: 'Finding Peace in Anxious Times',
    description: 'A 7-day journey to overcome worry and anxiety through Scripture and prayer.',
    duration: 7,
    category: 'healing',
    coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80',
    days: [
      {
        day: 1,
        title: 'Casting Your Cares',
        scripture: { text: 'Cast all your anxiety on him because he cares for you.', reference: '1 Peter 5:7' },
        reflection: 'God invites us to give Him our worries—not because they don\'t matter, but because He cares deeply for us. Anxiety often comes from carrying burdens we were never meant to bear alone.',
        prayer: 'Father, I cast my anxieties on You right now. Thank You for caring about every detail of my life. Help me to release what I cannot control. Amen.',
        actionStep: 'Write down your worries on paper, then physically place them in a box as a symbol of giving them to God.'
      },
      {
        day: 2,
        title: 'The Peace of God',
        scripture: { text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and minds in Christ Jesus.', reference: 'Philippians 4:6-7' },
        reflection: 'God\'s peace is not the absence of problems but His presence in the midst of them. This peace doesn\'t always make logical sense—it transcends understanding—but it guards our hearts.',
        prayer: 'Lord, I bring my anxious thoughts to You with thanksgiving. Guard my heart and mind with Your supernatural peace. Amen.',
        actionStep: 'For every worry that comes to mind today, immediately counter it with a statement of thanksgiving.'
      },
      {
        day: 3,
        title: 'God\'s Presence Removes Fear',
        scripture: { text: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.', reference: 'Psalm 23:4' },
        reflection: 'David didn\'t say he avoided dark valleys—he walked through them. But he wasn\'t afraid because God was with him. The same God who comforted David walks with you today.',
        prayer: 'Shepherd of my soul, walk with me through this valley. Your presence is my comfort and my courage. Amen.',
        actionStep: 'When anxiety rises today, whisper "You are with me" and take three deep breaths.'
      },
      {
        day: 4,
        title: 'Renewing Your Mind',
        scripture: { text: 'Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.', reference: 'Philippians 4:8' },
        reflection: 'Anxiety often feeds on negative thought patterns. Paul gives us a filter for our thoughts. When we intentionally focus on what is true and good, we starve anxiety of its fuel.',
        prayer: 'Lord, renew my mind. Help me to take every thought captive and focus on what is true, noble, and praiseworthy. Amen.',
        actionStep: 'Identify one anxious thought pattern and replace it with a truth from Scripture.'
      },
      {
        day: 5,
        title: 'Trust Over Worry',
        scripture: { text: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', reference: 'Proverbs 3:5-6' },
        reflection: 'Worry is often the result of leaning on our own understanding. When we can\'t figure things out, anxiety rises. But God invites us to trust Him even when we don\'t understand.',
        prayer: 'Father, I choose to trust You even when I don\'t understand. I surrender my need to figure everything out. Direct my path. Amen.',
        actionStep: 'Identify one situation you\'ve been trying to figure out and consciously surrender it to God.'
      },
      {
        day: 6,
        title: 'God\'s Faithfulness',
        scripture: { text: 'The LORD himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.', reference: 'Deuteronomy 31:8' },
        reflection: 'God goes before you into tomorrow. He\'s already there, preparing the way. You don\'t have to fear the future because the One who holds the future holds you.',
        prayer: 'Lord, thank You for going before me. I trust that You are already working in my tomorrow. I will not be afraid. Amen.',
        actionStep: 'Recall three times God has been faithful in your past and thank Him for each one.'
      },
      {
        day: 7,
        title: 'Rest in His Love',
        scripture: { text: 'There is no fear in love. But perfect love drives out fear.', reference: '1 John 4:18' },
        reflection: 'At the root of much anxiety is fear—fear of failure, rejection, the unknown. But God\'s perfect love casts out fear. When we are secure in His love, anxiety loses its grip.',
        prayer: 'Father, let Your perfect love drive out every fear in my heart. Help me to rest secure in Your unfailing love. Amen.',
        actionStep: 'Meditate on God\'s love for you for 5 minutes, letting it sink deep into your heart.'
      }
    ]
  },
  {
    id: 'purpose-calling',
    title: 'Discovering Your Calling',
    description: 'A 5-day journey to understand God\'s unique purpose for your life.',
    duration: 5,
    category: 'purpose',
    coverImage: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80',
    days: [
      {
        day: 1,
        title: 'Created with Purpose',
        scripture: { text: 'For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future.', reference: 'Jeremiah 29:11' },
        reflection: 'You are not an accident. Before you were born, God had plans for your life. These plans are good—designed to give you hope and a future. Your calling begins with believing this truth.',
        prayer: 'Lord, thank You for creating me with purpose. Help me to believe that You have good plans for my life. Reveal them to me. Amen.',
        actionStep: 'Write down what you believe God\'s general purpose is for all believers, then ask Him about your specific role.'
      },
      {
        day: 2,
        title: 'Your Unique Design',
        scripture: { text: 'For you created my inmost being; you knit me together in my mother\'s womb. I praise you because I am fearfully and wonderfully made.', reference: 'Psalm 139:13-14' },
        reflection: 'God designed you with specific gifts, passions, and experiences. Your calling often lies at the intersection of these. Understanding how God made you is key to discovering your purpose.',
        prayer: 'Creator God, help me to see myself as You see me—fearfully and wonderfully made. Show me the gifts You\'ve placed within me. Amen.',
        actionStep: 'List your top 3 strengths, 3 passions, and 3 significant life experiences. Look for patterns.'
      },
      {
        day: 3,
        title: 'Serving Others',
        scripture: { text: 'Each of you should use whatever gift you have received to serve others, as faithful stewards of God\'s grace in its various forms.', reference: '1 Peter 4:10' },
        reflection: 'Your calling is not primarily about your fulfillment—it\'s about serving others with the gifts God has given you. When we focus on blessing others, we often find our deepest satisfaction.',
        prayer: 'Lord, show me how to use my gifts to serve others. Help me to be a faithful steward of Your grace. Amen.',
        actionStep: 'Identify one way you can serve someone this week using a gift or skill you have.'
      },
      {
        day: 4,
        title: 'Faithful in Little',
        scripture: { text: 'Whoever can be trusted with very little can also be trusted with much.', reference: 'Luke 16:10' },
        reflection: 'Sometimes we wait for a grand calling while ignoring the small opportunities in front of us. God often reveals greater purpose as we are faithful in the little things.',
        prayer: 'Father, help me to be faithful in the small things. I trust that as I am obedient in little, You will entrust me with more. Amen.',
        actionStep: 'Identify one small responsibility you\'ve been neglecting and commit to excellence in it.'
      },
      {
        day: 5,
        title: 'Walking in Faith',
        scripture: { text: 'Your word is a lamp for my feet, a light on my path.', reference: 'Psalm 119:105' },
        reflection: 'God often reveals our calling one step at a time, not all at once. Like a lamp that illuminates just the next few steps, He guides us as we walk in faith and obedience.',
        prayer: 'Lord, I don\'t need to see the whole path—just the next step. Give me courage to walk in faith, trusting You to guide me. Amen.',
        actionStep: 'What is one step you sense God is calling you to take? Commit to taking it this week.'
      }
    ]
  },
  {
    id: 'marriage-blessing',
    title: 'Blessing Your Marriage',
    description: 'A 7-day devotional for couples seeking to strengthen their relationship through faith.',
    duration: 7,
    category: 'relationships',
    coverImage: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80',
    days: [
      {
        day: 1,
        title: 'Covenant Love',
        scripture: { text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.', reference: '1 Corinthians 13:4' },
        reflection: 'Marriage is a covenant, not just a contract. It\'s a commitment to love even when it\'s difficult. Today, reflect on how you can show patient, kind love to your spouse.',
        prayer: 'Lord, help me to love my spouse with Your kind of love—patient, kind, and selfless. Amen.',
        actionStep: 'Do one unexpected act of kindness for your spouse today.'
      },
      {
        day: 2,
        title: 'Unity in Christ',
        scripture: { text: 'Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken.', reference: 'Ecclesiastes 4:12' },
        reflection: 'A marriage with Christ at the center is stronger than one without. When both spouses are connected to God, they are more deeply connected to each other.',
        prayer: 'Father, be the third strand in our marriage. Draw us closer to You and to each other. Amen.',
        actionStep: 'Pray together with your spouse today, even if just for a few minutes.'
      },
      {
        day: 3,
        title: 'Forgiveness',
        scripture: { text: 'Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.', reference: 'Colossians 3:13' },
        reflection: 'No marriage is without hurt. But holding onto offenses poisons the relationship. Forgiveness—choosing to release the debt—is essential for a healthy marriage.',
        prayer: 'Lord, help me to forgive as You have forgiven me. Heal any wounds in our marriage. Amen.',
        actionStep: 'If there\'s any unforgiveness in your heart toward your spouse, release it to God today.'
      },
      {
        day: 4,
        title: 'Words of Life',
        scripture: { text: 'The tongue has the power of life and death, and those who love it will eat its fruit.', reference: 'Proverbs 18:21' },
        reflection: 'Our words can build up or tear down our spouse. Choose to speak life, encouragement, and affirmation. Your words have more power than you realize.',
        prayer: 'Lord, guard my tongue. Help me to speak words of life and blessing over my spouse. Amen.',
        actionStep: 'Give your spouse three specific, genuine compliments today.'
      },
      {
        day: 5,
        title: 'Serving Each Other',
        scripture: { text: 'Submit to one another out of reverence for Christ.', reference: 'Ephesians 5:21' },
        reflection: 'A Christ-centered marriage is marked by mutual submission—each putting the other\'s needs above their own. This is not weakness but Christlike strength.',
        prayer: 'Jesus, help me to serve my spouse as You served the church. Give me a servant\'s heart. Amen.',
        actionStep: 'Ask your spouse, "How can I serve you today?" and follow through.'
      },
      {
        day: 6,
        title: 'Protecting Intimacy',
        scripture: { text: 'Above all else, guard your heart, for everything you do flows from it.', reference: 'Proverbs 4:23' },
        reflection: 'Intimacy in marriage must be protected. This means guarding against anything that would come between you—whether busyness, technology, or outside influences.',
        prayer: 'Lord, help us to protect the intimacy of our marriage. Remove any barriers between us. Amen.',
        actionStep: 'Plan a date night this week with no phones or distractions.'
      },
      {
        day: 7,
        title: 'Praying Together',
        scripture: { text: 'Again, truly I tell you that if two of you on earth agree about anything they ask for, it will be done for them by my Father in heaven.', reference: 'Matthew 18:19' },
        reflection: 'Couples who pray together experience deeper connection and see God move in powerful ways. There is unique power when husband and wife agree in prayer.',
        prayer: 'Father, teach us to pray together. Unite our hearts as we seek You together. Amen.',
        actionStep: 'Establish a regular time to pray together as a couple, even if just 5 minutes daily.'
      }
    ]
  },
  {
    id: 'spiritual-warfare',
    title: 'Standing Strong: Spiritual Warfare',
    description: 'Learn to recognize and overcome spiritual battles with the armor of God.',
    duration: 7,
    category: 'faith',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    days: [
      {
        day: 1,
        title: 'The Reality of Spiritual Battle',
        scripture: { text: 'For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world and against the spiritual forces of evil in the heavenly realms.', reference: 'Ephesians 6:12' },
        reflection: 'We are in a spiritual battle whether we acknowledge it or not. Understanding this reality helps us fight with the right weapons and not against the wrong enemies.',
        prayer: 'Lord, open my eyes to the spiritual realities around me. Help me to fight the right battles with Your strength. Amen.',
        actionStep: 'Identify one area of your life where you sense spiritual opposition.'
      },
      {
        day: 2,
        title: 'The Belt of Truth',
        scripture: { text: 'Stand firm then, with the belt of truth buckled around your waist.', reference: 'Ephesians 6:14a' },
        reflection: 'The enemy\'s primary weapon is deception. The belt of truth—knowing and living God\'s truth—holds everything else together and protects us from lies.',
        prayer: 'Father, help me to know Your truth and live by it. Expose any lies I\'ve believed and replace them with Your Word. Amen.',
        actionStep: 'Identify one lie you\'ve been believing and counter it with a specific truth from Scripture.'
      },
      {
        day: 3,
        title: 'The Breastplate of Righteousness',
        scripture: { text: '...with the breastplate of righteousness in place.', reference: 'Ephesians 6:14b' },
        reflection: 'The breastplate protects the heart. When we live in righteousness—right standing with God through Christ—we guard our hearts from condemnation and accusation.',
        prayer: 'Lord, thank You that my righteousness is found in Christ alone. Guard my heart from the accuser\'s attacks. Amen.',
        actionStep: 'When guilt or shame attacks, declare: "I am the righteousness of God in Christ."'
      },
      {
        day: 4,
        title: 'Feet Fitted with Readiness',
        scripture: { text: '...and with your feet fitted with the readiness that comes from the gospel of peace.', reference: 'Ephesians 6:15' },
        reflection: 'Our feet represent our walk and our readiness to share the Gospel. Standing firm in peace and being ready to share hope are powerful weapons against darkness.',
        prayer: 'Lord, give me Your peace that passes understanding. Make me ready to share the hope I have in You. Amen.',
        actionStep: 'Be ready today to share a word of encouragement or hope with someone who needs it.'
      },
      {
        day: 5,
        title: 'The Shield of Faith',
        scripture: { text: 'In addition to all this, take up the shield of faith, with which you can extinguish all the flaming arrows of the evil one.', reference: 'Ephesians 6:16' },
        reflection: 'Faith is our shield against the enemy\'s attacks—doubt, fear, discouragement. When we trust God\'s promises, we extinguish the fiery darts aimed at our hearts.',
        prayer: 'Lord, increase my faith. Help me to trust Your promises even when circumstances seem contrary. Amen.',
        actionStep: 'Write down three promises of God and declare them over your situation.'
      },
      {
        day: 6,
        title: 'The Helmet of Salvation',
        scripture: { text: 'Take the helmet of salvation...', reference: 'Ephesians 6:17a' },
        reflection: 'The helmet protects the mind. Knowing we are saved—secure in Christ—protects our thoughts from the enemy\'s attacks on our identity and security.',
        prayer: 'Father, thank You for my salvation. Protect my mind from doubt and help me to think as a child of God. Amen.',
        actionStep: 'When negative thoughts attack, remind yourself: "I am saved, secure, and loved by God."'
      },
      {
        day: 7,
        title: 'The Sword of the Spirit',
        scripture: { text: '...and the sword of the Spirit, which is the word of God.', reference: 'Ephesians 6:17b' },
        reflection: 'The sword is our only offensive weapon. Jesus used Scripture to defeat Satan\'s temptations. Knowing and speaking God\'s Word gives us power to overcome.',
        prayer: 'Lord, help me to know Your Word so well that I can wield it effectively against the enemy. Amen.',
        actionStep: 'Memorize one verse this week that you can use when facing temptation or attack.'
      }
    ]
  }
];

export const getDevotionalPlanById = (id: string): DevotionalPlan | undefined => {
  return DEVOTIONAL_PLANS.find(plan => plan.id === id);
};

export const getDevotionalPlansByCategory = (category: DevotionalPlan['category']): DevotionalPlan[] => {
  return DEVOTIONAL_PLANS.filter(plan => plan.category === category);
};
