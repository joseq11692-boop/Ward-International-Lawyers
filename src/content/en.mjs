export default {
  lang: 'en',
  locale: 'en_US',
  langName: 'English',

  ui: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    nav: { practice: 'Practice Areas', cocounsel: 'Foreign Law Firms', team: 'Team', guides: 'Insights', contact: 'Contact' },
    allPractice: 'All practice areas',
    ctaConsult: 'Book a consultation',
    ctaWhatsapp: 'Message us on WhatsApp',
    ctaCall: 'Call',
    whatsappShort: 'WhatsApp',
    consultShort: 'Consult',
    learnMore: 'Learn more',
    readGuide: 'Read guide',
    home: 'Home',
    partner: 'Founding Partner',
    assistant: 'Legal Assistant',
    viewProfile: 'View profile',
    leadBy: 'Who handles your matter',
    faqTitle: 'Frequently asked questions',
    related: 'Related practice areas',
    relatedGuides: 'Related insights',
    toc: 'In this guide',
    whatWeDo: 'What we do',
    howWeWork: 'How we work',
    steps: [
      { t: 'Initial consultation', d: 'Tell us about your matter by WhatsApp, phone or video call. We listen, ask the right questions and tell you frankly whether we can help.' },
      { t: 'Assessment and strategy', d: 'We review documents, deadlines and risks, and propose a concrete plan of action with alternatives.' },
      { t: 'Written proposal', d: 'Before we start you receive the scope, fees and estimated timeline in writing. No surprises.' },
      { t: 'Execution and reporting', d: 'A partner leads your matter and reports every relevant development, in your language.' },
    ],
    languages: 'Languages',
    education: 'Education',
    practiceAreas: 'Practice areas',
    associations: 'Associations',
    honors: 'Honors',
    directContact: 'Direct contact',
    langNames: { es: 'Spanish', en: 'English', de: 'German', it: 'Italian' },
    minRead: 'min read',
    updated: 'Updated',
    by: 'By',
    disclaimer: 'The information on this website is general in nature and does not constitute legal advice. For advice on your specific situation, please consult one of our attorneys.',
    rights: 'All rights reserved.',
    footerAbout: 'Panamanian law firm focused on complex litigation, corporate law and international business, serving clients from around the world.',
    footerPractice: 'Practice areas',
    footerFirm: 'The firm',
    footerContact: 'Contact',
    privacy: 'Privacy',
    office: 'Office',
    phones: 'Phone',
    email: 'Email',
    openMaps: 'Open in Google Maps',
    langSuggest: { text: 'This website is available in English.', go: 'View in English', dismiss: 'Close' },
    cookies: { text: 'We use analytics cookies to understand how the site is used and to improve it.', accept: 'Accept', reject: 'Decline' },
    waMessage: 'Hello, I am contacting you from wardintlawyers.com. I would like to ask about a legal matter.',
    waArea: 'Hello, I am contacting you from wardintlawyers.com. I would like to ask about {area}.',
    form: {
      title: 'Tell us about your matter',
      intro: 'Fill in the form and we will get back to you. All information is treated confidentially.',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone / WhatsApp',
      country: 'Country',
      area: 'Area of interest',
      areaPlaceholder: 'Select an option',
      other: 'Other matter',
      message: 'How can we help?',
      consent: 'I accept the <a href="{privacy}">privacy policy</a>.',
      submit: 'Send enquiry',
      submitWa: 'Send via WhatsApp',
      submitEmail: 'Send by email instead',
      sending: 'Sending…',
      ok: 'Thank you. We have received your message and will contact you shortly.',
      error: 'We could not send the form. Please message us on WhatsApp or by email.',
      waNote: 'Submitting opens WhatsApp with your message ready to send.',
      confidential: 'Confidential communication',
    },
    notFound: { title: 'Page not found', text: 'The page you are looking for does not exist or has moved.', back: 'Back to home' },
    trust: [
      'Founding partners on every matter',
      'English · Español · Deutsch',
      'Costa del Este, Panama City',
      'Panama National Bar Association',
    ],
  },

  pages: {
    home: {
      title: 'Panama Law Firm | Complex Litigation & Corporate Law | Ward International Lawyers',
      description: 'Panama law firm for international companies and investors. Complex litigation, corporate, maritime and immigration law. Service in English, Spanish and German.',
      eyebrow: 'Law firm · Panama City',
      h1: 'Complex litigation and corporate law in Panama',
      lead: 'We protect and structure the interests of companies, investors and law firms from around the world. Sound litigation strategy, and partners who work with you directly in English, Spanish or German.',
      featuredTitle: 'Two core practices. One standard.',
      featuredLead: 'We focus where we add the most value for clients with interests in Panama.',
      featured: [
        {
          key: 'litigation',
          title: 'Complex litigation',
          text: 'Litigation is our core business. We handle civil, commercial, criminal, maritime and condominium cases with a strategic mindset and an internal structure built to deliver results.',
          points: ['Civil and commercial litigation', 'Criminal defense and private prosecution', 'Arbitration and mediation', 'Maritime disputes'],
        },
        {
          key: 'corporate',
          title: 'Corporate law and international business',
          text: 'We do more than incorporate companies: we support your business from its initial structure through daily operations, contracts and negotiations.',
          points: ['Corporations and private foundations', 'Tax ID, DGI and operating notice', 'Contracts and negotiation', 'Ongoing retainer counsel'],
        },
      ],
      moreTitle: 'Other practice areas',
      whyTitle: 'Why clients choose us',
      whyLead: 'A boutique firm with international reach: partner-level attention with big-firm preparation.',
      why: [
        { t: 'A partner on every matter', d: 'One of our founding partners personally leads your matter from start to finish.' },
        { t: 'We speak your language', d: 'We work in English, Spanish and German — uncommon in Panama and key for European clients.' },
        { t: 'International training', d: 'Studies in Panama, the United States, Spain and Germany in procedural, maritime and commercial law and business.' },
        { t: 'Trusted by other firms', d: 'Panamanian and international law firms entrust us with their work in Panama as local counsel.' },
      ],
      cocounselTitle: 'Are you a foreign law firm?',
      cocounselText: 'We act as your local counsel in Panama: litigation, due diligence, incorporations and filings before authorities, with clear reporting and full respect for your client relationship.',
      cocounselCta: 'Work with us',
      germanTitle: 'Wir sprechen Deutsch.',
      germanText: 'Beratung zu Prozessführung, Gesellschaftsrecht und Umzug nach Panama — direkt auf Deutsch.',
      germanCta: 'Zur deutschen Website',
      teamTitle: 'The partners',
      teamLead: 'Litigation and business advisory experience, with training in four countries.',
      guidesTitle: 'Insights on investing and litigating in Panama',
      finalTitle: 'Speak with an attorney today',
      finalText: 'Tell us about your situation. A first conversation lets us understand your matter and tell you clearly how we can help.',
    },

    practice: {
      title: 'Practice Areas | Panama Attorneys | Ward International Lawyers',
      description: 'Complex litigation, corporate law, local counsel for foreign firms, maritime, immigration, labor and real estate law in Panama.',
      eyebrow: 'Practice areas',
      h1: 'Legal services in Panama',
      lead: 'Legal solutions focused on practical results for our clients, with particular strength in complex litigation and corporate law.',
    },

    litigation: {
      title: 'Complex Litigation Lawyers in Panama | Ward International Lawyers',
      description: 'Trial lawyers in Panama for complex civil, commercial, criminal and maritime cases, arbitration and mediation. Service in English, Spanish and German.',
      eyebrow: 'Core practice',
      h1: 'Complex litigation in Panama',
      lead: 'Litigation is our core business. We handle high-value, high-sensitivity cases with diligence, speed and a strategy designed from day one.',
      short: 'High-stakes civil, commercial, criminal and maritime cases, arbitration and mediation.',
      image: 'justice',
      intro: [
        'Over our years of practice we have learned that, beyond legal knowledge, a strategic mindset, energy and the right tactics are what make litigation successful. That is why we built an efficient internal structure that lets us act quickly and achieve the results our clients need.',
        'This way of working has made us a strategic partner not only for our clients but also for Panamanian and international law firms that entrust us with their cases in Panama.',
      ],
      offerings: [
        { t: 'Civil and commercial litigation', d: 'Debt collection, breach of contract, liability claims, shareholder and corporate disputes.' },
        { t: 'Criminal law', d: 'Defense and victim representation under Panama’s accusatory criminal system, including white-collar matters.' },
        { t: 'Maritime litigation', d: 'Claims before Panama’s Maritime Courts, including interim measures against vessels.' },
        { t: 'Condominium disputes', d: 'Administrative complaints and disputes between owners, managers and boards.' },
        { t: 'Arbitration and mediation', d: 'Alternative dispute resolution for commercial disputes at lower cost and with more control over timing.' },
        { t: 'Enforcement of foreign judgments', d: 'Recognition (exequatur) of judgments and awards rendered outside Panama.' },
      ],
      sections: [
        {
          h: 'Litigation for clients outside Panama',
          p: ['Many of our clients live or are headquartered abroad. We coordinate powers of attorney, apostilles and official translations, and keep you informed in your language so you can make decisions without traveling.'],
        },
      ],
      leads: ['john', 'jose'],
      faqs: [
        { q: 'Can you represent me if I live outside Panama?', a: 'Yes. You only need to grant a power of attorney before a notary in your country, apostilled (or legalized) and, if it is not in Spanish, translated by an authorized public translator in Panama. We guide you through each step.' },
        { q: 'How long does a lawsuit take in Panama?', a: 'It depends on the type of proceeding, the court and the opposing party’s conduct. In the initial consultation we give you a realistic estimate and explain the stages and options to shorten it, such as mediation or settlement.' },
        { q: 'What if our contract has an arbitration clause?', a: 'Panama is a party to the New York Convention and has a modern commercial arbitration law. We assess whether arbitration or court proceedings are best and represent you in either.' },
        { q: 'How are fees set?', a: 'According to the complexity of the case: a fee per stage, hourly rates or a combination. You always receive a written proposal before we start.' },
      ],
      related: ['cocounsel', 'corporate', 'maritime'],
    },

    corporate: {
      title: 'Corporate Lawyers in Panama | Companies & Foundations | Ward International Lawyers',
      description: 'Incorporation of Panama corporations and private interest foundations, tax ID, operating notice, bank accounts, contracts and ongoing corporate counsel.',
      eyebrow: 'Core practice',
      h1: 'Corporate law and international business in Panama',
      lead: 'We add value to corporate services: beyond setting up your company or foundation, we support the growth of your business in Panama.',
      short: 'Companies, foundations, bank accounts, contracts, M&A and ongoing counsel.',
      image: 'earth',
      intro: [
        'Panama is one of the most attractive places in the world to do business: a dollarized economy, a privileged location and flexible corporate legislation. Taking advantage of it requires a well-designed structure from the start and compliance with an increasingly demanding regulatory framework.',
        'We do not stop at incorporating corporations, investment companies and private interest foundations: we support you through bank account opening, tax registrations, contracts and the negotiations your business needs to operate.',
      ],
      offerings: [
        { t: 'Companies and foundations', d: 'Incorporation of corporations, investment companies and private interest foundations; amendments and minutes.' },
        { t: 'Getting operational', d: 'Registration with the tax authority (DGI), operating notice and the registrations needed to operate locally.' },
        { t: 'Bank accounts', d: 'Preparing the bank file and supporting you through corporate account opening.' },
        { t: 'Commercial contracts', d: 'Drafting and reviewing sale, distribution, services, joint venture and shareholder agreements.' },
        { t: 'Mergers and acquisitions', d: 'Legal due diligence, structuring and documentation of acquisitions, sales and mergers.' },
        { t: 'Wealth planning', d: 'Structures to protect and organize family and business assets.' },
        { t: 'Negotiation and mediation', d: 'We represent you in negotiations and offer out-of-court mediation for commercial disputes.' },
        { t: 'Ongoing counsel', d: 'A monthly retainer so your company always has a trusted attorney on call.' },
      ],
      sections: [
        {
          h: 'Employment solutions for companies',
          p: ['As part of our corporate service, we set up your company’s employment relationships in Panama: employment contracts, internal work rules, payroll and Social Security registration.'],
        },
      ],
      leads: ['john', 'jose'],
      faqs: [
        { q: 'Can I incorporate a company in Panama without traveling?', a: 'Yes. Incorporation can be done remotely with the due diligence documents of the shareholders and beneficial owners. Some banks may require an in-person or video interview to open the account.' },
        { q: 'How long does it take?', a: 'Registering the company at the Public Registry usually takes a few business days once we have complete documentation. Bank account opening normally takes longer and depends on each bank.' },
        { q: 'Corporation or private interest foundation?', a: 'A corporation is the usual vehicle to run a business; a private interest foundation is mainly used for wealth and succession planning. We recommend the structure that fits your goal.' },
        { q: 'What are the annual obligations of a Panama company?', a: 'Among others, paying the annual franchise tax, keeping a registered agent, maintaining accounting records and keeping beneficial ownership information up to date. If it operates in Panama, it must also meet its tax and municipal obligations.' },
      ],
      related: ['litigation', 'labor', 'immigration'],
    },

    cocounsel: {
      title: 'Panama Local Counsel for Foreign Law Firms | Ward International Lawyers',
      description: 'Panama local counsel for foreign law firms: litigation, due diligence, incorporations and filings. Communication in English, Spanish and German.',
      eyebrow: 'For law firms',
      h1: 'Your local counsel in Panama',
      lead: 'Panamanian and international law firms entrust us with their matters in Panama. We work as an extension of your team, with clear reporting and full respect for your client relationship.',
      short: 'Local counsel for foreign law firms: litigation, due diligence and filings.',
      image: 'earth',
      intro: [
        'When your client has a matter in Panama, you need a local partner who understands both Panamanian law and the way an international firm works. That is our daily work.',
        'Our partners were trained in Panama, the United States, Spain and Germany, and work in English, Spanish and German. That makes communication with your team and your client simple.',
      ],
      offerings: [
        { t: 'Litigation as co-counsel', d: 'Court representation in Panama under your strategy, with regular reports in your language.' },
        { t: 'Due diligence', d: 'Searches on companies, assets, vessels, liens and court proceedings in Panamanian registries.' },
        { t: 'Incorporation and maintenance', d: 'Companies, foundations and registered agent services for your firm’s clients.' },
        { t: 'Legal opinions', d: 'Panamanian law opinions for transactions, financings and proceedings abroad.' },
        { t: 'Exequatur and service of process', d: 'Recognition of foreign judgments and awards, letters rogatory and service in Panama.' },
        { t: 'Filings before authorities', d: 'Public Registry, Maritime Authority, Immigration, tax authority and other agencies.' },
      ],
      sections: [
        {
          h: 'How we work with your firm',
          p: ['We agree on scope, fees, reporting format and communication channels from the outset. Your firm keeps the client relationship; we execute in Panama and report to you.'],
        },
      ],
      leads: ['john'],
      faqs: [
        { q: 'In which languages do you report?', a: 'We report in English, Spanish or German, as your firm prefers.' },
        { q: 'Can you work under our confidentiality agreement?', a: 'Yes. We sign NDAs and align our conflict checks with your firm’s procedures.' },
        { q: 'How are fees handled?', a: 'Per matter, hourly or through an agreed rate for recurring work — always in writing and before we start.' },
      ],
      related: ['litigation', 'corporate', 'maritime'],
    },

    maritime: {
      title: 'Maritime Lawyers in Panama | Ship Registration | Ward International Lawyers',
      description: 'Panama ship registration (flagging), title registration, naval mortgages, seafarer licenses and port concessions. Panama maritime law attorneys.',
      eyebrow: 'Maritime law',
      h1: 'Maritime law and ship registration in Panama',
      lead: 'Panama operates the world’s largest ship registry. We help you register, finance and operate your vessel with legal certainty.',
      short: 'Ship flagging, title registration, naval mortgages, licenses and concessions.',
      intro: [
        'Panama’s history has revolved around its geography since long before the Canal was built. For centuries the Isthmus has been a meeting point for world trade and maritime activity, and today its dollarized economy and logistics infrastructure keep it among the most attractive countries for the shipping business.',
        'Our team holds a master’s degree in Maritime Law, Shipping Business and Port Management, and handles both registry filings and the disputes that arise in operations.',
      ],
      offerings: [
        { t: 'Ship flagging', d: 'Provisional and permanent registration of ships and yachts under the Panamanian flag.' },
        { t: 'Title registration', d: 'Registration of vessel title at the Public Registry.' },
        { t: 'Ship finance', d: 'Advice on ship financing and registration of naval mortgages.' },
        { t: 'Seafarer licenses', d: 'Obtaining and endorsing licenses for seafarers.' },
        { t: 'Port concessions', d: 'Concessions and operating licenses before the Panama Maritime Authority, with full follow-up.' },
        { t: 'Maritime litigation', d: 'Claims and interim measures before Panama’s Maritime Courts.' },
      ],
      leads: ['jose'],
      faqs: [
        { q: 'Why register a ship in Panama?', a: 'International recognition, efficient procedures, an extensive consular network and a legal framework that favors ship finance.' },
        { q: 'Can a non-Panamanian register a vessel?', a: 'Yes. The Panamanian registry is open to owners of any nationality, whether individuals or companies.' },
      ],
      related: ['litigation', 'corporate', 'cocounsel'],
    },

    immigration: {
      title: 'Immigration Lawyers in Panama | Residency & Relocation | Ward International Lawyers',
      description: 'Panama immigration lawyers: residency visas, work permits, naturalization and relocation of families and employees. Service in English, Spanish and German.',
      eyebrow: 'Immigration and relocation',
      h1: 'Immigration and relocation to Panama',
      lead: 'For individuals and companies moving to Panama: we handle your immigration process and your family’s, and advise you on investment and real estate.',
      short: 'Residency, work permits, naturalization and relocation of families and staff.',
      intro: [
        'This service is aimed at individuals and companies that, for work or personal reasons, decide to move to Panama. We handle the immigration process for the individual and for the dependent family members who accompany them.',
        'We also advise you on the immigration and investment option that best fits your needs and resources, and on buying or renting your home.',
      ],
      offerings: [
        { t: 'Residency visas', d: 'Analysis and filing of the immigration category best suited to your profile.' },
        { t: 'Work immigration', d: 'Work permits and relocation of foreign staff for companies.' },
        { t: 'Dependents', d: 'Applications for spouse, children and other accompanying family members.' },
        { t: 'Naturalization', d: 'Advice and filing to obtain Panamanian nationality.' },
        { t: 'Investment advice', d: 'Legal guidance to invest safely in Panama.' },
        { t: 'Real estate', d: 'Title review, purchase and lease agreements.' },
      ],
      leads: ['jose', 'john'],
      faqs: [
        { q: 'Which residency suits me?', a: 'It depends on your nationality, source of income and plans in Panama. In the consultation we review your profile and recommend the best option.' },
        { q: 'Can I include my family?', a: 'Yes. Most categories allow you to include your spouse and dependent children.' },
      ],
      related: ['realestate', 'corporate', 'labor'],
    },

    labor: {
      title: 'Employment Lawyers for Companies in Panama | Ward International Lawyers',
      description: 'Employment law advice for companies in Panama: employment contracts, internal rules, payroll, terminations, conciliation and labor litigation.',
      eyebrow: 'Labor law',
      h1: 'Employment solutions for companies in Panama',
      lead: 'We prevent labor disputes and, when they arise, represent your company strategically.',
      short: 'Contracts, payroll, terminations, conciliation and labor litigation.',
      intro: [
        'Panama’s Labor Code is protective of employees, and non-compliance can be costly. We help you set up employment relationships correctly from the start and resolve disputes efficiently.',
      ],
      offerings: [
        { t: 'Employment contracts', d: 'Drafting individual contracts and internal policies.' },
        { t: 'Internal work rules', d: 'Preparing your company’s internal work regulations.' },
        { t: 'Payroll and benefits', d: 'Payroll set-up, calculation of benefits and Social Security registration.' },
        { t: 'Terminations', d: 'Advice on terminations to reduce risks and contingencies.' },
        { t: 'Conciliation and litigation', d: 'Representation in individual and collective conciliation and in labor lawsuits.' },
        { t: 'Collective relations', d: 'Negotiating collective agreements and responding to union demands.' },
      ],
      leads: ['jose'],
      faqs: [
        { q: 'Do you represent employees?', a: 'Our employment practice focuses on companies. If you have an individual matter, contact us and we will point you in the right direction.' },
      ],
      related: ['corporate', 'litigation', 'immigration'],
    },

    realestate: {
      title: 'Real Estate Lawyers in Panama | Condominium Law | Ward International Lawyers',
      description: 'Panama real estate lawyers: property purchases, title review, incorporation into the condominium (horizontal property) regime and administrative complaints.',
      eyebrow: 'Real estate',
      h1: 'Real estate and condominium law in Panama',
      lead: 'Buy, sell or manage property in Panama with legal certainty. Proven experience in the horizontal property (condominium) regime.',
      short: 'Property purchases, title review and the condominium regime.',
      intro: [
        'We have proven experience in horizontal property law, particularly in handling and resolving administrative complaints and incorporating properties into the regime, with in-depth knowledge of the applicable legal framework.',
      ],
      offerings: [
        { t: 'Property purchases', d: 'Title and lien review, negotiation and drafting of agreements.' },
        { t: 'Condominium incorporation', d: 'Incorporating properties into the horizontal property regime.' },
        { t: 'Administrative complaints', d: 'Filing and resolving horizontal property complaints.' },
        { t: 'Leases', d: 'Residential and commercial lease agreements.' },
      ],
      leads: ['jose'],
      faqs: [
        { q: 'Can foreigners buy property in Panama?', a: 'Yes. In general, foreigners can acquire property in Panama on the same terms as nationals, with some exceptions in specific areas. We review each case before purchase.' },
      ],
      related: ['immigration', 'litigation', 'corporate'],
    },

    team: {
      title: 'Our Team | Panama Attorneys | Ward International Lawyers',
      description: 'Meet the partners of Ward International Lawyers: John Robert Ward Ábrego, trial lawyer, and Jose Alberto Quiel, corporate and maritime attorney.',
      eyebrow: 'Team',
      h1: 'Attorneys who work with you personally',
      lead: 'A boutique firm: your matter is led by a founding partner trained in Panama, the United States, Spain and Germany.',
    },

    john: {
      title: 'John Robert Ward Ábrego | Trial Lawyer in Panama | Ward International Lawyers',
      description: 'John Robert Ward Ábrego, founding partner of Ward International Lawyers. Trial lawyer for complex cases and corporate law. Speaks Spanish, German and English.',
      role: 'Founding Partner · Litigation and corporate law',
      bio: [
        'John Ward is a trial lawyer with years of experience handling complex and sensitive cases, which he conducts with the utmost diligence, promptness and professionalism. His strategic mindset, commitment and loyalty are essential when handling and resolving legal disputes.',
        'His background in international business and his economics studies in Germany allow him to understand the business context of every dispute and to work directly with German- and English-speaking clients.',
      ],
      education: [
        'Master’s Degree in Procedural Law (Magna Cum Laude).',
        'Bachelor’s Degree in Law and Political Science.',
        'Bachelor’s Degree in International Business.',
        'Studies in Economics (VWL) in Germany.',
        'Currently a PhD candidate in Law.',
      ],
      areas: ['Litigation and complex cases', 'Corporate law', 'International business'],
      langLevels: { es: 'native', de: 'very fluent', en: 'very fluent', it: 'basic' },
      associations: ['Member of the Panama National Bar Association.'],
    },

    jose: {
      title: 'Jose Alberto Quiel | Corporate & Maritime Lawyer in Panama | Ward International Lawyers',
      description: 'Jose Alberto Quiel, founding partner of Ward International Lawyers. Corporate, maritime, labor, immigration and condominium law in Panama.',
      role: 'Founding Partner · Corporate, maritime and condominium law',
      bio: [
        'He has proven experience in horizontal property (condominium) law, particularly in handling and resolving administrative complaints and incorporating properties into the horizontal property regime, and stands out for his professionalism and in-depth knowledge of the applicable legal framework.',
        'He has worked with prestigious local law firms and various government institutions. He is recognized for providing comprehensive corporate advice and efficient legal solutions to clients and companies seeking to establish and grow their presence in Panama.',
      ],
      education: [
        'Master in Maritime Law, Shipping Business and Port Management, Polytechnic University of Catalonia (Spain).',
        'Postgraduate in Legal Practice specializing in Commercial and Labor Law, Barcelona Bar Association, ICAB (Spain).',
        'Degree in Law and Political Science, Universidad Católica Santa María la Antigua (Panama).',
        'Diploma in Business Administration, University of Louisville (United States).',
        'Diploma in Labor Law, Universidad Interamericana de Panamá.',
      ],
      areas: ['Corporate law', 'Maritime law', 'Labor law', 'Immigration law', 'Real estate and condominium law'],
      langLevels: { es: '', en: '' },
      associations: ['Panama National Bar Association.', 'Panamanian Association of Business Executives (APEDE).'],
    },

    karina: {
      bio: 'A graduate in Tourism Business Administration from Universidad Católica Santa María la Antigua, Karina has broad experience in sales, logistics and customer service with international companies. In 2018 she was selected for the Voces Vitales Panamá women’s empowerment program. She is your first point of contact with the firm.',
      honors: ['Sigma Lambda Honor Chapter, School of Tourism Business Administration (USMA).', 'Sigma Lambda Honor Chapter, School of Law, University of Panama.'],
    },

    guides: {
      title: 'Panama Legal Insights | Ward International Lawyers',
      description: 'Practical guides for companies and investors: how to incorporate a company in Panama and what to know before litigating in Panama from abroad.',
      eyebrow: 'Insights',
      h1: 'Insights on doing business and litigating in Panama',
      lead: 'Clear answers to the questions our international clients ask most.',
    },

    guideCompany: {
      title: 'How to Incorporate a Company in Panama: Step-by-Step Guide',
      description: 'How to incorporate a Panama corporation: requirements, steps and ongoing obligations — registered agent, Public Registry, tax ID and bank account.',
      h1: 'How to incorporate a company in Panama: a step-by-step guide',
      lead: 'The Panama corporation (sociedad anónima) is one of the most widely used corporate vehicles in the world. Here is how it is set up, what you need and what it requires afterwards.',
      author: 'jose',
      date: '2026-10-03',
      minutes: 6,
      practice: 'corporate',
      body: `
<h2>Why a Panama corporation?</h2>
<p>Panama corporations are governed mainly by Law 32 of 1927, a flexible statute that allows a company to be used both to run a local business and to hold investments, assets or interests in other countries. Its most cited advantages are freedom in defining the corporate purpose, the possibility of shareholders and directors of any nationality, and the US dollar as legal tender.</p>

<h2>What you need before you start</h2>
<ul>
<li><strong>Company name</strong>, with one or two alternatives in case the first is unavailable.</li>
<li><strong>Directors and officers</strong> (president, secretary and treasurer). They can be of any nationality.</li>
<li><strong>Share capital</strong> and type of shares.</li>
<li><strong>Due diligence documents</strong> for shareholders and beneficial owners: passport, proof of address and, depending on the case, bank or professional references.</li>
<li><strong>Purpose</strong> or main activity of the company.</li>
</ul>

<h2>Step by step</h2>
<ol>
<li><strong>Structure design.</strong> Before drafting anything, we define with you how the company will be used. A company operating in Panama is very different from one that will only hold investments abroad.</li>
<li><strong>Due diligence.</strong> The law requires the registered agent to know its client. We review the documents of shareholders and beneficial owners.</li>
<li><strong>Articles of incorporation.</strong> We draft the articles, which are executed as a public deed before a notary.</li>
<li><strong>Public Registry.</strong> Once registered, the company has its own legal personality.</li>
<li><strong>Beneficial ownership register.</strong> The registered agent must file beneficial ownership information in the system established by Law 129 of 2020.</li>
<li><strong>Tax ID and operating notice (if operating in Panama).</strong> The company registers with the tax authority (DGI) and, if it will carry out commercial activities in Panama, obtains its operating notice.</li>
<li><strong>Bank account.</strong> We prepare the bank file and support you through the process.</li>
</ol>

<h2>The registered agent</h2>
<p>Every Panama corporation must have a registered agent, which by law must be a lawyer or law firm in Panama. The registered agent is the formal link between the company and the authorities and is responsible for keeping due diligence up to date.</p>

<h2>Obligations after incorporation</h2>
<ul>
<li>Pay the <strong>annual franchise tax</strong> to keep the company in good standing.</li>
<li>Keep a <strong>registered agent</strong> and up-to-date beneficial ownership information.</li>
<li>Maintain <strong>accounting records</strong> and supporting documentation.</li>
<li>If operating in Panama, meet its <strong>tax</strong>, municipal and employment obligations.</li>
</ul>

<h2>Common mistakes</h2>
<ul>
<li>Using a generic structure that does not fit the actual business.</li>
<li>Missing the annual franchise tax and accruing penalties or suspension.</li>
<li>Not planning how shares will pass if a shareholder dies or wants to exit.</li>
<li>Incorporating without preparing the bank file first.</li>
</ul>

<h2>Corporation or private interest foundation?</h2>
<p>The private interest foundation (Law 25 of 1995) has no shareholders and is commonly used for wealth and succession planning. The corporation is the natural vehicle for running a business. Many structures combine both.</p>
`,
    },

    guideLitigation: {
      title: 'Litigation in Panama for Foreign Companies: What to Know',
      description: 'Guide for foreign companies with disputes in Panama: powers of attorney, apostilles, translations, arbitration, foreign judgments, maritime courts and costs.',
      h1: 'Litigation in Panama for foreign companies: what you need to know',
      lead: 'If your company has a dispute in Panama, these are the questions to ask before taking the first step.',
      author: 'john',
      date: '2026-10-03',
      minutes: 6,
      practice: 'litigation',
      body: `
<h2>1. Before suing: define the objective</h2>
<p>Litigation is a tool, not an end. Before you start, define the result you want: collect a debt, recover an asset, stop a breach or negotiate from a stronger position. That decision drives the procedural route, interim measures and budget.</p>

<h2>2. Power of attorney, apostille and translation</h2>
<p>To be represented in Panama, your lawyer needs a power of attorney. If you grant it abroad, it must be signed before a notary and apostilled (Panama is a party to the Hague Apostille Convention) or, if your country is not a party, legalized through the consulate. Documents in other languages must be translated into Spanish by an authorized public translator in Panama.</p>

<h2>3. Interim measures</h2>
<p>Often the most important decision is protecting the debtor’s assets before they disappear. Panamanian law allows interim measures such as attachment of assets, subject to requirements and, usually, a bond.</p>

<h2>4. Courts or arbitration?</h2>
<p>Check your contract. If it contains an arbitration clause, the dispute will likely have to be arbitrated. Panama is a party to the 1958 New York Convention on the recognition of foreign arbitral awards and regulates domestic and international commercial arbitration in Law 131 of 2013.</p>

<h2>5. Foreign judgments</h2>
<p>If you already have a judgment from another country, you can seek its recognition in Panama through exequatur proceedings before the Fourth Chamber (General Business) of the Supreme Court. Once recognized, it can be enforced against assets in Panama.</p>

<h2>6. Maritime disputes</h2>
<p>Panama has specialized Maritime Courts. Claims involving vessels, cargo or maritime contracts follow their own rules, including the possibility of arresting vessels in Panamanian waters.</p>

<h2>7. Criminal matters</h2>
<p>If the dispute involves fraud or other offenses, the case proceeds under Panama’s accusatory criminal system, which is oral and hearing-based. The company may act as victim or private prosecutor, which requires a strategy coordinated with the civil or commercial case.</p>

<h2>8. Costs and timing</h2>
<p>Timing depends on the type of proceeding, the court and the opposing party’s conduct. Always ask your lawyer for a stage-by-stage estimate and assess at each point whether settlement or mediation serves you better than continuing to litigate.</p>

<h2>Quick checklist</h2>
<ul>
<li>Contract and relevant correspondence.</li>
<li>Evidence of the breach or damage.</li>
<li>Information on the opposing party’s assets in Panama.</li>
<li>Apostilled power of attorney in favor of your lawyer.</li>
<li>A clear objective and an approximate budget.</li>
</ul>
`,
    },

    guideDebt: {
      title: 'Debt Collection in Panama: Legal Options and Asset Attachment',
      description: 'How to collect a debt from a company in Panama: demand letter, mediation, executive proceedings, attachment of assets and what to do as a foreign creditor.',
      h1: 'How to collect a debt from a company in Panama',
      lead: 'Unpaid invoices, loans or breached contracts: these are the legal tools to recover your money in Panama, and the order in which to use them.',
      author: 'john',
      date: '2026-10-03',
      minutes: 6,
      practice: 'litigation',
      body: `
<h2>1. Gather and organize the evidence</h2>
<p>Before taking any step, collect the contract, invoices, purchase orders, delivery receipts and any communications in which the debtor acknowledges the debt. The quality of that documentation determines the fastest collection route.</p>

<h2>2. Formal demand letter</h2>
<p>A demand letter signed by a lawyer records the claim, sets a deadline for payment and is often enough to open a negotiation. It is also the moment to propose a documented payment plan, ideally backed by an instrument that makes collection easier if the debtor defaults again.</p>

<h2>3. Conciliation or mediation</h2>
<p>If there is a business relationship worth preserving, mediation can produce an agreement at lower cost and in less time. Panama has conciliation and arbitration centers, such as the one run by the Panama Chamber of Commerce, Industries and Agriculture. A well-drafted settlement can be enforced if the debtor fails again.</p>

<h2>4. Executive proceedings: when the debt is documented in an enforceable instrument</h2>
<p>If the debt is set out in a document that the law treats as an enforceable instrument, such as a promissory note or bill of exchange, the creditor can go straight to executive proceedings. This is the fastest route because the court starts from the premise that the debt exists and the debtor’s defenses are limited.</p>

<h2>5. Ordinary proceedings: when the debt must be proven</h2>
<p>Without an enforceable instrument, for example with unaccepted invoices or a contract whose obligations are disputed, you need proceedings to prove the existence and amount of the debt. The resulting judgment can then be enforced.</p>

<h2>6. Interim measures: protecting the debtor’s assets</h2>
<p>The biggest risk in collection is not losing the case, but winning it and finding no assets. Panamanian law allows the attachment of the debtor’s assets (bank accounts, real estate, vehicles, vessels, receivables) from the outset, subject to requirements and usually a bond. Investigating the debtor’s assets in advance is an essential part of the strategy.</p>

<h2>7. If you are outside Panama</h2>
<ul>
<li>Grant a power of attorney before a notary in your country, apostilled (or legalized).</li>
<li>Documents in other languages must be translated into Spanish by an authorized public translator in Panama.</li>
<li>If you already have a foreign judgment or award against the debtor, you can seek its recognition in Panama (exequatur) and enforce it against assets in the country.</li>
</ul>

<h2>8. Do not wait</h2>
<p>Collection actions are subject to limitation periods that vary by type of obligation. And the longer you wait, the more likely the debtor will dispose of assets or enter insolvency proceedings. Seek advice early.</p>
`,
    },

    guideFoundation: {
      title: 'Panama Private Interest Foundation: What It Is and How It Works',
      description: 'Guide to the Panama private interest foundation (Law 25 of 1995): structure, uses in wealth and succession planning, requirements and ongoing obligations.',
      h1: 'Panama private interest foundation: what it is and how it works',
      lead: 'The private interest foundation is one of the most widely used vehicles for organizing and protecting family wealth. Here is how it works and when it makes sense.',
      author: 'jose',
      date: '2026-10-03',
      minutes: 6,
      practice: 'corporate',
      body: `
<h2>What is a private interest foundation?</h2>
<p>It is a legal entity created under Law 25 of 1995, to which a founder contributes assets to be managed for the benefit of the persons or purposes the founder determines. Unlike a corporation, a foundation has no shareholders or owners: the assets belong to the foundation itself.</p>

<h2>Who is involved</h2>
<ul>
<li><strong>Founder:</strong> creates the foundation and contributes the initial endowment. It can be an individual or a company, of any nationality.</li>
<li><strong>Foundation council:</strong> manages the foundation and carries out its purposes. It consists of three individuals or one legal entity.</li>
<li><strong>Beneficiaries:</strong> the persons who will receive the benefits, under the rules set by the founder.</li>
<li><strong>Protector (optional):</strong> an oversight role that can supervise the foundation council.</li>
<li><strong>Registered agent:</strong> a lawyer or law firm in Panama, required by law.</li>
</ul>

<h2>What it is used for</h2>
<ul>
<li><strong>Succession planning:</strong> the founder decides during their lifetime how and when assets will be distributed, which can avoid lengthy probate and disputes among heirs.</li>
<li><strong>Organizing family wealth:</strong> holding investments, company shares or real estate under a single structure with clear rules.</li>
<li><strong>Continuity:</strong> the foundation does not end on the death of the founder or council members.</li>
</ul>

<h2>The founding documents</h2>
<p><strong>The foundation charter</strong> contains the essential data (name, initial endowment, council, registered agent, purposes) and is registered at the Public Registry. <strong>The regulations (by-laws)</strong> are a private document in which the founder sets out in detail who the beneficiaries are and how assets are distributed. This split combines public registration with privacy for family matters.</p>

<h2>Requirements and limits</h2>
<ul>
<li>Minimum initial endowment of ten thousand US dollars, contributed in cash or other assets.</li>
<li>The foundation may not habitually carry on for-profit commercial activities, although it may own shares in companies that do.</li>
<li>It must pay an annual franchise tax and keep a registered agent.</li>
<li>The registered agent must know and register the beneficial owners under current rules.</li>
</ul>

<h2>Foundation or corporation?</h2>
<p>To run a business, the natural tool is a corporation. To preserve and pass on wealth, a foundation is usually better suited. A common structure combines both: the foundation owns the shares of one or more operating companies.</p>

<h2>Before you set one up</h2>
<p>A foundation is only as good as its regulations. It is worth thinking carefully about scenarios such as the founder’s death, minor beneficiaries or disputes among heirs, and about the tax obligations of the founder and beneficiaries in their countries of residence.</p>
`,
    },

    guideShip: {
      title: 'Panama Ship Registration: Requirements and Steps',
      description: 'How to register a ship or yacht under the Panamanian flag: provisional and permanent registration, documents, naval mortgages and annual obligations.',
      h1: 'Panama ship registration: requirements and steps',
      lead: 'Panama operates the world’s largest ship registry. Here is how the process to register your vessel under the Panamanian flag works.',
      author: 'jose',
      date: '2026-10-03',
      minutes: 5,
      practice: 'maritime',
      body: `
<h2>Why register in Panama</h2>
<p>The Panamanian registry is open to owners of any nationality, has an extensive network of consular and technical offices worldwide and offers a naval mortgage regime recognized by international lenders. It is common for the vessel to be owned by a Panama corporation set up for that purpose.</p>

<h2>Who is involved</h2>
<ul>
<li><strong>Panama Maritime Authority (AMP)</strong>, through the Directorate General of Merchant Marine: issues the navigation patent and radio licenses.</li>
<li><strong>Panama Public Registry:</strong> registers title and naval mortgages.</li>
<li><strong>Consulates and AMP technical offices abroad:</strong> allow procedures to start without the vessel being in Panama.</li>
</ul>

<h2>Step by step</h2>
<ol>
<li><strong>Ownership structure.</strong> Decide who the registered owner will be — often a Panama corporation.</li>
<li><strong>Vessel documents.</strong> Title or bill of sale, deletion certificate from the previous registry (or the relevant authorization) and technical tonnage and safety certificates.</li>
<li><strong>Provisional registration.</strong> Obtain the provisional navigation patent and radio license, which allow the vessel to operate while the process is completed.</li>
<li><strong>Title registration.</strong> The title is registered at the Public Registry.</li>
<li><strong>Permanent patent.</strong> Once requirements are met, the AMP issues the permanent navigation patent.</li>
</ol>

<h2>Naval mortgages</h2>
<p>Mortgages over Panamanian vessels are registered at the Public Registry and can be preliminarily registered through consulates, which protects the lender from the moment of closing. That is why the Panamanian registry is common in ship finance.</p>

<h2>Bareboat charter registration</h2>
<p>Panamanian law allows the registration of bareboat-chartered vessels that keep their original registry in another country, and the reverse situation, subject to the applicable requirements.</p>

<h2>Obligations after registration</h2>
<ul>
<li>Payment of the vessel’s annual fees and taxes.</li>
<li>Keeping safety certificates and crew documents (seafarer licenses) current.</li>
<li>If the vessel is owned by a Panama company, meeting the company’s obligations: annual franchise tax, registered agent and beneficial ownership register.</li>
</ul>
`,
    },

    contact: {
      title: 'Contact | Attorneys in Costa del Este, Panama | Ward International Lawyers',
      description: 'Contact Ward International Lawyers by WhatsApp, phone or email. Office at Financial Park, Costa del Este, Panama City.',
      eyebrow: 'Contact',
      h1: 'Let’s talk about your matter',
      lead: 'Message us on WhatsApp, call us or fill in the form. We work in English, Spanish and German.',
    },

    privacy: {
      title: 'Privacy Policy | Ward International Lawyers',
      description: 'How Ward International Lawyers handles personal data received through this website.',
      eyebrow: 'Legal',
      h1: 'Privacy policy and legal notice',
      body: `
<h2>Controller</h2>
<p>Ward International Lawyers, law firm with offices at Boulevard Costa del Este and Ave. La Rotonda, Financial Park Building, 17th Floor, Panama City, Republic of Panama. Contact: jward@wardintlawyers.com.</p>
<h2>Data we receive</h2>
<p>Data you voluntarily send us through the form, WhatsApp, phone or email (name, contact details, country and a description of your enquiry).</p>
<h2>Purpose</h2>
<p>We use your data solely to respond to your enquiry, assess a potential engagement and, if you retain us, provide our services. We do not sell or transfer your data to third parties for commercial purposes.</p>
<h2>Confidentiality</h2>
<p>Information you share with us is treated with the confidentiality inherent to attorney professional secrecy. Please do not send sensitive documents through the form; an attorney will indicate the appropriate channel.</p>
<h2>Analytics</h2>
<p>If you consent, we use Google Analytics to measure site usage in aggregate. You can decline without affecting your browsing.</p>
<h2>Your rights</h2>
<p>You may request access, rectification, deletion or objection to the processing of your data under Panama’s Personal Data Protection Law (Law 81 of 2019) by writing to the email above.</p>
<h2>Legal notice</h2>
<p>The content of this website is for information only and does not constitute legal advice or create an attorney-client relationship.</p>
`,
    },
  },
};
