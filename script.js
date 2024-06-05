const langButtons = document.querySelectorAll("[data-btn]");
const allLangs = ["ru", "en", "kz"];
const currentPathName = window.location.pathname;
let currentLang =
  localStorage.getItem("language") || checkBrowserLang() || "en";
let currentTexts = {};

// home

const homeTexts = {
  "home_page-1": {
    ru: "Новости",
    en: "News",
    kz: "Жаңалықтар",
  },
  "home_page-2": {
    ru: "Дилеры",
    en: "Dealers",
    kz: "дилерлер",
  },
  "home_page-3": {
    ru: "Меню",
    en: "Menu",
    kz: "Меню",
  },
  "home_page-4": {
    ru: "Узнать больше",
    en: "Learn More",
    kz: "Көбірек білу үшін",
  },
  "home_page-5": {
    ru: "Езда на автопилоте",
    en: "Drive on autopilot",
    kz: "Автопилотта жүргізу",
  },
  "home_page-6": {
    ru: "Современный автопилот похож на волшебство, мягко направляя ваш автомобиль, позволяя вам расслабиться и насладиться дорогой",
    en: "Modern autopilot is like a magical hand gently guiding your car, allowing you to unwind and relish the road",
    kz: "Заманауи автопилот сиқырға ұқсайды, ол сіздің көлігіңізді ақырын бағыттайды, демалуға және жолдан ләззат алуға мүмкіндік береді.",
  },
  "home_page-7": {
    ru: "Головокружительная скорость",
    en: "Breakneck speed",
    kz: "Күрделі жылдамдық",
  },
  "home_page-8": {
    ru: "Самый быстрый разгон – от 0 до 60 км/ч ,всего за 3,5 секунды",
    en: "The fastest acceleration - from 0 to 60 km/h in just 3.5 seconds",
    kz: "Ең жылдам үдеу – небәрі 3,5 секундта 0-ден 60 км/сағ",
  },
  "home_page-9": {
    ru: "Запас хода",
    en: "Power reserve",
    kz: "Қуат қоры",
  },
  "home_page-10": {
    ru: "Это автомобиль с впечатляющим запасом хода в 530 километров. Это позволяет ездить свободно долго и без ограничений!",
    en: "This car, with its impressive 530-kilometer range, is a true marvel. With a single charge, it allows you to explore freely without constraints!",
    kz: "Бұл 530 шақырымды құрайтын әсерлі көлік. Бұл ұзақ уақыт бойы және шектеусіз еркін жүруге мүмкіндік береді!",
  },
  "home_page-11": {
    ru: "ЗАКАЗАТЬ СЕЙЧАС",
    en: "ORDER NOW",
    kz: "ҚАЗІР ТАПСЫРЫС БЕРІҢІЗ",
  },
  "home_page-12": {
    ru: "Безупречный дизайн",
    en: "Impeccable design",
    kz: "Мінсіз дизайн",
  },
  "home_page-13": {
    ru: "Уверенность и совершенство",
    en: "Confidence and perfection",
    kz: "Сенім және кемелдік",
  },
  "home_page-14": {
    ru: "Интерьер Taycan полон стиля и роскоши. Каждая деталь, от многозонного освещения и высококачественных материалов до передовой информационной системы, создаёт атмосферу утончённости и комфорта. Этот автомобиль погружает вас в мир технологических революций, не теряя ни капли роскоши и стиля. Porsche Taycan – это больше, чем просто автомобиль, это произведение искусства на четырёх колёсах, воплощающее союз мастерства и инженерного искусства.",
    en: "The Taycan's interior is full of style and luxury. Every element, from multi-zone lighting and high-quality materials to the advanced information system, creates an atmosphere of sophistication and  comfort. This car puts you at the heart of a technologically revolutionary world, but without losing an ounce of luxury and style. The Porsche Taycan is more than just a car, it is a work of art on four wheels that  represents the marriage  between manufacturing and engineering.",
    kz: "Taycan интерьері стиль мен сән-салтанатқа толы. Әрбір бөлшегі, көп аймақты жарықтандыру мен жоғары сапалы материалдардан бастап, заманауи ақпараттық жүйеге дейін, нәзіктік пен жайлылық атмосферасын жасайды. Бұл көлік сізді технологиялық революциялар әлеміне тереңдетеді, сән мен сән-салтанаттан бір тамшы да жоғалтпай. Porsche Taycan – бұл жай ғана көлік емес, бұл төрт дөңгелекті өнер туындысы, шеберлік пен инженерлік өнердің үйлесімі.",
  },
  "home_page-15": {
    ru: "Прыжок в будущее",
    en: "Leap into the future",
    kz: "Болашаққа секір",
  },
  "home_page-16": {
    ru: "Электромобиль — это вклад в сохранение океанов и лесов, сокращение использования нефти и снижение воздействия парниковых газов.",
    en: "An electric car is a contribution to the conservation of oceans and forests, to reducing the use of oil and to reducing the effect of greenhouse gases.",
    kz: "Электромобиль – мұхиттар мен ормандарды сақтауға, мұнайды пайдалануды азайтуға және парниктік газдардың әсерін азайтуға қосқан үлесі.",
  },
  "home_page-17": {
    ru: "Сохраним лес!",
    en: "Let's save the forest!",
    kz: "Орманды сақтайық!",
  },
  "home_page-18": {
    ru: "Электромобили вносят значительный вклад в сохранение лесов и борьбу с изменением климата. Они способстуют снижению выбросы вредных газов.",
    en: " Electric vehicles make a significant contribution to forest conservation and the fight against climate change. They reduce emissions of harmful gases.",
    kz: "Электрлік көліктер орманды сақтауға және климаттың өзгеруіне қарсы күреске айтарлықтай үлес қосуда. Олар зиянды газдардың шығарындыларын азайтуға көмектеседі.",
  },
  "home_page-19": {
    ru: "Нулевые выбросы газа",
    en: "Zero gas emissions",
    kz: "Нөлдік газ шығарындылары",
  },
  "home_page-20": {
    ru: "Электромобили – это будущее без выбросов. Их работа абсолютно безвредна для окружающей среды, так как не выделяет вредных газов и частиц.",
    en: "Electric vehicles are the future without emissions. Their operation is absolutely free for the environment, as they do not emit harmful gases and particles.",
    kz: "Электрлік көліктер – шығарындылары жоқ болашақ. Олардың жұмысы қоршаған ортаға мүлдем зиянсыз, өйткені ол зиянды газдар мен бөлшектерді шығармайды.",
  },
  "home_page-21": {
    ru: "Интересно!",
    en: "Interesting!",
    kz: "Қызықты!",
  },
  "home_page-22": {
    ru: "Политика Конфиденциальности",
    en: "Privacy Policy",
    kz: "Құпиялылық саясаты",
  },
  "home_page-23": {
    ru: "© 2023. Все права защищены.",
    en: "© 2023. All rights reserved.",
    kz: "© 2023. Барлық құқықтар қорғалған.",
  },
  "home_page-24": {
    ru: "Партнёры",
    en: "Partners",
    kz: "Серіктестер",
  },
  "home_page-25": {
    ru: "Купить сейчас",
    en: "BUY NOW",
    kz: "ҚАЗІР САТЫП АЛ",
  },
  "home_page-26": {
    ru: "Простой и сдержанный",
    en: "Simple and discreet",
    kz: "Қарапайым және ақылды",
  },
  "home_page-27": {
    ru: "Дизайн интерьера Model Y минималистичный, что придает ему стильный и сдержанный вид. Центральным элементом салона является огромный 15-дюймовый сенсорный дисплей, который служит центром управления всеми аспектами работы автомобиля, от климат-контроля до мультимедийных возможностей. Он объединяет современные технологии с невероятной простотой использования.",
    en: "The interior design of Model Y is minimalistic, giving it a stylish and discreet appearance. The centerpiece of the cabin is a huge 15-inch touchscreen display, which serves as the control center for all aspects of the car, from climate control to multimedia capabilities. It integrates modern  technology with incredible ease of use",
    kz: "Model Y интерьерінің дизайны минималистік болып табылады, бұл оған стильді және түсініксіз көрініс береді. Салонның орталық бөлігі - 15 дюймдік үлкен сенсорлық дисплей, ол климаттық бақылаудан мультимедиялық мүмкіндіктерге дейін автомобильдің барлық аспектілерін басқару орталығы ретінде қызмет етеді. Ол заманауи технологияны пайдаланудың керемет жеңілдігімен біріктіреді.",
  },
  "home_page-28": {
    ru: "Дисплей",
    en: "Display",
    kz: "Дисплей",
  },
  "home_page-29": {
    ru: "Дисплей внутри Tesla Model Y представляет собой 15-дюймовый мультимедийный сенсорный экран, расположенный на центральной консоли автомобиля. Этот дисплей служит важной частью интерфейса управления автомобилем и объединяет различные функции.",
    en: "The display inside the Tesla Model Y is a 15-inch multimedia touch screen located on the center console of the car. This display serves as an important part of the vehicle control interface and integrates various functionalities",
    kz: "Tesla Model Y ішіндегі дисплей - бұл автомобильдің орталық консолінде орналасқан 15 дюймдік мультимедиялық сенсорлық экран. Бұл дисплей көлікті басқару интерфейсінің маңызды бөлігі ретінде қызмет етеді және әртүрлі функцияларды біріктіреді.",
  },
  "home_page-30": {
    ru: "Купить сейчас",
    en: "Buy now",
    kz: "Қазір сатып ал",
  },
  "home_page-31": {
    ru: "Многофункциональный дисплей",
    en: "Multifunction display",
    kz: "Көп функциялы дисплей",
  },
  "home_page-32": {
    ru: "Автомобиль оснащен сенсорным дисплеем с диагональю экрана 15 дюймов (около 38 см), разрешением 1920 х 1080 пикселей (Full HD), с операционной системой Linux Ubuntu.",
    en: "The car is equipped with a touch display with a screen diagonal of 15 inches (approximately 38 cm), with a resolution of 1920 x 1080 pixels (Full HD), with the Linux Ubuntu operating system",
    kz: "Автокөлік 15 дюймдік экран диагоналы (шамамен 38 см), рұқсаты 1920 x 1080 пиксель (Full HD), Linux Ubuntu операциялық жүйесі бар сенсорлық дисплеймен жабдықталған.",
  },
  "home_page-33": {
    ru: "Он расположен на центральной консоли автомобиля. Этот дисплей служит важной частью интерфейса управления автомобилем и объединяет различные функции.",
    en: " It is located on the center console of the car. This display serves as an important part of the vehicle control interface and integrates various functionalities.",
    kz: "Ол автомобильдің орталық консольінде орналасқан. Бұл дисплей көлікті басқару интерфейсінің маңызды бөлігі ретінде қызмет етеді және әртүрлі функцияларды біріктіреді.",
  },
  "home_page-34": {
    ru: "Благодаря тому, что дисплей включает в себя большинство функций для управления автомобилем, салон автомобиля не перегружен кнопками и функциональными деталями, что делает его максимально комфортным и минималистичным. Не перегружая себя и концентрируясь на контроле движений",
    en: " Due to the fact that the display includes most functions for driving a car, the car interior is not overloaded with buttons and functional parts, which makes it as comfortable and minimalist as possible. Without overloading yourself, and focusing on movement control",
    kz: "Дисплей автокөлікті басқаруға арналған көптеген функцияларды қамтитындықтан, автомобиль салоны түймелермен және функционалдық бөлшектермен шамадан тыс жүктелмейді, бұл оны барынша ыңғайлы және минималистік етеді. Өзіңізді шамадан тыс жүктеместен және қозғалыстарыңызды басқаруға шоғырланбай",
  },
  "home_page-35": {
    ru: "Купить сейчас",
    en: "Buy now",
    kz: "Қазір сатып ал",
  },
  "home_page-36": {
    ru: "Панорамное стекло",
    en: "Panoramic Glass",
    kz: "Панорамалық шыны",
  },
  "home_page-37": {
    ru: "Панорамное стекло в Tesla Model Y — одна из визуально ярких особенностей, придающих интерьеру уникальный характер.",
    en: "The panoramic glass in the Tesla Model Y is one of the visually striking features that gives the interior a unique character",
    kz: "Tesla Model Y-дегі панорамалық әйнек интерьерге қайталанбас сипат беретін көрнекі ерекшеліктердің бірі болып табылады.",
  },
  "home_page-38": {
    ru: "Панорамное стекло простирается от передней части крыши до задней части автомобиля, обеспечивая визуальный обзор и открывая потрясающие виды на окружающую среду.",
    en: " The panoramic glass stretches from the front of the roof to the rear of the car, providing a visual sweep and revealing stunning views of the surrounding environment",
    kz: "Панорамалық әйнек шатырдың алдыңғы жағынан көліктің артқы жағына дейін созылып, көрнекі көріну мен қоршаған ортаның керемет көрінісін қамтамасыз етеді.",
  },
  "home_page-39": {
    ru: "Огромная стеклянная панорама позволяет естественному свету заливать салон, создавая яркую и воздушную атмосферу внутри автомобиля. Это придает ощущение открытости и простора.",
    en: "The immense glass panorama allows natural light to flood the cabin, creating a bright and airy atmosphere inside the car. This imparts a sense of openness and spaciousness",
    kz: "Үлкен әйнек панорама табиғи жарықтың салонды басып кетуіне мүмкіндік береді, көлік ішінде жарқын және әуе атмосферасын жасайды. Бұл ашықтық пен кеңдік сезімін береді.",
  },
  "home_page-40": {
    ru: "Эстетика и дизайн",
    en: "Aesthetics and Design",
    kz: "Эстетика және дизайн",
  },
  "home_page-41": {
    ru: "Панорамное стекло предлагает водителю и пассажирам превосходный обзор окружающей среды, потенциально улучшая общее визуальное впечатление во время поездки.",
    en: "The panoramic glass offers the driver and passengers an excellent view of the surrounding environment, potentially enhancing the overall visual experience during journeys.",
    kz: "Панорамалық әйнек жүргізуші мен жолаушыларға қоршаған ортаның тамаша көрінісін ұсынады, бұл сапар кезінде жалпы көрнекі тәжірибені жақсартуға мүмкіндік береді.",
  },
  "home_page-42": {
    ru: "Стекло не только выполняет практическую функцию, но и становится значимой архитектурной деталью в дизайне автомобиля, подчеркивая современный стиль Tesla и придавая Model Y узнаваемую индивидуальность.",
    en: "The glass not only serves a practical function but also  becomes a significant  architectural detail in the car's design, emphasizing Tesla's modern style and giving the  Model Y a recognizable identity",
    kz: "Шыны тек практикалық функцияны атқарып қана қоймайды, сонымен қатар автомобиль дизайнындағы маңызды архитектуралық бөлшекке айналады, ол Тесланың заманауи стиліне баса назар аударады және Y моделіне танымал тұлға береді.",
  },
  "home_page-43": {
    ru: "Панорамное стекло органично вписывается в общую эстетику интерьера и экстерьера автомобиля, придавая ему характер и выделяя его среди других автомобилей.",
    en: "The panoramic glass seamlessly integrates into the overall aesthetic of the interior and exterior of the car, adding character and standing out among other vehicles.",
    kz: "Панорамалық шыны автомобильдің ішкі және сыртқы келбетінің жалпы эстетикасына мінсіз үйлеседі, оған сипат беріп, оны басқа көліктерден ерекшелейді.",
  },
  "home_page-44": {
    ru: "Кузов Tesla Model Y — это стильное сочетание компактности и функциональности. Выразительный дизайн, практичные функции, панорамное остекление и инновационные двери создают впечатляющий автомобиль, в котором эстетика сочетается с передовыми технологиями. Компактность и изысканный дизайн кузова Tesla Model Y вместе создают элегантный и эффективный кроссовер. Панорамное стекло не только придает автомобилю современный вид, но и обеспечивает отличный обзор окрестностей, создавая неповторимые визуальные впечатления как для водителя, так и для пассажиров.",
    en: "The Tesla Model Y body is a stylish blend of compactness and functionality. Its expressive design, practical features, panoramic glass, and innovative doors create an impressive vehicle where aesthetics meet cutting-edge technology. The compactness and refined design of the Tesla Model Y body come together to create an elegant and efficient crossover. The panoramic glass not only gives the car a modern look but also provides an excellent view of the surroundings, creating a unique visual experience for both the driver and passengers",
    kz: "Tesla Model Y корпусы - жинақылық пен функционалдылықтың стильді үйлесімі. Экспрессивті дизайн, практикалық мүмкіндіктер, панорамалық терезелер мен инновациялық есіктер эстетика мен озық технологияны біріктіретін әсерлі көлік жасайды. Tesla Model Y ықшам дизайны мен тазартылған корпус дизайны біріктіріліп, талғампаз және тиімді кроссовер жасайды. Панорамалық әйнек көлікке заманауи көрініс беріп қана қоймайды, сонымен қатар жүргізуші мен жолаушылар үшін бірегей визуалды тәжірибе жасай отырып, айналадағы аумақтың тамаша көрінісін қамтамасыз етеді.",
  },
  "home_page-45": {
    ru: "Заказать сейчас",
    en: "Order Now",
    kz: "Қазір тапсырыс беріңіз",
  },
  "home_page-46": {
    ru: "Новости",
    en: "News",
    kz: "Жаңалықтар",
  },
  "home_page-47": {
    ru: "Дилеры",
    en: "Dealers",
    kz: "Дилерлер",
  },
  "home_page-48": {
    ru: "Volkswagen ID.4",
    en: "Volkswagen ID.4",
    kz: "Volkswagen ID.4",
  },
  "home_page-49": {
    ru: "КУПИТЬ СЕЙЧАС",
    en: "BUY NOW",
    kz: "ҚАЗІР САТЫП АЛЫҢЫЗ",
  },
  "home_page-50": {
    ru: "Volkswagen ID.4 — инновационный шедевр автомобильного искусства",
    en: "Volkswagen ID.4 is an innovative masterpiece of automotive art",
    kz: "Volkswagen ID.4 - автомобиль өнерінің инновациялық туындысы",
  },
  "home_page-51": {
    ru: "Volkswagen ID.4 является ярким свидетельством автомобильного дизайна, сочетая прогрессивную эстетику с передовыми технологиями. Его элегантные линии и изящные контуры создают ощущение гармонии между красотой и функциональностью. ID.4 представляет собой гармонию между экологической ответственностью и эмоциональной привлекательностью, демонстрируя как уважение к окружающей среде, так и приверженность передовым достижениям в автомобильной промышленности",
    en: "The Volkswagen ID.4 is a striking testament to automotive design, blending progressive aesthetics with cutting-edge technology. Its sleek lines and graceful contours create a sense of harmony between beauty and functionality. The ID.4 represents a harmony between ecological responsibility and emotional allure, showcasing both a respect for the environment and a commitment to pioneering advancements in the automotive industry",
    kz: "Volkswagen ID.4 - бұл автомобиль дизайнының әсерлі үлгісі, озық эстетиканы алдыңғы қатарлы технологиямен біріктіреді. Оның талғампаз сызықтары мен әсем контурлары сұлулық пен функционалдылық арасындағы үйлесімділікті жасайды. ID.4 экологиялық жауапкершілік пен эмоциялық тартымдылық арасындағы үйлесімділікті көрсетеді, қоршаған ортаға деген құрметті және автомобиль өнеркәсібіндегі пионерлік жетістіктерге деген адалдықты көрсетеді",
  },
  "home_page-52": {
    ru: "12-дюймовый сенсорный дисплей",
    en: "12” Touchscreen Display",
    kz: "12 дюймдік сенсорлық дисплей",
  },
  "home_page-53": {
    ru: "Удобство",
    en: "Convenience",
    kz: "Қолайлылық",
  },
  "home_page-54": {
    ru: "Откройте для себя удобство и компактность",
    en: "Discover convenience and compactness",
    kz: "Қолайлылық пен жинақылықты ашыңыз",
  },
  "home_page-55": {
    ru: "Узнать больше",
    en: "To learn more",
    kz: "Көбірек білу үшін",
  },
  "home_page-56": {
    ru: "Купить сейчас",
    en: "Buy now",
    kz: "Қазір сатып алыңыз",
  },
  "home_page-57": {
    ru: "ID.4 стильный и аэродинамичный, что делает автомобиль эффективным",
    en: "ID.4 is stylish and aerodynamic, making the car efficient",
    kz: "ID.4 стильді және аэродинамикалық, бұл автомобильді тиімді етеді",
  },
  "home_page-58": {
    ru: "Современный дизайн обеспечивает комфорт и функциональность вождения",
    en: "The modern design ensures driving comfort and functionality",
    kz: "Заманауи дизайн жүргізу жайлылығы мен функционалдығын қамтамасыз етеді",
  },
  "home_page-59": {
    ru: "Кузов ID.4 не только красив, но и оптимизирован",
    en: "The ID.4 body is not only beautiful but optimized",
    kz: "ID.4 корпусы тек әдемі ғана емес, сонымен қатар оңтайландырылған",
  },
  "home_page-60": {
    ru: "Volkswagen ID.4 — это кроссовер с современным и элегантным кузовом. Его дизайн отличается гладкими, аэродинамическими линиями, которые не только придают автомобилю стильный внешний вид, но и способствуют снижению сопротивления воздуха для повышения эффективности.",
    en: "The Volkswagen ID.4 is a crossover with a modern and elegant body. Its design features smooth, aerodynamic lines that not only give the car a stylish exterior but also contribute to reducing air resistance for increased efficiency.",
    kz: "Volkswagen ID.4 заманауи және талғампаз корпуспен жабдықталған кроссовер. Оның дизайнында тегіс, аэродинамикалық сызықтар бар, олар автомобильге стильді көрініс беріп қана қоймайды, сонымен қатар тиімділікті арттыру үшін ауа кедергісін азайтуға ықпал етеді.",
  },
  "home_page-61": {
    ru: "Кузов ID.4 следует современным эстетическим принципам, подчеркивая минимализм и функциональность. Пропорции автомобиля создают внушительное присутствие на дороге, а его эргономичный дизайн обеспечивает комфорт как для водителя, так и для пассажиров.",
    en: "The ID.4's body follows a modern aesthetic, emphasizing minimalism and functionality. The car's proportions create a commanding presence on the road, and its ergonomic design ensures comfort for both the driver and passengers.",
    kz: "ID.4 корпусы заманауи эстетикалық қағидаларды ұстанады, минимализм мен функционалдылықты баса көрсетеді. Автомобильдің пропорциялары жолда әсерлі көрініс жасайды, ал оның эргономикалық дизайны жүргізуші мен жолаушылар үшін жайлылықты қамтамасыз етеді.",
  },
  "home_page-62": {
    ru: "Этот кузов не только привлекателен визуально, но и был эффективно использован в его разработке для обеспечения оптимальной производительности и максимального использования пространства внутри автомобиля.",
    en: "This body is not only visually appealing but has also been effectively utilized in its development to ensure optimal performance and maximum utilization of space within the vehicle.",
    kz: "Бұл корпус тек көрнекі түрде тартымды ғана емес, сонымен қатар автомобиль ішіндегі кеңістікті барынша пайдалану және оңтайлы өнімділікті қамтамасыз ету үшін оның дамуы барысында тиімді пайдаланылды.",
  },
  "home_page-63": {
    ru: "Volkswagen ID.4",
    en: "Volkswagen ID.4",
    kz: "Volkswagen ID.4",
  },
  "home_page-64": {
    ru: "Купите автомобиль сейчас или сравните с аналогами. Покупка осуществляется через официального дилера.",
    en: "Buy a car now or compare with analogues. Purchase is made through an official dealer.",
    kz: "Қазір көлік сатып алыңыз немесе аналогтармен салыстырыңыз. Сатып алу ресми дилер арқылы жүзеге асырылады.",
  },
  "home_page-65": {
    ru: "Сравнить модели",
    en: "Compare models",
    kz: "Модельдерді салыстырыңыз",
  },
  "home_page-66": {
    ru: "Купить сейчас",
    en: "Buy now",
    kz: "Қазір сатып алыңыз",
  },
  "home_page-67": {
    ru: "Политика конфиденциальности",
    en: "Privacy Policy",
    kz: "Құпиялылық саясаты",
  },
  "home_page-68": {
    ru: "Партнеры",
    en: "Partners",
    kz: "Серіктестер",
  },
  "home_page-70": {
    ru: "Новости",
    en: "News",
    kz: "Жаңалықтар",
  },
  "home_page-71": {
    ru: "Дилеры",
    en: "Dealers",
    kz: "Дилерлер",
  },
  "home_page-72": {
    ru: "BMW iX",
    en: "BMW iX",
    kz: "BMW iX",
  },
  "home_page-73": {
    ru: "КУПИТЬ СЕЙЧАС",
    en: "BUY NOW",
    kz: "ҚАЗІР САТЫП АЛЫҢЫЗ",
  },
  "home_page-74": {
    ru: '"Стильный, Инновационный, Аэродинамичный"',
    en: '"Stylish, Innovative, Aerodynamic"',
    kz: '"Стильді, Инновациялық, Аэродинамикалық"',
  },
  "home_page-75": {
    ru: "BMW iX имеет современный и элегантный кузов, который сочетает стиль, аэродинамику и функциональность. Его изогнутые линии создают потрясающий внешний вид, а инновационные элементы подчеркивают его передовую природу. В целом, внешний вид BMW iX исключительно привлекателен и символизирует не только инновации в автомобильной промышленности, но и стремление к совершенству в дизайне электромобилей.",
    en: "The BMW iX boasts a modern and elegant body that combines style, aerodynamics, and functionality. Its curved lines create a stunning exterior, while innovative elements emphasize its forward-thinking nature. Overall, the exterior of the BMW iX is exceptionally attractive and symbolizes not only innovation in the automotive industry but also the pursuit of perfection in electric vehicle design.",
    kz: "BMW iX заманауи және талғампаз корпусқа ие, ол стильді, аэродинамиканы және функционалдылықты біріктіреді. Оның иілген сызықтары таңғажайып сыртқы көрініс жасайды, ал инновациялық элементтер оның алдыңғы қатарлы табиғатын көрсетеді. Жалпы, BMW iX сыртқы келбеті ерекше тартымды және автомобиль өнеркәсібіндегі инновацияларды ғана емес, сонымен қатар электр көлігінің дизайнындағы жетілуге ​​деген ұмтылысты білдіреді.",
  },
  "home_page-76": {
    ru: '"Роскошный, Инновационный, Просторный"',
    en: '"Luxurious, Innovative, Spacious"',
    kz: '"Зәулім, Инновациялық, Кең"',
  },
  "home_page-77": {
    ru: "Интерьер BMW iX воплощает уникальное пространство, которое сочетает высокий уровень комфорта, инновационные технологии и изысканный дизайн. Использование экологически чистых материалов, таких как натуральная кожа и переработанные элементы, создает атмосферу роскоши с особым акцентом на устойчивость.",
    en: "The BMW iX interior embodies a unique space that combines high comfort levels, innovative technologies, and exquisite design. The use of environmentally friendly materials, such as natural leather and recycled elements, creates an atmosphere of luxury with a special emphasis on sustainability.",
    kz: "BMW iX интерьері жоғары жайлылық деңгейін, инновациялық технологияларды және талғампаз дизайнды біріктіретін бірегей кеңістікті бейнелейді. Табиғи былғары және қайта өңделген элементтер сияқты экологиялық таза материалдарды пайдалану тұрақтылыққа ерекше назар аудара отырып, сән-салтанат атмосферасын жасайды.",
  },
  "home_page-78": {
    ru: "Ваш браузер не поддерживает видео в формате MP4.",
    en: "Your browser does not support MP4 video.",
    kz: "Сіздің шолғышыңыз MP4 бейнесін қолдамайды.",
  },
  "home_page-79": {
    ru: "Политика конфиденциальности",
    en: "Privacy Policy",
    kz: "Құпиялылық саясаты",
  },
  "home_page-80": {
    ru: "© 2023. Все права защищены.",
    en: "© 2023. All rights reserved.",
    kz: "© 2023. Барлық құқықтар қорғалған.",
  },
  "home_page-81": {
    ru: "Партнеры",
    en: "Partners",
    kz: "Серіктестер",
  },
  "home_page-82": {
    ru: "Porsche Taycan",
    en: "Porsche Taycan",
    kz: "Porsche Taycan",
  },
  "home_page-83": {
    ru: "КУПИТЬ СЕЙЧАС",
    en: "BUY NOW",
    kz: "ҚАЗІР САТЫП АЛЫҢЫЗ",
  },
  "home_page-84": {
    ru: '"Современная роскошь, инновационный комфорт"',
    en: '"Modern luxury, innovative comfort"',
    kz: '"Заманауи люкс, инновациялық жайлылық"',
  },
  "home_page-85": {
    ru: "Салон Porsche Taycan — это тщательно продуманное пространство, где роскошь сочетается с инновациями. Каждая деталь вызывает ощущение современной роскоши. Высококачественные материалы, такие как премиальная кожа, алюминий и углеродное волокно, создают атмосферу изысканности и современности.",
    en: "Salon Porsche Taycan is a meticulously crafted space where luxury meets innovation. Every detail evokes a sense of modern opulence. High-quality materials such as premium leather, aluminum, and carbon create an atmosphere of refinement and contemporaneity.",
    kz: "Porsche Taycan салоны — бұл люкс пен инновация үйлескен мұқият ойластырылған кеңістік. Әрбір деталь заманауи сән-салтанат сезімін тудырады. Жоғары сапалы материалдар, мысалы, премиум былғары, алюминий және көміртегі талшығы, талғампаздық пен заманауилық атмосферасын жасайды.",
  },
  "home_page-86": {
    ru: "Перейти к сравнению",
    en: "Go to comparison",
    kz: "Салыстыруға өту",
  },
  "home_page-87": {
    ru: '"Изящный, спортивный элегантность"',
    en: '"Sleek, sporty elegance"',
    kz: '"Сымбатты, спорттық элеганттылық"',
  },
  "home_page-88": {
    ru: "Кузов Porsche Taycan выглядит потрясающе. Его элегантные линии и изящные формы отражают спортивную изысканность, делая его внешний вид символом передового автомобильного дизайна и эстетики. Созданный с использованием передовых технологий и высококачественных материалов, кузов Taycan",
    en: "The body of the Porsche Taycan looks stunning. Its elegant lines and graceful forms reflect a sporty sophistication, making its appearance a symbol of cutting-edge automotive design and aesthetics. Crafted using advanced technologies and high-quality materials, the Taycan's body",
    kz: "Porsche Taycan корпусы таңғажайып көрінеді. Оның талғампаз сызықтары мен әсем пішіндері спорттық талғампаздықты бейнелейді, оның келбетін заманауи автомобиль дизайны мен эстетикасының символы етеді. Озық технологиялар мен жоғары сапалы материалдарды пайдалана отырып жасалған Taycan корпусы",
  },
  "home_page-89": {
    ru: "Выбрать пакет",
    en: "Select a package",
    kz: "Пакетті таңдаңыз",
  },
  "home_page-90": {
    ru: "ЭлектроНикс",
    en: "ElectroNix",
    kz: "ЭлектроНикс",
  },
  "home_page-91": {
    ru: "Новости",
    en: "News",
    kz: "Жаңалықтар",
  },
  "home_page-92": {
    ru: "Дилеры",
    en: "Dealers",
    kz: "Дилерлер",
  },
  "home_page-93": {
    ru: "Купить сейчас",
    en: "BUY NOW",
    kz: "Қазір тапсырыс беріңіз",
  },
  "home_page-94": {
    ru: "Салон Porsche Taycan - это тщательно разработанное пространство, где роскошь встречается с инновациями. Каждая деталь вызывает ощущение современного богатства. Использование высококачественных материалов, таких как премиальная кожа, алюминий и углерод, создает атмосферу изысканности и современности.",
    en: "Salon Porsche Taycan is a meticulously crafted space where luxury meets innovation. Every detail evokes a sense of modern opulence. High-quality materials such as premium leather, aluminum, and carbon create an atmosphere of refinement and contemporaneity.",
    kz: "Porsche Taycan салоны турали жақындыраңыз - бұл қалыпты құрылған алаң, жеңілдікті белгілеп тұр. Әр бір толтырылушының түсіндірмесі қазіргі қолда бойында келетін байлықты толтырады. Примиум дәуірлілік, алюминий және карбон кездесетін материалдардың пайдалануы изыскандық және қазіргілік атмосфераны құрады.",
  },
  "home_page-95": {
    ru: "Смотрите сравнение",
    en: "Go to comparison",
    kz: "Салыстыруға өту",
  },
  "home_page-96": {
    ru: "Элегантные, спортивные элегантные линии Porsche Taycan выглядят потрясающе. Его элегантные линии и изящные формы отражают спортивную изысканность, делая его внешний вид символом передового автомобильного дизайна и эстетики. Созданный с использованием передовых технологий и высококачественных материалов, кузов Taycan",
    en: "The sleek, sporty elegance of the Porsche Taycan body looks stunning. Its elegant lines and graceful forms reflect a sporty sophistication, making its appearance a symbol of cutting-edge automotive design and aesthetics. Crafted using advanced technologies and high-quality materials, the Taycan's body",
    kz: "Porsche Taycan денсаулығының көрінісі алдағырағандар. Оның элеганттік шеттері мен жәңгі шекілдері спортивті байлықты көздейді, оның көрінісін алдағырақ спортивтің изыскан түрлілігін көрсетеді, оның көрінісінің алдағырақ жаны бойынша алғашқы автомобиль дизайны мен естетикасының саяси сияқты болатын сияқты болатын сияқты болатын сияқты болатын сияқты болатын сияқты болатын сияқты болатын сияқты болатын сияқты болатын.",
  },
  "home_page-97": {
    ru: "Выбрать пакет",
    en: "Select a package",
    kz: "Пакет таңдау",
  },
  "home_page-98": {
    ru: "Политика конфиденциальности",
    en: "Privacy Policy",
    kz: "Құпиялылық саясаты",
  },
  "home_page-99": {
    ru: "Партнеры",
    en: "Partners",
    kz: "Серіктестер",
  },
  "home_page-100": {
    ru: "© 2023. Все права защищены.",
    en: "© 2023. All rights reserved.",
    kz: "© 2023. Барлық құқықтар қорғалған.",
  },
  "home_page-101": {
    ru: "Если у вас есть вопросы или предложения относительно нашей Политики конфиденциальности, свяжитесь с нами по адресу [ваш адрес контакта].",
    en: "If you have questions or suggestions regarding our Privacy Policy, please contact us at [your contact address].",
    kz: "Егер құпиялылық саясатымыздың бойынша сұрақтары немесе ұсыныстарыңыз болса, бізге жалғастырыңыз [сіздің байланыс мекенжайыңыз].",
  },
  "home_page-102": {
    ru: "Раскрытие информации:",
    en: "Information Disclosure:",
    kz: "Мәліметті ашықтай алу:",
  },
  "home_page-103": {
    ru: "Мы не продаем, не обмениваем и не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законом.",
    en: "We do not sell, trade, or transfer your personal information to third parties without your consent, except as required by law.",
    kz: "Қанунда керек болған шарттардың қатарында, сіздің рұқсатыңызсыз қолдау көрсетпейміз, сіздің жеке мәліметтеріңізді үшін, үшін, сатпау жасау және аудармау.",
  },
  "home_page-104": {
    ru: "Безопасность:",
    en: "Security:",
    kz: "Қауіпсіздік:",
  },
  "home_page-105": {
    ru: "Мы принимаем меры для обеспечения безопасности ваших персональных данных с использованием современных технологий и процедур.",
    en: "We take measures to ensure the security of your personal information using modern technologies and procedures.",
    kz: "Сіздің жеке мәліметтеріңіздің қауіпсіздігін қамтамасыз ету үшін кездейсоқ технологиялар мен әдістемелерді қолданамыз.",
  },
  "home_page-106": {
    ru: "Изменения в Политике конфиденциальности:",
    en: "Changes to the Privacy Policy:",
    kz: "Құпиялылық саясатына өзгерістер:",
  },
  "home_page-107": {
    ru: "Мы оставляем за собой право обновлять эту Политику конфиденциальности по мере необходимости. Мы рекомендуем периодически проверять эту страницу на наличие возможных изменений.",
    en: "We reserve the right to update this Privacy Policy as needed. We recommend periodically checking this page for any possible changes.",
    kz: "Мұқтаж болған жағдайда бұл Құпиялылық саясатын жаңарту құқығымызды қорғаймыз. Бұл бетте көрсетілген өзгерістерді тексеру керек деп, біз периодтық түрде тексеруіңізді ұсынамыз.",
  },
  "home_page-108": {
    ru: "Если у вас есть вопросы или предложения относительно нашей Политики конфиденциальности, свяжитесь с нами по адресу [ваш адрес контакта].",
    en: "If you have questions or suggestions regarding our Privacy Policy, please contact us at [your contact address].",
    kz: "Егер сізде құпиялылық саясатымызға қатысты сұрақтар немесе ұсыныстар болса, бізбен байланысыңыз [сіздің контактті мекенжайыңыз] арқылы керек.",
  },
  "home_page-109": {
    ru: "Спасибо, что выбрали нас!",
    en: "Thank you for choosing us!",
    kz: "Бізді таңдағаныңыз үшін рахмет!",
  },
  "home_page-110": {
    ru: "Домашняя страница",
    en: "Home",
    kz: "Негізгі бет!",
  },
  "home_page-111": {
    ru: "Понравившиеся",
    en: "Like",
    kz: "Ұнады",
  },
  "home_page-112": {
    ru: "Популярное",
    en: "Popular",
    kz: "Танымал",
  },
  "home_page-113": {
    ru: "Смотреть позже",
    en: "See later",
    kz: "Кейінірек көріңіз",
  },
  "home_page-114": {
    ru: "• 5 дней назад",
    en: "• 5 days ago",
    kz: "• 5 күн бұрын",
  },
  "home_page-115": {
    ru: "Комментарии",
    en: "Comments",
    kz: "Пікірлер",
  },
  "home_page-116": {
    ru: "Регистрация: 20 Ноября, 2023",
    en: "Registration: November 20, 2023",
    kz: "Тіркеу: 2023 жылдың 20 қарашасы",
  },
  "home_page-117": {
    ru: "Редактировать профиль",
    en: "Edit profile",
    kz: "Профильді өңдеу",
  },
  "home_page-118": {
    ru: "Ваш контент может быть здесь",
    en: "Your content could be here",
    kz: "Мазмұныңыз осында болуы мүмкін",
  },
  "home_page-119": {
    ru: "Создать пост",
    en: "Create a post",
    kz: "Пост жасау",
  },
  "home_page-120": {
    ru: "В данный момент тут пусто...",
    en: "It's empty at the moment...",
    kz: "Ол қазір бос...",
  },
  "home_page-121": {
    ru: "Здесь будут популярные статьи....",
    en: "Popular articles will be here....",
    kz: "Танымал мақалалар осында болады...",
  },
  "home_page-122": {
    ru: "Добавьте статью, чтобы посмотреть позже...",
    en: "Add an article to watch later...",
    kz: "Кейінірек көру үшін мақала қосыңыз...",
  },
};

