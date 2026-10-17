import { Celebrity } from '@/types';

export const initialCelebrities: Celebrity[] = [
  // ==========================================
  // BOLLYWOOD HEROES
  // ==========================================
  {
    id: 'srk-01',
    slug: 'shah-rukh-khan',
    name: 'Shah Rukh Khan',
    realName: 'Shahrukh Khan',
    industry: 'Bollywood',
    role: 'Hero',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1965-11-02',
    age: 59,
    birthplace: 'New Delhi, India',
    height: "5' 8\" (173 cm)",
    nationality: 'Indian',
    zodiacSign: 'Scorpio',
    spouse: 'Gauri Khan (m. 1991)',
    debutYear: 1992,
    debutMovie: 'Deewana',
    biography:
      'Often referred to in media as the "Baadshah of Bollywood", "King of Bollywood", and "King Khan", Shah Rukh Khan has appeared in more than 90 films and earned numerous accolades, including 14 Filmfare Awards. Khan began his acting career with appearances in television series in the late 1980s before making his Hindi film debut in Deewana (1992). He achieved astronomical stardom playing anti-hero roles in Baazigar and Darr before establishing himself as the ultimate romantic icon in Dilwale Dulhania Le Jayenge, Dil To Pagal Hai, and Kuch Kuch Hota Hai.',
    actingStyle:
      'Intense expressive eyes, charismatic screen presence, iconic outstretched arms romantic pose, and fearless versatility across intense drama, romance, and high-octane action.',
    trivia: [
      'Dilwale Dulhania Le Jayenge is the longest-running film in Indian cinema history, screening for over 28 consecutive years at Maratha Mandir in Mumbai.',
      'Awarded the Padma Shri by the Government of India and the Ordre des Arts et des Lettres by the French government.',
      'Achieved historic record-breaking back-to-back 1000-crore worldwide grossers in 2023 with Pathaan and Jawan.',
      'Owns the Kolkata Knight Riders IPL cricket franchise.'
    ],
    socialLinks: {
      instagram: 'https://instagram.com/iamsrk',
      twitter: 'https://twitter.com/iamsrk',
      imdb: 'https://www.imdb.com/name/nm0451321/',
    },
    awards: [
      { id: 'aw-01', name: 'Filmfare Award', category: 'Best Actor', year: 1994, movieTitle: 'Baazigar' },
      { id: 'aw-02', name: 'Filmfare Award', category: 'Best Actor', year: 1996, movieTitle: 'Dilwale Dulhania Le Jayenge' },
      { id: 'aw-03', name: 'Filmfare Award', category: 'Best Actor', year: 1999, movieTitle: 'Kuch Kuch Hota Hai' },
      { id: 'aw-04', name: 'Filmfare Award', category: 'Best Actor', year: 2003, movieTitle: 'Devdas' },
      { id: 'aw-05', name: 'Filmfare Award', category: 'Best Actor', year: 2005, movieTitle: 'Swades' },
      { id: 'aw-06', name: 'Filmfare Award', category: 'Best Actor', year: 2008, movieTitle: 'Chak De! India' },
      { id: 'aw-07', name: 'Filmfare Award', category: 'Best Actor', year: 2011, movieTitle: 'My Name Is Khan' },
      { id: 'aw-08', name: 'Padma Shri', category: 'Civilian Honor', year: 2005 }
    ],
    filmography: [
      {
        title: 'Jawan',
        year: 2023,
        role: 'Vikram Rathore / Azad Rathore',
        verdict: 'All-Time Blockbuster',
        rating: 7.0,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Thriller', 'Drama'],
        director: 'Atlee'
      },
      {
        title: 'Pathaan',
        year: 2023,
        role: 'Pathaan',
        verdict: 'All-Time Blockbuster',
        rating: 6.9,
        posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Spy', 'Thriller'],
        director: 'Siddharth Anand'
      },
      {
        title: 'Chak De! India',
        year: 2007,
        role: 'Kabir Khan',
        verdict: 'Super Hit',
        rating: 8.2,
        posterUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
        genre: ['Drama', 'Sport'],
        director: 'Shimit Amin'
      },
      {
        title: 'Swades',
        year: 2004,
        role: 'Mohan Bhargava',
        verdict: 'Average',
        rating: 8.3,
        posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
        genre: ['Drama'],
        director: 'Ashutosh Gowariker'
      },
      {
        title: 'Dilwale Dulhania Le Jayenge',
        year: 1995,
        role: 'Raj Malhotra',
        verdict: 'All-Time Blockbuster',
        rating: 8.0,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Romance', 'Drama'],
        director: 'Aditya Chopra'
      }
    ],
    featured: true,
    trendingRank: 1,
    boxOfficeTotalGross: '$1.4 Billion+ USD Worldwide'
  },
  {
    id: 'aamir-02',
    slug: 'aamir-khan',
    name: 'Aamir Khan',
    realName: 'Mohammed Aamir Hussain Khan',
    industry: 'Bollywood',
    role: 'Hero',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1965-03-14',
    age: 60,
    birthplace: 'Mumbai, Maharashtra, India',
    height: "5' 6\" (168 cm)",
    nationality: 'Indian',
    zodiacSign: 'Pisces',
    debutYear: 1988,
    debutMovie: 'Qayamat Se Qayamat Tak',
    biography:
      'Known as "Mr. Perfectionist" of Indian cinema, Aamir Khan is celebrated for meticulous preparation and revolutionizing commercial Hindi films with socially relevant, intellectually stimulating narratives. His film Lagaan (2001) was nominated for the Academy Award for Best Foreign Language Film. He single-handedly unlocked the massive Chinese box office for Indian cinema with Dangal, Secret Superstar, and 3 Idiots.',
    actingStyle: 'Method acting, intense physical transformations, subtle emotional nuance, and total dedication to character realism.',
    trivia: [
      'Dangal remains the highest-grossing Indian film worldwide with over ₹2,000 crore ($300M+).',
      'Gained 28 kilograms and then shed it back in 5 months to portray older and younger Mahavir Singh Phogat in Dangal.',
      'Recipient of the Padma Bhushan and Padma Shri awards.'
    ],
    socialLinks: {
      imdb: 'https://www.imdb.com/name/nm0451187/',
    },
    awards: [
      { id: 'aw-09', name: 'National Film Award', category: 'Special Jury Award', year: 1989, movieTitle: 'Raakh' },
      { id: 'aw-10', name: 'Filmfare Award', category: 'Best Actor', year: 1997, movieTitle: 'Raja Hindustani' },
      { id: 'aw-11', name: 'Filmfare Award', category: 'Best Actor', year: 2002, movieTitle: 'Lagaan' },
      { id: 'aw-12', name: 'Filmfare Award', category: 'Best Actor', year: 2017, movieTitle: 'Dangal' }
    ],
    filmography: [
      {
        title: 'Dangal',
        year: 2016,
        role: 'Mahavir Singh Phogat',
        verdict: 'All-Time Blockbuster',
        rating: 8.3,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Biography', 'Drama', 'Sport'],
        director: 'Nitesh Tiwari'
      },
      {
        title: 'PK',
        year: 2014,
        role: 'PK',
        verdict: 'All-Time Blockbuster',
        rating: 8.1,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Comedy', 'Drama', 'Sci-Fi'],
        director: 'Rajkumar Hirani'
      },
      {
        title: '3 Idiots',
        year: 2009,
        role: 'Ranchhoddas Chanchad / Phunsukh Wangdu',
        verdict: 'All-Time Blockbuster',
        rating: 8.4,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Comedy', 'Drama'],
        director: 'Rajkumar Hirani'
      },
      {
        title: 'Lagaan',
        year: 2001,
        role: 'Bhuvan',
        verdict: 'Blockbuster',
        rating: 8.1,
        posterUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
        genre: ['Adventure', 'Drama', 'Musical'],
        director: 'Ashutosh Gowariker'
      }
    ],
    featured: true,
    trendingRank: 3,
    boxOfficeTotalGross: '$1.2 Billion+ USD Worldwide'
  },
  {
    id: 'hrithik-03',
    slug: 'hrithik-roshan',
    name: 'Hrithik Roshan',
    realName: 'Hrithik Rakesh Roshan',
    industry: 'Bollywood',
    role: 'Hero',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1974-01-10',
    age: 51,
    birthplace: 'Mumbai, Maharashtra, India',
    height: "5' 11\" (180 cm)",
    nationality: 'Indian',
    zodiacSign: 'Capricorn',
    debutYear: 2000,
    debutMovie: 'Kaho Naa... Pyaar Hai',
    biography:
      'Hailed as the "Greek God of Bollywood" for his sculpted physique, striking looks, and peerless dancing agility, Hrithik Roshan took the subcontinent by storm with his meteoric debut in Kaho Naa... Pyaar Hai. Over his two-decade career, he pioneered Indian superhero cinema with Krrish and delivered powerhouse performances in Dhoom 2, Jodhaa Akbar, Guzaarish, and War.',
    actingStyle: 'Electrifying dance technique, high physical charisma, depth in portraying characters overcoming physical and mental challenges.',
    trivia: [
      'Won both Filmfare Best Male Debut and Best Actor for the same debut film in 2000.',
      'Overcame severe childhood stammering through relentless speech therapy and discipline.',
      'Created India’s first homegrown superhero mega-franchise with the Krrish series.'
    ],
    socialLinks: {
      instagram: 'https://instagram.com/hrithikroshan',
      twitter: 'https://twitter.com/iHrithik',
      imdb: 'https://www.imdb.com/name/nm0743946/',
    },
    awards: [
      { id: 'aw-13', name: 'Filmfare Award', category: 'Best Actor', year: 2001, movieTitle: 'Kaho Naa... Pyaar Hai' },
      { id: 'aw-14', name: 'Filmfare Award', category: 'Best Actor', year: 2004, movieTitle: 'Koi... Mil Gaya' },
      { id: 'aw-15', name: 'Filmfare Award', category: 'Best Actor', year: 2007, movieTitle: 'Dhoom 2' },
      { id: 'aw-16', name: 'Filmfare Award', category: 'Best Actor', year: 2009, movieTitle: 'Jodhaa Akbar' }
    ],
    filmography: [
      {
        title: 'War',
        year: 2019,
        role: 'Major Kabir Luthra',
        verdict: 'Blockbuster',
        rating: 6.5,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Thriller'],
        director: 'Siddharth Anand'
      },
      {
        title: 'Super 30',
        year: 2019,
        role: 'Anand Kumar',
        verdict: 'Super Hit',
        rating: 7.9,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Biography', 'Drama'],
        director: 'Vikas Bahl'
      },
      {
        title: 'Zindagi Na Milegi Dobara',
        year: 2011,
        role: 'Arjun Saluja',
        verdict: 'Super Hit',
        rating: 8.2,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Adventure', 'Comedy', 'Drama'],
        director: 'Zoya Akhtar'
      },
      {
        title: 'Dhoom 2',
        year: 2006,
        role: 'Aryan Singh / Mr. A',
        verdict: 'All-Time Blockbuster',
        rating: 6.6,
        posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Thriller'],
        director: 'Sanjay Gadhvi'
      }
    ],
    featured: true,
    trendingRank: 5,
    boxOfficeTotalGross: '$650 Million+ USD Worldwide'
  },
  {
    id: 'amitabh-04',
    slug: 'amitabh-bachchan',
    name: 'Amitabh Bachchan',
    realName: 'Amitabh Shrivastav',
    industry: 'Bollywood',
    role: 'Hero',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1942-10-11',
    age: 82,
    birthplace: 'Prayagraj (Allahabad), Uttar Pradesh, India',
    height: "6' 2\" (188 cm)",
    nationality: 'Indian',
    zodiacSign: 'Libra',
    spouse: 'Jaya Bachchan (m. 1973)',
    debutYear: 1969,
    debutMovie: 'Saat Hindustani',
    biography:
      'Revered as the "Shahenshah of Bollywood", "Star of the Millennium", and the "Angry Young Man" of 1970s cinema, Amitabh Bachchan is regarded as one of the most influential actors in cinema history. Francois Truffaut called him a "one-man industry". With over 200 films spanning more than five decades, he is a cultural giant honored with four National Film Awards and the Dadasaheb Phalke Award.',
    actingStyle: 'Resonant baritone voice, towering physical stature, volcanic emotional intensity, and masterful theatrical dialogue delivery.',
    trivia: [
      'Named "Actor of the Millennium" in a BBC News online poll in 1999 ahead of Charlie Chaplin and Marlon Brando.',
      'Has won four National Film Awards for Best Actor, an unmatched achievement in Hindi cinema.',
      'Hosts the beloved quiz show Kaun Banega Crorepati since 2000.'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/SrBachchan',
      instagram: 'https://instagram.com/amitabhbachchan',
      imdb: 'https://www.imdb.com/name/nm0000821/',
    },
    awards: [
      { id: 'aw-17', name: 'National Film Award', category: 'Best Actor', year: 1991, movieTitle: 'Agneepath' },
      { id: 'aw-18', name: 'National Film Award', category: 'Best Actor', year: 2006, movieTitle: 'Black' },
      { id: 'aw-19', name: 'National Film Award', category: 'Best Actor', year: 2010, movieTitle: 'Paa' },
      { id: 'aw-20', name: 'National Film Award', category: 'Best Actor', year: 2016, movieTitle: 'Piku' },
      { id: 'aw-21', name: 'Dadasaheb Phalke Award', category: 'Lifetime Achievement', year: 2019 }
    ],
    filmography: [
      {
        title: 'Sholay',
        year: 1975,
        role: 'Jai (Jaidev)',
        verdict: 'All-Time Blockbuster',
        rating: 8.2,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Adventure', 'Drama'],
        director: 'Ramesh Sippy'
      },
      {
        title: 'Piku',
        year: 2015,
        role: 'Bhashkor Banerjee',
        verdict: 'Super Hit',
        rating: 7.6,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Comedy', 'Drama'],
        director: 'Shoojit Sircar'
      },
      {
        title: 'Black',
        year: 2005,
        role: 'Debraj Sahai',
        verdict: 'Super Hit',
        rating: 8.1,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Drama'],
        director: 'Sanjay Leela Bhansali'
      }
    ],
    featured: true,
    trendingRank: 8,
    boxOfficeTotalGross: '$1.0 Billion+ USD Worldwide'
  },

  // ==========================================
  // BOLLYWOOD HEROINES
  // ==========================================
  {
    id: 'deepika-05',
    slug: 'deepika-padukone',
    name: 'Deepika Padukone',
    industry: 'Bollywood',
    role: 'Heroine',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1986-01-05',
    age: 39,
    birthplace: 'Copenhagen, Denmark',
    height: "5' 9\" (175 cm)",
    nationality: 'Indian',
    zodiacSign: 'Capricorn',
    spouse: 'Ranveer Singh (m. 2018)',
    debutYear: 2007,
    debutMovie: 'Om Shanti Om',
    biography:
      'Deepika Padukone is one of India’s highest-paid and most accomplished actresses. Featured in Time magazine’s 100 most influential people in the world, she debuted opposite Shah Rukh Khan in the smash hit Om Shanti Om (2007). Padukone cemented her legendary status with complex historical epics and modern masterpieces under Sanjay Leela Bhansali and Shoojit Sircar including Goliyon Ki Raasleela Ram-Leela, Bajirao Mastani, Piku, and Padmaavat.',
    actingStyle: 'Luminous cinematic presence, regal composure, emotionally resonant vulnerability, and fierce physical command in period dramas.',
    trivia: [
      'Represented India on the prestigious Cannes Film Festival Competition Jury in 2022.',
      'Unveiled the FIFA World Cup trophy in Lusail Stadium at the Qatar 2022 Final.',
      'Founded the Live Love Laugh Foundation to champion mental health awareness across India.',
      'Daughter of badminton legend Prakash Padukone.'
    ],
    socialLinks: {
      instagram: 'https://instagram.com/deepikapadukone',
      twitter: 'https://twitter.com/deepikapadukone',
      imdb: 'https://www.imdb.com/name/nm2138653/',
    },
    awards: [
      { id: 'aw-22', name: 'Filmfare Award', category: 'Best Female Debut', year: 2008, movieTitle: 'Om Shanti Om' },
      { id: 'aw-23', name: 'Filmfare Award', category: 'Best Actress', year: 2014, movieTitle: 'Goliyon Ki Raasleela Ram-Leela' },
      { id: 'aw-24', name: 'Filmfare Award', category: 'Best Actress', year: 2016, movieTitle: 'Piku' },
      { id: 'aw-25', name: 'TIME100 Impact Award', category: 'Global Leadership', year: 2022 }
    ],
    filmography: [
      {
        title: 'Padmaavat',
        year: 2018,
        role: 'Rani Padmavati',
        verdict: 'All-Time Blockbuster',
        rating: 7.1,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Drama', 'History', 'Romance'],
        director: 'Sanjay Leela Bhansali'
      },
      {
        title: 'Bajirao Mastani',
        year: 2015,
        role: 'Mastani',
        verdict: 'Blockbuster',
        rating: 7.2,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Drama', 'History'],
        director: 'Sanjay Leela Bhansali'
      },
      {
        title: 'Piku',
        year: 2015,
        role: 'Piku Banerjee',
        verdict: 'Super Hit',
        rating: 7.6,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Comedy', 'Drama'],
        director: 'Shoojit Sircar'
      },
      {
        title: 'Yeh Jawaani Hai Deewani',
        year: 2013,
        role: 'Naina Talwar',
        verdict: 'All-Time Blockbuster',
        rating: 7.3,
        posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        genre: ['Drama', 'Musical', 'Romance'],
        director: 'Ayan Mukerji'
      }
    ],
    featured: true,
    trendingRank: 2,
    boxOfficeTotalGross: '$780 Million+ USD Worldwide'
  },
  {
    id: 'alia-06',
    slug: 'alia-bhatt',
    name: 'Alia Bhatt',
    industry: 'Bollywood',
    role: 'Heroine',
    profileImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1993-03-15',
    age: 32,
    birthplace: 'Mumbai, Maharashtra, India',
    height: "5' 3\" (160 cm)",
    nationality: 'British',
    zodiacSign: 'Pisces',
    spouse: 'Ranbir Kapoor (m. 2022)',
    debutYear: 2012,
    debutMovie: 'Student of the Year',
    biography:
      'Widely acknowledged as one of the finest acting talents of contemporary world cinema, Alia Bhatt has won five Filmfare Best Actress awards and a National Film Award. After her glossy debut in 2012, she astonished critics with her raw versatility in Imtiaz Ali’s Highway (2014) and Udta Punjab (2016). Her tour-de-force title portrayal in Gangubai Kathiawadi (2022) garnered standing ovations at the Berlin International Film Festival.',
    actingStyle: 'Intuitive emotional immersion, effortless dialect transitions, raw vulnerability, and infectious cinematic energy.',
    trivia: [
      'Tied the record with Nutan and Kajol by winning 5 Filmfare Best Actress trophies.',
      'Won the 69th National Film Award for Best Actress for Gangubai Kathiawadi.',
      'Made her Hollywood debut alongside Gal Gadot in Heart of Stone (2023).'
    ],
    socialLinks: {
      instagram: 'https://instagram.com/aliaabhatt',
      twitter: 'https://twitter.com/aliaa08',
      imdb: 'https://www.imdb.com/name/nm4757388/',
    },
    awards: [
      { id: 'aw-26', name: 'National Film Award', category: 'Best Actress', year: 2023, movieTitle: 'Gangubai Kathiawadi' },
      { id: 'aw-27', name: 'Filmfare Award', category: 'Best Actress', year: 2017, movieTitle: 'Udta Punjab' },
      { id: 'aw-28', name: 'Filmfare Award', category: 'Best Actress', year: 2019, movieTitle: 'Raazi' },
      { id: 'aw-29', name: 'Filmfare Award', category: 'Best Actress', year: 2020, movieTitle: 'Gully Boy' },
      { id: 'aw-30', name: 'Filmfare Award', category: 'Best Actress', year: 2023, movieTitle: 'Gangubai Kathiawadi' }
    ],
    filmography: [
      {
        title: 'Gangubai Kathiawadi',
        year: 2022,
        role: 'Gangubai Harjivandas',
        verdict: 'Super Hit',
        rating: 7.8,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Biography', 'Crime', 'Drama'],
        director: 'Sanjay Leela Bhansali'
      },
      {
        title: 'Raazi',
        year: 2018,
        role: 'Sehmat Khan Syed',
        verdict: 'Super Hit',
        rating: 7.7,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Drama', 'Thriller'],
        director: 'Meghna Gulzar'
      },
      {
        title: 'Gully Boy',
        year: 2019,
        role: 'Safeena Firdausi',
        verdict: 'Super Hit',
        rating: 7.9,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Drama', 'Music', 'Romance'],
        director: 'Zoya Akhtar'
      }
    ],
    featured: true,
    trendingRank: 4,
    boxOfficeTotalGross: '$450 Million+ USD Worldwide'
  },
  {
    id: 'priyanka-07',
    slug: 'priyanka-chopra',
    name: 'Priyanka Chopra Jonas',
    industry: 'Bollywood',
    role: 'Heroine',
    profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1982-07-18',
    age: 42,
    birthplace: 'Jamshedpur, Jharkhand, India',
    height: "5' 6\" (169 cm)",
    nationality: 'Indian',
    zodiacSign: 'Cancer',
    spouse: 'Nick Jonas (m. 2018)',
    debutYear: 2003,
    debutMovie: 'The Hero: Love Story of a Spy',
    biography:
      'Crowned Miss World 2000, Priyanka Chopra Jonas has built an extraordinary transcontinental career bridging Bollywood and Hollywood. In India, she earned the National Film Award for Fashion (2008) and acclaim for Barfi!, Mary Kom, and Bajirao Mastani. Internationally, she made television history as the first South Asian woman to headline an American network drama series (ABC’s Quantico) and starred in Citadel.',
    actingStyle: 'Fierce versatility, emotional agility, uninhibited boldness, and world-class magnetic screen authority.',
    trivia: [
      'Won the National Film Award for Best Actress for her portrayal of a troubled supermodel in Fashion.',
      'Honored with the Padma Shri in 2016 by the Government of India.',
      'Global Goodwill Ambassador for UNICEF since 2016.'
    ],
    socialLinks: {
      instagram: 'https://instagram.com/priyankachopra',
      twitter: 'https://twitter.com/priyankachopra',
      imdb: 'https://www.imdb.com/name/nm1231899/',
    },
    awards: [
      { id: 'aw-31', name: 'National Film Award', category: 'Best Actress', year: 2009, movieTitle: 'Fashion' },
      { id: 'aw-32', name: 'Filmfare Award', category: 'Best Actress', year: 2009, movieTitle: 'Fashion' },
      { id: 'aw-33', name: 'Filmfare Award', category: 'Best Supporting Actress', year: 2016, movieTitle: 'Bajirao Mastani' }
    ],
    filmography: [
      {
        title: 'Barfi!',
        year: 2012,
        role: 'Jhilmil Chatterjee',
        verdict: 'Super Hit',
        rating: 8.1,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Comedy', 'Drama', 'Romance'],
        director: 'Anurag Basu'
      },
      {
        title: 'Bajirao Mastani',
        year: 2015,
        role: 'Kashibai',
        verdict: 'Blockbuster',
        rating: 7.2,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Drama', 'History'],
        director: 'Sanjay Leela Bhansali'
      },
      {
        title: 'Mary Kom',
        year: 2014,
        role: 'Mary Kom',
        verdict: 'Hit',
        rating: 6.8,
        posterUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
        genre: ['Biography', 'Drama', 'Sport'],
        director: 'Omung Kumar'
      }
    ],
    featured: false,
    trendingRank: 9,
    boxOfficeTotalGross: '$500 Million+ USD Worldwide'
  },

  // ==========================================
  // HOLLYWOOD HEROES
  // ==========================================
  {
    id: 'leo-08',
    slug: 'leonardo-dicaprio',
    name: 'Leonardo DiCaprio',
    realName: 'Leonardo Wilhelm DiCaprio',
    industry: 'Hollywood',
    role: 'Hero',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1974-11-11',
    age: 50,
    birthplace: 'Los Angeles, California, USA',
    height: "6' 0\" (183 cm)",
    nationality: 'American',
    zodiacSign: 'Scorpio',
    debutYear: 1991,
    debutMovie: 'Critters 3',
    biography:
      'Widely regarded as one of the preeminent cinematic actors of his generation, Leonardo DiCaprio is renowned for unyielding dedication to demanding roles in unconventional period and biographical films. After global teen idolatry following Titanic (1997), he formed an iconic partnership with director Martin Scorsese spanning Gangs of New York, The Aviator, The Departed, Shutter Island, and The Wolf of Wall Street. He won the Academy Award for Best Actor for The Revenant (2015).',
    actingStyle: 'Extreme physical and psychological commitment, hypnotic monologues, raw emotional authenticity, and uncanny ability to inhabit obsessive characters.',
    trivia: [
      'Ate raw bison liver and slept inside animal carcasses during the grueling shoot for The Revenant.',
      'His films have grossed over $7.2 billion worldwide.',
      'An outspoken global environmental activist who addressed the United Nations Climate Summit.',
      'Received his first Oscar nomination at age 19 for What’s Eating Gilbert Grape (1993).'
    ],
    socialLinks: {
      instagram: 'https://instagram.com/leonardodicaprio',
      twitter: 'https://twitter.com/LeoDiCaprio',
      imdb: 'https://www.imdb.com/name/nm0000138/',
    },
    awards: [
      { id: 'aw-34', name: 'Academy Award (Oscar)', category: 'Best Actor', year: 2016, movieTitle: 'The Revenant' },
      { id: 'aw-35', name: 'Golden Globe Award', category: 'Best Actor – Motion Picture Drama', year: 2005, movieTitle: 'The Aviator' },
      { id: 'aw-36', name: 'Golden Globe Award', category: 'Best Actor – Musical/Comedy', year: 2014, movieTitle: 'The Wolf of Wall Street' },
      { id: 'aw-37', name: 'Golden Globe Award', category: 'Best Actor – Motion Picture Drama', year: 2016, movieTitle: 'The Revenant' },
      { id: 'aw-38', name: 'BAFTA Award', category: 'Best Actor in a Leading Role', year: 2016, movieTitle: 'The Revenant' }
    ],
    filmography: [
      {
        title: 'Inception',
        year: 2010,
        role: 'Dom Cobb',
        verdict: 'All-Time Blockbuster',
        rating: 8.8,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        director: 'Christopher Nolan'
      },
      {
        title: 'The Wolf of Wall Street',
        year: 2013,
        role: 'Jordan Belfort',
        verdict: 'Super Hit',
        rating: 8.2,
        posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        genre: ['Biography', 'Comedy', 'Crime'],
        director: 'Martin Scorsese'
      },
      {
        title: 'The Revenant',
        year: 2015,
        role: 'Hugh Glass',
        verdict: 'Blockbuster',
        rating: 8.0,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Adventure', 'Drama'],
        director: 'Alejandro G. Iñárritu'
      },
      {
        title: 'Titanic',
        year: 1997,
        role: 'Jack Dawson',
        verdict: 'All-Time Blockbuster',
        rating: 7.9,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Drama', 'Romance'],
        director: 'James Cameron'
      }
    ],
    featured: true,
    trendingRank: 6,
    boxOfficeTotalGross: '$7.2 Billion+ USD Worldwide'
  },
  {
    id: 'rdj-09',
    slug: 'robert-downey-jr',
    name: 'Robert Downey Jr.',
    realName: 'Robert John Downey Jr.',
    industry: 'Hollywood',
    role: 'Hero',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1965-04-04',
    age: 60,
    birthplace: 'New York City, New York, USA',
    height: "5' 9\" (174 cm)",
    nationality: 'American',
    zodiacSign: 'Aries',
    spouse: 'Susan Downey (m. 2005)',
    debutYear: 1970,
    debutMovie: 'Pound',
    biography:
      'Robert Downey Jr. is one of the most bankable and revered actors in Hollywood history. After early critical acclaim in Chaplin (1992), he staged the greatest career comeback in Hollywood lore by launching the Marvel Cinematic Universe as Tony Stark / Iron Man in 2008. In 2024, he won the Academy Award for Best Supporting Actor for his powerhouse portrayal of Lewis Strauss in Christopher Nolan’s Oppenheimer.',
    actingStyle: 'Razor-sharp witty banter, rapid-fire improvisational genius, emotional depth beneath arrogant exteriors, and theatrical charisma.',
    trivia: [
      'His films have grossed over $14 billion worldwide, making him the highest-grossing leading actor in film history.',
      'Won his first Oscar in 2024 for Oppenheimer after three nominations over 31 years.',
      'Studied Wing Chun kung fu under master Eric Oram to help maintain personal recovery and focus.'
    ],
    socialLinks: {
      instagram: 'https://instagram.com/robertdowneyjr',
      twitter: 'https://twitter.com/RobertDowneyJr',
      imdb: 'https://www.imdb.com/name/nm0000375/',
    },
    awards: [
      { id: 'aw-39', name: 'Academy Award (Oscar)', category: 'Best Supporting Actor', year: 2024, movieTitle: 'Oppenheimer' },
      { id: 'aw-40', name: 'Golden Globe Award', category: 'Best Supporting Actor', year: 2024, movieTitle: 'Oppenheimer' },
      { id: 'aw-41', name: 'BAFTA Award', category: 'Best Supporting Actor', year: 2024, movieTitle: 'Oppenheimer' },
      { id: 'aw-42', name: 'Golden Globe Award', category: 'Best Actor – Musical/Comedy', year: 2010, movieTitle: 'Sherlock Holmes' }
    ],
    filmography: [
      {
        title: 'Oppenheimer',
        year: 2023,
        role: 'Lewis Strauss',
        verdict: 'All-Time Blockbuster',
        rating: 8.9,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Biography', 'Drama', 'History'],
        director: 'Christopher Nolan'
      },
      {
        title: 'Avengers: Endgame',
        year: 2019,
        role: 'Tony Stark / Iron Man',
        verdict: 'All-Time Blockbuster',
        rating: 8.4,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        director: 'Anthony & Joe Russo'
      },
      {
        title: 'Iron Man',
        year: 2008,
        role: 'Tony Stark / Iron Man',
        verdict: 'Blockbuster',
        rating: 7.9,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        director: 'Jon Favreau'
      }
    ],
    featured: true,
    trendingRank: 7,
    boxOfficeTotalGross: '$14.4 Billion+ USD Worldwide'
  },
  {
    id: 'tom-10',
    slug: 'tom-cruise',
    name: 'Tom Cruise',
    realName: 'Thomas Cruise Mapother IV',
    industry: 'Hollywood',
    role: 'Hero',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1962-07-03',
    age: 62,
    birthplace: 'Syracuse, New York, USA',
    height: "5' 7\" (170 cm)",
    nationality: 'American',
    zodiacSign: 'Cancer',
    debutYear: 1981,
    debutMovie: 'Endless Love',
    biography:
      'Regarded as the ultimate global movie superstar, Tom Cruise has stood at the summit of Hollywood for over four decades. From Top Gun (1986), Rain Man, and Jerry Maguire to steering the breathtaking Mission: Impossible series, Cruise is legendary for performing his own death-defying practical stunts, including hanging from flying cargo planes and scaling the Burj Khalifa.',
    actingStyle: 'Relentless kinetic energy, high-stakes commitment to physical realism, piercing intensity, and undeniable movie star aura.',
    trivia: [
      'Steven Spielberg famously credited Tom Cruise with "saving Hollywood’s ass" and theatrical exhibition with Top Gun: Maverick ($1.49B).',
      'Holds a licensed pilot rating and flew real fighter aircraft scenes in Top Gun: Maverick.',
      'Has received the honorary Palme d’Or at the Cannes Film Festival.'
    ],
    socialLinks: {
      instagram: 'https://instagram.com/tomcruise',
      twitter: 'https://twitter.com/TomCruise',
      imdb: 'https://www.imdb.com/name/nm0000129/',
    },
    awards: [
      { id: 'aw-43', name: 'Golden Globe Award', category: 'Best Actor – Motion Picture Drama', year: 1990, movieTitle: 'Born on the Fourth of July' },
      { id: 'aw-44', name: 'Golden Globe Award', category: 'Best Actor – Musical/Comedy', year: 1997, movieTitle: 'Jerry Maguire' },
      { id: 'aw-45', name: 'Honorary Palme d’Or', category: 'Career Achievement', year: 2022 }
    ],
    filmography: [
      {
        title: 'Top Gun: Maverick',
        year: 2022,
        role: 'Capt. Pete "Maverick" Mitchell',
        verdict: 'All-Time Blockbuster',
        rating: 8.3,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Drama'],
        director: 'Joseph Kosinski'
      },
      {
        title: 'Mission: Impossible – Fallout',
        year: 2018,
        role: 'Ethan Hunt',
        verdict: 'Blockbuster',
        rating: 7.7,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Adventure', 'Thriller'],
        director: 'Christopher McQuarrie'
      }
    ],
    featured: true,
    trendingRank: 10,
    boxOfficeTotalGross: '$11.5 Billion+ USD Worldwide'
  },

  // ==========================================
  // HOLLYWOOD HEROINES
  // ==========================================
  {
    id: 'scarlett-11',
    slug: 'scarlett-johansson',
    name: 'Scarlett Johansson',
    realName: 'Scarlett Ingrid Johansson',
    industry: 'Hollywood',
    role: 'Heroine',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1984-11-22',
    age: 40,
    birthplace: 'New York City, New York, USA',
    height: "5' 3\" (160 cm)",
    nationality: 'American',
    zodiacSign: 'Scorpio',
    spouse: 'Colin Jost (m. 2020)',
    debutYear: 1994,
    debutMovie: 'North',
    biography:
      'Scarlett Johansson is the highest-grossing female movie lead in box office history, with her films accumulating over $14.5 billion worldwide. From her breakthrough in Sofia Coppola’s Lost in Translation (2003) to her decade-long defining performance as Natasha Romanoff / Black Widow across the Marvel Cinematic Universe, Johansson combines unmatched blockbuster commercial power with delicate arthouse precision in Marriage Story and Jojo Rabbit.',
    actingStyle: 'Husky distinctive voice, subtle emotional layering, steely resolve in action, and immense intimacy in dramatic dialogues.',
    trivia: [
      'Achieved the rare distinction of receiving two Oscar nominations in the same year (2020) for Marriage Story and Jojo Rabbit.',
      'Highest-grossing actress of all time with more than $14.5 billion grossed.',
      'Won the BAFTA Award for Best Actress for Lost in Translation at age 19.'
    ],
    socialLinks: {
      imdb: 'https://www.imdb.com/name/nm0424060/',
    },
    awards: [
      { id: 'aw-46', name: 'BAFTA Award', category: 'Best Actress in a Leading Role', year: 2004, movieTitle: 'Lost in Translation' },
      { id: 'aw-47', name: 'Tony Award', category: 'Best Featured Actress in a Play', year: 2010, movieTitle: 'A View from the Bridge' },
      { id: 'aw-48', name: 'César Award', category: 'Honorary César', year: 2014 }
    ],
    filmography: [
      {
        title: 'Marriage Story',
        year: 2019,
        role: 'Nicole Barber',
        verdict: 'Super Hit',
        rating: 7.9,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Comedy', 'Drama', 'Romance'],
        director: 'Noah Baumbach'
      },
      {
        title: 'Avengers: Endgame',
        year: 2019,
        role: 'Natasha Romanoff / Black Widow',
        verdict: 'All-Time Blockbuster',
        rating: 8.4,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        director: 'Anthony & Joe Russo'
      },
      {
        title: 'Lost in Translation',
        year: 2003,
        role: 'Charlotte',
        verdict: 'Super Hit',
        rating: 7.7,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Comedy', 'Drama'],
        director: 'Sofia Coppola'
      }
    ],
    featured: true,
    trendingRank: 11,
    boxOfficeTotalGross: '$14.5 Billion+ USD Worldwide'
  },
  {
    id: 'margot-12',
    slug: 'margot-robbie',
    name: 'Margot Robbie',
    realName: 'Margot Elise Robbie',
    industry: 'Hollywood',
    role: 'Heroine',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1990-07-02',
    age: 34,
    birthplace: 'Dalby, Queensland, Australia',
    height: "5' 6\" (168 cm)",
    nationality: 'Australian',
    zodiacSign: 'Cancer',
    spouse: 'Tom Ackerley (m. 2016)',
    debutYear: 2008,
    debutMovie: 'Vigilante',
    biography:
      'Margot Robbie is one of modern Hollywood’s most visionary creative forces as an actress and producer. She exploded into global consciousness in Martin Scorsese’s The Wolf of Wall Street (2013) before earning Oscar nominations for I, Tonya and Bombshell. Through her production company LuckyChap Entertainment, she produced and starred in Greta Gerwig’s Barbie (2023), creating a $1.44 billion cultural phenomenon.',
    actingStyle: 'Chameleonic character transformations, fearless comedic timing, incandescent charm, and fierce emotional tenacity.',
    trivia: [
      'Barbie (2023) became the highest-grossing film in Warner Bros. studio history with $1.44 billion.',
      'Did all her own ice skating routines for 4 months preparing for I, Tonya.',
      'Nominated for three Academy Awards as both an actress and producer.'
    ],
    socialLinks: {
      imdb: 'https://www.imdb.com/name/nm3053338/',
    },
    awards: [
      { id: 'aw-49', name: 'Critics Choice Award', category: 'Best Actress in a Comedy', year: 2018, movieTitle: 'I, Tonya' },
      { id: 'aw-50', name: 'BAFTA Award', category: 'Nominated Best Actress', year: 2018, movieTitle: 'I, Tonya' },
      { id: 'aw-51', name: 'Golden Globe Award', category: 'Cinematic and Box Office Achievement', year: 2024, movieTitle: 'Barbie' }
    ],
    filmography: [
      {
        title: 'Barbie',
        year: 2023,
        role: 'Barbie',
        verdict: 'All-Time Blockbuster',
        rating: 6.9,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Adventure', 'Comedy', 'Fantasy'],
        director: 'Greta Gerwig'
      },
      {
        title: 'The Wolf of Wall Street',
        year: 2013,
        role: 'Naomi Lapaglia',
        verdict: 'Super Hit',
        rating: 8.2,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Biography', 'Comedy', 'Crime'],
        director: 'Martin Scorsese'
      },
      {
        title: 'Once Upon a Time in Hollywood',
        year: 2019,
        role: 'Sharon Tate',
        verdict: 'Super Hit',
        rating: 7.6,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Comedy', 'Drama'],
        director: 'Quentin Tarantino'
      }
    ],
    featured: true,
    trendingRank: 12,
    boxOfficeTotalGross: '$4.2 Billion+ USD Worldwide'
  },
  {
    id: 'emma-13',
    slug: 'emma-stone',
    name: 'Emma Stone',
    realName: 'Emily Jean Stone',
    industry: 'Hollywood',
    role: 'Heroine',
    profileImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
    ],
    dob: '1988-11-06',
    age: 36,
    birthplace: 'Scottsdale, Arizona, USA',
    height: "5' 6\" (168 cm)",
    nationality: 'American',
    zodiacSign: 'Scorpio',
    spouse: 'Dave McCary (m. 2020)',
    debutYear: 2007,
    debutMovie: 'Superbad',
    biography:
      'Emma Stone is a two-time Academy Award-winning actress celebrated for her expressive emotional range and daring artistic collaborations. She earned her first Oscar for Damien Chazelle’s romantic musical masterpiece La La Land (2016) and won her second Oscar for her tour-de-force performance as Bella Baxter in Yorgos Lanthimos’s Poor Things (2023).',
    actingStyle: 'Luminous expressive eyes, husky voice, fearless eccentric vulnerability, and exceptional musical & comedic timing.',
    trivia: [
      'One of only eight actresses in cinema history to win two Best Actress Academy Awards before turning 36.',
      'Starred on Broadway in the revival of the musical Cabaret as Sally Bowles.',
      'Longtime muse of acclaimed visionary director Yorgos Lanthimos.'
    ],
    socialLinks: {
      imdb: 'https://www.imdb.com/name/nm1297015/',
    },
    awards: [
      { id: 'aw-52', name: 'Academy Award (Oscar)', category: 'Best Actress', year: 2017, movieTitle: 'La La Land' },
      { id: 'aw-53', name: 'Academy Award (Oscar)', category: 'Best Actress', year: 2024, movieTitle: 'Poor Things' },
      { id: 'aw-54', name: 'BAFTA Award', category: 'Best Actress in a Leading Role', year: 2017, movieTitle: 'La La Land' },
      { id: 'aw-55', name: 'BAFTA Award', category: 'Best Actress in a Leading Role', year: 2024, movieTitle: 'Poor Things' }
    ],
    filmography: [
      {
        title: 'Poor Things',
        year: 2023,
        role: 'Bella Baxter',
        verdict: 'Super Hit',
        rating: 7.9,
        posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
        genre: ['Comedy', 'Drama', 'Romance', 'Sci-Fi'],
        director: 'Yorgos Lanthimos'
      },
      {
        title: 'La La Land',
        year: 2016,
        role: 'Mia Dolan',
        verdict: 'All-Time Blockbuster',
        rating: 8.0,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        genre: ['Comedy', 'Drama', 'Music', 'Romance'],
        director: 'Damien Chazelle'
      },
      {
        title: 'The Favourite',
        year: 2018,
        role: 'Abigail Masham',
        verdict: 'Hit',
        rating: 7.5,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
        genre: ['Biography', 'Comedy', 'Drama'],
        director: 'Yorgos Lanthimos'
      }
    ],
    featured: true,
    trendingRank: 13,
    boxOfficeTotalGross: '$2.8 Billion+ USD Worldwide'
  }
];