// Проверка пути страницы сайта
function checkPagePathName() {
  switch (currentPathName) {
    case "/Главная Сстраница.html":
      currentTexts = homeTexts;
      break;
    case "/model-Y.html":
      currentTexts = modelYTexts;
      break;

    default:
      currentTexts = homeTexts;
      break;
  }
}
checkPagePathName();

// Изменение языка у текстов
function changeLang() {
  for (const key in currentTexts) {
    let elem = document.querySelector(`[data-lang=${key}]`);
    if (elem) {
      elem.textContent = currentTexts[key][currentLang];
    }
  }
}
changeLang();

// Вешаем обработчики на каждую кнопку
langButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (!event.target.classList.contains("header__btn_active")) {
      currentLang = event.target.dataset.btn;
      localStorage.setItem("language", event.target.dataset.btn);
      resetActiveClass(langButtons, "header__btn_active");
      btn.classList.add("header__btn_active");
      changeLang();
    }
  });
});

// Сброс активного класса у переданного массива элементов
function resetActiveClass(arr, activeClass) {
  arr.forEach((elem) => {
    elem.classList.remove(activeClass);
  });
}

// Проверка активной кнопки
function checkActiveLangButton() {
  switch (currentLang) {
    case "ru":
      document
        .querySelector('[data-btn="ru"]')
        .classList.add("header__btn_active");
      break;
    case "en":
      document
        .querySelector('[data-btn="en"]')
        .classList.add("header__btn_active");
      break;
    case "kz":
      document
        .querySelector('[data-btn="kz"]')
        .classList.add("header__btn_active");
      break;

    default:
      document
        .querySelector('[data-btn="ru"]')
        .classList.add("header__btn_active");
      break;
  }
}
checkActiveLangButton();

// Проверка языка браузера
function checkBrowserLang() {
  const navLang = navigator.language.slice(0, 2).toLowerCase();
  const result = allLangs.some((elem) => {
    return elem === navLang;
  });
  if (result) {
    return navLang;
  }
}

console.log("navigator.language", checkBrowserLang());
